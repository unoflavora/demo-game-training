const stateGameplay = function(game) {
  this.game = game;
};

/* var obstacle;
var kancil;
var currentStep;

var deltaPosition;
var speed;
var score;
var bestScore;
var time;
var countdown;
var standingTime;
var reset;
*/

stateGameplay.prototype = {
  init() {
    this.deltaPosition = 350; // Distance of base and first crocs
    this.speed = 3.0; // Speed of crocs
    this.score = 0; // -10 is because the base also has collider
    this.time = 0; // Max duration of the game in second MINUS 1
    this.countdown = 1; // Countdown starting value

    this.BASE_SCORE_CROCS = 20;
    this.BASE_COMBO_SCORE = 2;

    this.CHARACTER_SCALES = 0.85;

    this.KANCIL_BODY_COLLISION_THRESHOLD = 0.48;
    this.BASE_DISTANCE = 250;

    this.TOTAL_CROCS = 20;

    this.nCrocs = 0;
    this.nCrocsJumped = -1;

    this.second = 0;
    this.minute = 0;

    this.isWin = false;

    this.notifEvents = null;
    this.notifIndex = -1;
    this.endNotifEvent = null;

    this.CROC_BOUND_THRESHOLD = 0.55;
    // this.CROC_BOUND_THRESHOLD = 0.15;
    this.crocBound = this.game.width * this.CROC_BOUND_THRESHOLD;

    this.isGameStarted = false;

    this.DEFAULT_COMBO_TIME = 3000;
    this.curComboTime = -1;
    this.nCombo = -2;

    if (this.reset) {
      this.reset = false;
    }
  },

  create() {
    this.game.physics.setBoundsToWorld();
    this.game.stage.backgroundColor = '#58fafd';

    playMusic(this.game, 'gameplay_bgm');

    this.createSFXs();
    this.createLandGoal();
    this.createObstacles();

    // Create the kancil
    this.createKancil();

    this.darkScreen = this.game.add.sprite(-10, -10, 'dark_screen');
    this.darkScreen.width = this.game.width + 10;
    this.darkScreen.height = this.game.height + 10;

    this.darkScreenQuestion = this.game.add.sprite(-10, -10, 'dark_screen');
    this.darkScreenQuestion.width = this.game.width + 10;
    this.darkScreenQuestion.height = this.game.height + 10;

    // Create the crocs (next stepping place)
    for (let i = 0; i < 5; i++) {
      this.createCroc(this.kancil.y - this.deltaPosition);
    }

    let graphics1;
    const angle = { min: 0, max: 180 };

    this.createHUD();
    this.createNotif();
    this.createQuestionNotif();

    // Show the countdown information
    this.countdownInfo = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'READY?',
      { font: '150px OdudoSoft', fill: '#fff' }
    );
    this.countdownInfo.anchor.setTo(0.5);
    this.countdowner = this.game.time.create(true);
    this.countdowner.loop(1000, this.updateCountdowner, this);
    this.countdowner.start();

    // Add standing time check
    this.standingTime = 10;
    this.checkStand = this.game.time.create(false);
    this.checkStand.loop(100, this.standingCheck, this); // 100 means 0.1 second

    //
    this.createEvents();
  },

  createEvents() {
    // Handle the kancil movement (tap screen)
    this.game.input.onTap.add(this.tapEvent, this);
  },

  tapEvent() {
    if (this.notifIndex > 0) {
      this.nextEventNotif();
    } else {
      this.kancilJump();
    }
  },

  createObstacles() {
    // Create the group of all obstacle
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    // Create the starting base for kancil
    this.base = this.obstacles.create(this.game.world.centerX, this.game.height * 0.925, 'base');
    this.base.anchor.setTo(0.5);
  },

  createSFXs() {
    // Add audio
    this.sfxJump = this.game.add.audio('jump');
    this.sfxSplash = this.game.add.audio('splash');
    this.landOnCrocSfx = this.game.add.audio('land_on_croc');

    this.sadKancilSfx = this.game.add.audio('sad_kancil');
    this.happyKancilSfx = this.game.add.audio('happy_kancil');
  },

  createKancilFaceset(faceX, faceY, group) {
    this.deerSad = this.game.add.sprite(faceX, faceY, 'deer_sad');
    this.deerSad.anchor.setTo(0.5);
    this.deerSad.scale.set(0.68, 0.68);
    group.add(this.deerSad);

    this.deerHappy = this.game.add.sprite(faceX, faceY, 'deer_happy');
    this.deerHappy.anchor.setTo(0.5);
    this.deerHappy.scale.set(0.68, 0.68);
    group.add(this.deerHappy);

    this.deerNormal = this.game.add.sprite(faceX, faceY, 'deer_normal');
    this.deerNormal.anchor.setTo(0.5);
    this.deerNormal.scale.set(0.68, 0.68);
    group.add(this.deerNormal);

    this.deerFaces = [];
    this.deerFaces.deer_sad = this.deerSad;
    this.deerFaces.deer_happy = this.deerHappy;
    this.deerFaces.deer_normal = this.deerNormal;

    this.changeKancilFace('deer_normal');
  },

  changeKancilFace(faceName) {
    for (deerFace in this.deerFaces) {
      this.deerFaces[deerFace].visible = false;
    }

    if (faceName != null) {
      this.deerFaces[faceName].visible = true;
    }
  },

  createHUD() {
    // Show the score information
    this.scoreBar = this.game.add.sprite(
      this.game.width * 0.02,
      this.game.height * 0.02,
      'score_bar'
    );
    this.scoreBar.scale.set(0.6, 0.6);

    this.scoreLabel = this.game.add.text(this.game.width * 0.09, this.game.height * 0.02, 'SCORE', {
      font: '35px OdudoSoft',
      fill: '#fff'
    });
    this.scoreLabel.anchor.setTo(0.5);

    this.scoreLabel.position.x = this.scoreBar.x + this.scoreBar.width * 0.5;
    this.scoreLabel.position.y = this.scoreBar.y + this.scoreBar.height * 0.25;

    this.scoreInfo = this.game.add.text(this.game.width * 0.09, this.game.height * 0.056, '0', {
      font: '55px OdudoSoft',
      fill: '#fff'
    });
    this.scoreInfo.anchor.setTo(0.5);

    this.scoreInfo.position.x = this.scoreBar.x + this.scoreBar.width * 0.5;
    this.scoreInfo.position.y = this.scoreBar.y + this.scoreBar.height * 0.65;

    this.timeBar = this.game.add.sprite(
      this.game.width * 0.98,
      this.game.height * 0.02,
      'timer_bar'
    );
    this.timeBar.scale.set(0.6, 0.6);
    this.timeBar.anchor.x = 1;

    this.timeIcon = this.game.add.sprite(
      this.timeBar.position.x - this.timeBar.width * 0.975,
      this.timeBar.position.y,
      'timer_icon'
    );
    this.timeIcon.position.y = this.timeBar.height * 0.5;

    this.timeIcon.scale.set(0.6, 0.6);
    // this.timeIcon.anchor.x = 1;

    this.timeInfo = this.game.add.text(
      this.timeBar.x - this.timeBar.width * 0.36,
      this.timeBar.y + this.timeBar.height * 0.51,
      '00:00',
      { font: '36px OdudoSoft', fill: '#fff' }
    );
    this.timeInfo.anchor.setTo(0.5);

    this.createComboBar();
  },

  createComboBar() {
    this.comboTimerBar = game.add.graphics(game.world.centerX, game.world.centerY);

    this.comboBar = this.game.add.sprite(
      this.game.width * 0.92,
      this.game.height * 0.12,
      'circle_white'
    );
    this.comboBar.scale.set(0.9, 0.9);
    this.comboBar.anchor.setTo(0.5);

    this.comboTimerBar.position.set(this.comboBar.x, this.comboBar.y);

    this.updateComboTimerBar(0, 1);

    this.comboText = this.game.add.text(this.comboBar.x, this.comboBar.y, '0x', {
      font: '35px OdudoSoft',
      fill: '#111'
    });
    this.comboText.anchor.setTo(0.5);
  },

  updateComboTimerBar(value, valuemax) {
    const max = 365;
    const min = -90;

    const cur = (max * value) / valuemax + min;

    this.comboTimerBar.clear();
    this.comboTimerBar.lineStyle(0);
    this.comboTimerBar.beginFill(0xffe600);
    this.comboTimerBar.arc(0, 0, 45, game.math.degToRad(cur), game.math.degToRad(min), true);
    this.comboTimerBar.endFill();
  },

  updateComboText() {
    this.comboText.text = `${Math.max(this.nCombo + 1, 0)}x`;
  },

  createNotif() {
    this.notifGroup = this.game.add.group();

    this.notifGroup.add(this.darkScreen);

    // Show shader of countdown
    this.notifPanel = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'notifBox1'
    );
    this.notifPanel.anchor.setTo(0.5);
    this.notifPanel.scale.set(0.68, 0.68);
    this.notifGroup.add(this.notifPanel);
    // this.notifPanel.visible = false;

    this.notifMessageText = this.game.add.text(
      this.notifPanel.x + this.notifPanel.width * 0.15,
      this.notifPanel.y,
      '',
      {
        font: '30px OdudoSoft',
        fill: '#111',
        wordWrap: true,
        align: 'center',
        wordWrapWidth: this.notifPanel.width * 0.6
      }
    );
    this.notifMessageText.anchor.setTo(0.5);
    this.notifGroup.add(this.notifMessageText);

    this.createKancilFaceset(
      this.notifPanel.x - this.notifPanel.width * 0.3,
      this.notifPanel.y,
      this.notifGroup
    );

    this.setNotifEvents(
      [
        this.callNotif.bind(this, "Let's help the deer to find land with fresh grass"),
        this.callNotif.bind(this, 'Tap to play')
      ],
      this.startGameplay
    );

    this.nextEventNotif();
  },

  createQuestionNotif() {
    this.notifQuestionGroup = this.game.add.group();

    this.notifQuestionGroup.add(this.darkScreenQuestion);

    // Show shader of countdown
    this.notifQPanel = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'notifBox2'
    );
    this.notifQPanel.anchor.setTo(0.5);
    this.notifQPanel.scale.set(0.68, 0.68);
    this.notifQuestionGroup.add(this.notifQPanel);
    // this.notifPanel.visible = false;

    this.notifQuestionMessageText = this.game.add.text(
      this.notifQPanel.x + this.notifQPanel.width * 0.15,
      this.notifQPanel.y - this.notifQPanel.height * 0.18,
      '',
      {
        font: '30px OdudoSoft',
        fill: '#111',
        wordWrap: true,
        align: 'center',
        wordWrapWidth: this.notifPanel.width * 0.6
      }
    );
    this.notifQuestionMessageText.anchor.setTo(0.5);
    this.notifQuestionGroup.add(this.notifQuestionMessageText);

    this.createKancilFaceset(
      this.notifQPanel.x - this.notifQPanel.width * 0.3,
      this.notifQPanel.y - this.notifQPanel.height * 0.18,
      this.notifQuestionGroup
    );

    this.leftAnswerButton = this.game.add.button(
      this.notifQPanel.x - this.notifQPanel.width * 0.25,
      this.notifQPanel.y + this.notifQPanel.height * 0.4,
      'button',
      null,
      this,
      null,
      0,
      1
    );
    this.leftAnswerButton.scale.set(0.5, 0.5);
    this.leftAnswerButton.anchor.set(0.5, 0.5);

    this.leftAnswerText = this.game.add.text(
      this.leftAnswerButton.x,
      this.leftAnswerButton.y,
      'Button Left',
      { font: '30px OdudoSoft', fill: '#fff', align: 'center' }
    );
    this.leftAnswerText.anchor.set(0.5, 0.5);

    this.rightAnswerButton = this.game.add.button(
      this.notifQPanel.x + this.notifQPanel.width * 0.25,
      this.notifQPanel.y + this.notifQPanel.height * 0.4,
      'button',
      null,
      this,
      null,
      0,
      1
    );
    this.rightAnswerButton.scale.set(0.5, 0.5);
    this.rightAnswerButton.anchor.set(0.5, 0.5);

    this.rightAnswerText = this.game.add.text(
      this.rightAnswerButton.x,
      this.rightAnswerButton.y,
      'Button Right',
      { font: '30px OdudoSoft', fill: '#fff', align: 'center' }
    );
    this.rightAnswerText.anchor.set(0.5, 0.5);

    this.notifQuestionGroup.add(this.leftAnswerButton);
    this.notifQuestionGroup.add(this.rightAnswerButton);
    this.notifQuestionGroup.add(this.leftAnswerText);
    this.notifQuestionGroup.add(this.rightAnswerText);

    const context = this;

    this.disableQuestionNotif();

    // test
    // this.callNotifQuestion("Ahahaha", null, "Test 1", "Test 2", function(){context.game.state.start("gameplay")}, function(){context.game.state.start("title")});
  },

  // createGameOver

  update() {
    if (!this.kancil.dead && !this.isWin) {
      this.updateTimer();
      this.checkCollision();

      // Check whether the game has end or not
      if ((!this.kancil.jump && this.kancil.drowned) || this.time < 0) {
        if (this.nCrocsJumped >= this.TOTAL_CROCS) {
          this.kancilLandAnim.play();
          this.activateWin();

          return;
        }

        // Check the best score
        if (this.score > this.bestScore) {
          this.bestScore = this.score;
        }

        this.kancil.dead = true;
        this.nCombo = 0;
        this.updateComboText();

        // Show splash when kancil get drowned
        if (!this.kancil.jump && this.kancil.drowned) {
          this.drownKancil();
        }

        if (this.countdownInfo.alive) {
          this.countdownInfo.destroy();
        }

        // Create delay for showing splash before the end state
        this.time = 100;
      }
    }
    // Reducing delay of showing splash
    else {
      this.time -= 1;
      if (this.time <= 0) {
        if (!this.notifQuestionGroup.visible && !this.isWin) {
          this.activateGameover();
        }
      }
    }

    if (this.countdownInfo.alive) {
      if (this.time < 29) {
        this.countdownInfo.destroy();
      }
    }
  },

  activateWin() {
    ConsoleLog('Win');
    this.isWin = true;
    this.happyKancilSfx.play();

    const context = this;
    window.parent.postMessage('GameFinished', window.location.href);

    this.setNotifEvents([
      this.callNotif.bind(this, 'Yay!\nCongratulation for helping the deer!', 'deer_happy'),
      this.callNotifQuestion.bind(
        this,
        `Result\n\nScore:${this.score}\nTime: ${this.timeInfo.text}`,
        null,
        global.parameters.lesson != undefined ? 'Next Lesson' : 'Play Again',
        'Exit',
        this.nextLesson,
        function() {
          window.parent.postMessage('ExitGame', window.location.href);
        }
      )
    ]);

    this.nextEventNotif();

    if (global.parameters.lesson != undefined) {
      this.leftAnswerButton.x = this.game.width * 0.5;
      this.leftAnswerText.x = this.leftAnswerButton.x;

      this.rightAnswerButton.visible = false;
      this.rightAnswerText.visible = false;
    }
  },

  activateGameover() {
    this.sadKancilSfx.play();
    // this.game.state.states['end'].score = this.bestScore;
    // this.game.state.start('end');

    const context = this;

    this.callNotifQuestion(
      'Oh no. The deer feel into water.',
      'deer_sad',
      'Try Again',
      'Exit',
      function() {
        game.state.start('gameplay');
      },
      function() {
        context.game.state.start('title');
      }
    );

    this.reset = true;
  },

  drownKancil() {
    // this.game.camera.flash(0x58fafd, 1000);
    this.sfxSplash.play();
    this.kancil.visible = false;
    this.kancilSplash.visible = true;
    this.kancilSplash.position.set(this.kancil.position.x, this.kancil.position.y);
    this.kancilSplashAnim.play(10);
  },

  checkCollision() {
    this.game.physics.arcade.overlap(this.kancil, this.obstacles, this.standOnStep, null, this);

    this.obstacles.forEach(function(step) {
      if (step != this.base) {
        if (step.y < this.game.height) {
          // Move all crocs right/left
          let velocity;
          if (step.toRight) {
            // Change below 'step.velocity' to constant number for move statically
            velocity = step.velocity;
          } else {
            // Same as above, but negative value
            velocity = -step.velocity;
          }
          step.x += velocity;

          // Reverse the movement of crocs at the edge

          const crocScale = Math.abs(step.scale.x);

          if (step.x > this.game.width + this.crocBound && step.toRight) {
            step.toRight = false;
            step.scale.x = crocScale;
            step.position.x -= step.width;
          } else if (step.x < -this.crocBound && !step.toRight) {
            step.toRight = true;
            step.scale.x = -crocScale;
            step.position.x -= step.width;
          }

          /* if(step.x > this.game.width * 0.737){
                        step.toRight = false;
                    } else if(step.x < this.game.width * -0.035){
                        step.toRight = true;
                    } */

          // Move kancil as crocs
          if (!this.kancil.jump && step == this.currentStep) {
            this.kancil.x += velocity;
          }
        } else {
          step.kill();
        }
      }
    }, this);
  },

  createKancil() {
    this.kancil = this.game.add.sprite(this.game.world.centerX, this.base.y, 'kancil');
    this.kancil.scale.setTo(this.CHARACTER_SCALES, this.CHARACTER_SCALES);
    this.kancil.anchor.setTo(0.5, 0.65);

    this.kancilIdleAnim = this.kancil.animations.add('idle', [0]);
    this.kancilJumpAnim = this.kancil.animations.add('jump', [1, 2]);
    this.kancilLandAnim = this.kancil.animations.add('land', [3, 0]);

    // Physic body scaling
    this.game.physics.arcade.enable(this.kancil);
    // this.kancil.body.setSize(this.kancil.width * 0.75, this.kancil.height * 0.55, this.kancil.width * 0.19, this.kancil.height * 0.5);

    const collisionWidth =
      (this.kancil.width / this.kancil.scale.x) * this.KANCIL_BODY_COLLISION_THRESHOLD;
    const collisionHeight = this.kancil.height * this.KANCIL_BODY_COLLISION_THRESHOLD * 0.9;

    this.kancil.body.setSize(
      collisionWidth,
      collisionHeight,
      (this.kancil.width / this.kancil.scale.x - collisionWidth) * 0.5,
      this.kancil.height * 0.48
    );

    // Property Initialization
    this.kancil.jump = false;
    this.kancil.drowned = false;
    this.kancil.dead = false;

    this.kancilSplash = this.game.add.sprite(this.game.world.centerX, this.base.y, 'splash');
    this.kancilSplash.anchor.setTo(0.5);

    this.kancilSplash.visible = false;
    this.kancilSplashAnim = this.kancilSplash.animations.add('splash', [0, 1, 2]);
  },

  createCroc(y, x = this.game.rnd.realInRange(0, this.game.width * 0.69)) {
    let step;

    if (this.nCrocs >= this.TOTAL_CROCS) {
      if (!this.landGoal.visible) {
        this.landGoal.position.y -= this.BASE_DISTANCE * 2;
        this.landGoal.visible = true;
        // this.landGoal
        // this.landGoal.step();
      }

      return;
    }

    step = this.obstacles.create(x, y, 'crocs');
    step.frame = 0;

    step.scale.setTo(this.CHARACTER_SCALES, this.CHARACTER_SCALES);
    // step.body.setSize(step.width * 0.75, step.height * 0.5, step.width * 0.3, step.height * 0.4);
    step.body.setSize(step.width * 0.7, step.height, step.width * 0.2, step.height * 0.08);

    // Increase delta position when the obstacle is moving down
    if (this.kancil.y < 750 || (this.kancil.y > 750 && this.deltaPosition < 1600)) {
      this.deltaPosition += this.BASE_DISTANCE; // Distance of each crocs
    }

    // Randomize the direction of crocs

    const crocScale = Math.abs(step.scale.x);

    step.direction = this.game.rnd.integerInRange(0, 1);
    if (step.direction == 0) {
      step.toRight = true;
      step.scale.x = -crocScale;
      step.position.x -= step.width;
    } else {
      step.toRight = false;
      step.scale.x = crocScale;
      step.position.x -= step.width;
    }

    // Increase the speed of crocs
    this.speed += 0.2;
    step.velocity = this.speed;

    this.nCrocs++;
  },

  createLandGoal() {
    this.landGoal = this.game.add.sprite(0, 0, 'goal');
    this.landGoal.visible = false;
  },

  startGameplay() {
    this.isGameStarted = true;
  },

  nextEventNotif() {
    if (this.notifIndex >= this.notifEvents.length) {
      this.disableNotif();
      this.notifIndex = -1;
      this.notifEvents = null;

      if (this.endNotifEvent != null) {
        this.endNotifEvent();
      }
    } else {
      this.notifEvents[this.notifIndex]();
    }

    this.notifIndex++;
  },

  setNotifEvents(events, endNotifEvent) {
    this.notifEvents = events;
    this.notifIndex = 0;
    this.endNotifEvent = endNotifEvent;
  },

  callNotif(message, kancilFace) {
    this.notifGroup.visible = true;
    this.notifMessageText.text = message;

    if (kancilFace != null) {
      this.changeKancilFace(kancilFace);
    }
  },

  callNotifQuestion(
    message,
    kancilFace,
    leftButtonText,
    rightButtonText,
    leftButtonEvent,
    rightButtonEvent
  ) {
    this.notifQuestionGroup.visible = true;

    if (kancilFace == null) {
      this.notifQuestionMessageText.setStyle({
        font: '50px OdudoSoft',
        fill: '#111',
        align: 'center'
      });
      this.notifQuestionMessageText.position.set(
        this.notifQPanel.x,
        this.notifQPanel.y - this.notifQPanel.height * 0.1
      );
    }

    this.notifQuestionMessageText.text = message;

    this.changeKancilFace(kancilFace);

    this.leftAnswerText.text = leftButtonText;
    this.rightAnswerText.text = rightButtonText;

    this.leftAnswerButton.onInputDown.add(leftButtonEvent);
    this.rightAnswerButton.onInputDown.add(rightButtonEvent);

    this.notifIndex = -1;
  },

  disableNotif() {
    // this.notifPanel.visible = false;
    // this.notifMessageText.visible = false;
    // this.darkScreen.visible = false;

    this.notifGroup.visible = false;
  },

  disableQuestionNotif() {
    // this.notifPanel.visible = false;
    // this.notifMessageText.visible = false;
    // this.darkScreen.visible = false;

    this.notifQuestionGroup.visible = false;
  },

  // Function of all touch handler
  kancilJump() {
    if (this.kancil.drowned) {
      return;
    }

    if (!this.isGameStarted) {
      this.startGameplay();
    }

    if (!this.kancil.jump) {
      this.sfxJump.play();
      this.kancilJumpAnim.play(10);
      this.kancil.jump = true;
      this.kancil.drowned = true; // Drowned temporarily set to true

      // Handle the tween of movement
      let tween;
      let tweenLandGoal;
      if (this.kancil.y > 750 || this.nCrocsJumped > this.TOTAL_CROCS - 2) {
        ConsoleLog('kancil move');
        // Kancil is moved up
        tween = this.game.add
          .tween(this.kancil)
          .to({ y: this.kancil.y - this.BASE_DISTANCE }, 500, Phaser.Easing.Linear.None, true, 0);
      } else {
        // All crocs are moved down
        tween = this.game.add
          .tween(this.obstacles)
          .to(
            { y: this.obstacles.y + this.BASE_DISTANCE },
            500,
            Phaser.Easing.Linear.None,
            true,
            0
          );
      }

      if (this.nCrocsJumped > this.TOTAL_CROCS - 4 && this.nCrocsJumped < this.TOTAL_CROCS - 1) {
        this.game.add
          .tween(this.landGoal)
          .to({ y: this.landGoal.y + this.BASE_DISTANCE }, 500, Phaser.Easing.Linear.None, true, 0);
      }

      if (tween != null) {
        tween.onComplete.add(this.kancilHasJump, this);
      }

      // Create a new crocs every kancil jumps
      this.createCroc(this.kancil.position.y - this.deltaPosition);
    }
  },

  // Reset jump condition of kancil
  kancilHasJump() {
    this.kancil.jump = false;
  },

  // Check whether the kancil is standing on a step or not
  standOnStep(kancil, step) {
    if (!this.isGameStarted) {
      return;
    }

    // Add score if the kancil stand on new crocs
    if (this.currentStep != step && !this.kancil.jump && step.frame == 0) {
      this.kancil.drowned = false;
      // this.kancilIdleAnim.play();
      this.standingTime = 10;
      this.checkStand.start();
      this.currentStep = step;
      this.nCombo++;
      this.updateComboText();

      if (this.nCombo + 1 > 0) {
        this.curComboTime = this.DEFAULT_COMBO_TIME;
        this.updateComboTimerBar(this.curComboTime, this.DEFAULT_COMBO_TIME);
      }

      step.speed = 0;
      step.frame = 1;
      step.velocity = 0;

      if (this.nCrocsJumped > -1) {
        this.kancilLandAnim.play(10);
        this.landOnCrocSfx.play();
        this.score += this.BASE_SCORE_CROCS + this.nCombo * this.BASE_COMBO_SCORE;
      }

      if (this.nCrocsJumped < this.TOTAL_CROCS) {
        this.nCrocsJumped++;
      }

      ConsoleLog(this.nCrocsJumped);

      // ConsoleLog(this.nCombo);
    }
  },

  standingCheck() {
    if (!this.kancil.jump && this.standingTime > 0) {
      this.standingTime -= 0.2;
    }
  },

  nextLesson() {
    if (global.parameters.lesson != undefined) {
      if (CheckIdAndToken()) {
        NextLesson();
      } else {
        this.game.state.start('gameplay');
      }
    } else {
      this.game.state.start('gameplay');
    }
  },

  // Reduce the timer
  updateTimer() {
    if (!this.isGameStarted) {
      return;
    }

    const elapsed = this.game.time.elapsed;

    this.time += elapsed;

    this.scoreInfo.text = this.score;

    if (this.curComboTime >= 0) {
      this.curComboTime -= elapsed;
      this.updateComboTimerBar(this.curComboTime, this.DEFAULT_COMBO_TIME);
    }

    if (this.curComboTime <= 0 && this.nCombo + 1 > 0) {
      this.curComboTime -= 1;
      this.updateComboTimerBar(0, 1);
      this.nCombo = -1;
      this.updateComboText();
      ConsoleLog('Combo Time Out');
    }

    if (this.time >= 1000) {
      this.time -= 1000;

      this.second++;
      if (this.second > 59) {
        this.second = 0;
        this.minute++;
      }
    }

    let secText = this.second.toString();
    if (secText.length < 2) {
      secText = `0${secText}`;
    } else if (secText.length > 2) {
      secText = '00';
    }

    let minText = this.minute.toString();
    if (minText.length < 2) {
      minText = `0${minText}`;
    }

    this.timeInfo.text = `${minText}.${secText}`;

    /* this.time++;
        ConsoleLog(this.time);
        // Handle the time (second)
        if(this.time > 9){
            this.timeInfo.text = this.time;
        }
        else{
            this.timeInfo.text = "0" + this.time;
        }
        */
  },

  // Reduce the countdowner
  updateCountdowner() {
    this.countdown--;
    this.countdownInfo.text = this.countdown.toString();
    if (this.countdown == 0) {
      // Stop the countdowner
      this.countdownInfo.addColor('#ed3024', 0);
      this.countdownInfo.text = 'GO!';
      this.countdowner.stop();

      // Start the game timer
      // this.notifPanel.destroy();
      // this.timer.start();
      // this.timeInfo.text = this.time;
    }
  },

  render() {
    // Debug the collider
    // this.game.debug.body(this.kancil);
    // for (child in this.obstacles.children)
    // {
    // this.game.debug.body(this.obstacles.children[child]);
    // }
    // this.game.debug.body(this.currentStep);
  }
};
