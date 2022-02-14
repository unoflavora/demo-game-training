var statePreload = function(game){}

statePreload.prototype = {
    init: function(){
        this.isReady = false;
    },
    
    preload: function(){
        // Load the loading component
        this.game.load.spritesheet('loader', 'assets/graphics/loading_sprite.png', 150, 150);
    },
    
    create: function(){
        this.game.stage.backgroundColor = '#eeeeee';
        
        // Show the loading background
        this.loader =  this.game.add.sprite(this.game.width * 0.5, this.game.height * 0.42, 'loader');
        this.loader.anchor.set(0.5, 0.5);
        
        // dummy text to load font
        var dummyText = this.game.add.text(0, 0, "", {font:"1px OdudoSoft", fill:"#FFFFFF"});
        dummyText.visible = false;
              
        this.loaderAnimation = this.loader.animations.add("loading");
        this.loaderAnimation.play(60, true);        
        
        // Create the progress text
        this.progressText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.495, "100 %", {align:"center", font:"30px OdudoSoft", fontSize: 30, fill: '#111'});
        this.progressText.anchor.setTo(0.5);
        
        // Create the notification text
        this.notification = document.getElementById("message");
        
        // Create the modal
        var modal = document.getElementById('popUp');
        dismiss.onclick = function(){
            modal.style.display = "none";
        }
        
        // Load the game resources
        this.loadGraphics();
        this.loadAudios();

        // Handle the loading process
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.game.load.start();
    },
    
    // List all the resource file below
    loadGraphics: function(){
        this.game.load.image('base', 'assets/graphics/start.png');
        this.game.load.image('goal', 'assets/graphics/goal.png');
        
        this.game.load.image("dark_screen", "assets/graphics/dark_screen.png");
  
        this.game.load.spritesheet('kancil', 'assets/graphics/deer.png', 180, 350);
        
        this.game.load.spritesheet('splash', 'assets/graphics/splash.png', 150, 150);
        
        this.game.load.spritesheet('crocs', 'assets/graphics/crocs.png', 550, 200);
        this.game.load.image('score_bar', 'assets/graphics/box_score.png');
        this.game.load.image('timer_bar', 'assets/graphics/box_timer.png');
        this.game.load.image('timer_icon', 'assets/graphics/timer.png');
        
        this.game.load.spritesheet('button', 'assets/graphics/button1.png', 604, 160);
        this.game.load.spritesheet('title_button', 'assets/graphics/button3.png', 604, 160);
        this.game.load.image('close_button', 'assets/graphics/close.png');
        this.game.load.image('next_button', 'assets/graphics/next.png'); 
        
        this.game.load.image('title_logo', 'assets/graphics/title.png');
        
        this.game.load.image('circle_white', 'assets/graphics/combo2.png'); 
        
        this.game.load.spritesheet('slide_dot', 'assets/graphics/slide.png', 24, 24);
        
        this.game.load.image('deer_happy', 'assets/graphics/deer_happy.png');
        this.game.load.image('deer_sad', 'assets/graphics/deer_sad.png');        
        this.game.load.image('deer_normal', 'assets/graphics/deer_normal.png');         
        
        this.game.load.image('tutor1', 'assets/graphics/tutor1.png');
        this.game.load.image('tutor2', 'assets/graphics/tutor2.png');        
        this.game.load.image('tutor3', 'assets/graphics/tutor3.png');         
        
        this.game.load.image('notifBox1', 'assets/graphics/box1.png');
        this.game.load.image('notifBox2', 'assets/graphics/box2.png');
    },
    
    loadAudios: function()
    {
        this.game.load.audio('jump', 'assets/audios/Kancil_Lompat.ogg');
        this.game.load.audio('splash', 'assets/audios/Mendarat_tercebur.ogg');
        
        this.game.load.audio('land_on_croc', 'assets/audios/Mendarat_buaya.ogg'); 
        
        this.game.load.audio('happy_kancil', 'assets/audios/Kancil_Happy.ogg'); 
        this.game.load.audio('sad_kancil', 'assets/audios/Kancil_sad.ogg'); 
        
        this.game.load.audio('opening_bgm', 'assets/audios/Deer & Croco - opening.ogg'); 
        this.game.load.audio('gameplay_bgm', 'assets/audios/Deer & Croco - backsound.ogg'); 
    },
    
    tapButtonHandler: function(){
        if(this.isReady){
            this.game.state.states['gameplay'].round = 1;
            this.game.state.start('title');
        }
    },
    
    loadStart: function(){
        this.progressText.setText("Loading Files\n0%");
    },
    
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles){
        this.progressText.text = "Loading Files\n" + progress.toString() + "%";
    },

    loadComplete: function(){
        //this.checkId();
        
        // * Below code is only for debug
        //this.startButton.alpha = 0;
        //this.progressText.alpha = 0;
        this.progressText.text = "Tap to continue";
        this.game.input.onTap.add(this.tapButtonHandler, this); 
        this.isReady = true;
        this.loaderAnimation.stop();
        this.loaderAnimation.frame = 0;
    },
}