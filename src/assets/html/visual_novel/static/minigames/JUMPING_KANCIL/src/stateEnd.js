var stateEnd = function(game){}
var score;

var submitSecond;

stateEnd.prototype = {
    init: function(){
        this.submitSecond = 0;
    },
    
    create: function(){
        // Show the end background
        this.game.add.sprite(0, 0, 'result');
        
        // Create the last score info
        this.lastScoreInfo = this.game.add.text(this.game.world.centerX, this.game.height * 0.525, this.score,
                                           {font: '115px dbxlnn', fill: '#ed3024'});
        this.lastScoreInfo.anchor.setTo(0.5);
        
        // Create the notification text
        this.notifTemplate = "Submitting Score...";
        this.notifText = this.game.add.text(this.game.world.centerX, this.game.height * 0.8, this.notifTemplate, {fontSize: 40, fill: '#fff'});
        this.notifText.anchor.setTo(0.5);
        this.subNotifText = this.game.add.text(this.game.world.centerX, this.game.height * 0.84, "", {fontSize: 30, fill: '#fff', fontStyle: "italic"});
        this.subNotifText.anchor.setTo(0.5);
        
        // Submitting score
        //isSubmitting = true;
        //api.submitscoreMode(this.score);
        //this.checkSubmittedScore = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.checkSubmitProgress, this);
        this.showQuitComponent();
    },
    
    quitGame: function(){
        this.game.state.start("gameplay");
    },
    
    checkSubmitProgress: function(){
        this.game.time.events.remove(this.checkSubmittedScore);
        if(scoreIsSubmitted){
            this.showQuitComponent();
        }else{
            if(!isSubmitting){
                isSubmitting = true;
                api.submitscoreMode(this.score);
            }
            
            if(this.submitSecond == 5){
                this.subNotifText.text = "CHECK YOUR CONNECTION!";
            }
            
            if(this.submitSecond == 20 || errorCode == 10101){
                this.game.time.events.remove(this.checkSubmittedScore);
                this.showQuitComponent();
                
                this.subNotifText.text = "Submitting Failed!";
                this.subNotifText.setStyle({fontSize: 50, fill: '#fff'});
                this.subNotifText.y = this.game.height * 0.9;
            }
            this.checkSubmittedScore = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.checkSubmitProgress, this);
            this.notifText.text = this.notifTemplate.substring(0, (this.notifTemplate.length - 3) + (this.submitSecond % 4));
            this.submitSecond++;
            console.log(this.submitSecond);
        }
    },
    
    // Show next button and required notification
    showQuitComponent(){
        this.notifText.text = "";
        this.subNotifText.text = "";

        this.quitButton = this.game.add.button(this.game.world.centerX, this.game.height * 0.8, 'quit_button', this.quitGame, this, 0, 0, 1, 0);
        this.quitButton.anchor.setTo(0.5);
    }
}