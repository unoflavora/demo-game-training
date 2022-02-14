var stateTutorial = function(game){}

stateTutorial.prototype = {
    init: function(){
        this.tutIndex = 0;
        this.tutMessages = [];
        this.sliderDots = [];
    },
    
    preload: function(){

    },
    
    create: function(){
        this.game.stage.backgroundColor = '#eeeeee';
        
        this.init();
        
        this.createHUD();
    },
    
    createHUD: function()
    {        
        this.tutMessages.push("Tap to make the deer jump over");
        this.tutMessages.push("Get a bonus score if you land before the timer bar runs out");
        this.tutMessages.push("Be careful and don't fall into water");        
        
        this.closeButton = this.game.add.button(this.game.width * 0.03, this.game.height * 0.0175, "close_button", this.goToTitle, this);
        this.closeButton.scale.set(0.675,0.675);      
        
        this.gameplayButton = this.game.add.button(this.game.width * 0.5, this.game.height * 0.9, "button", this.goToGameplay, this,null,0,1);
        this.gameplayButton.scale.set(0.6,0.6);
        this.gameplayButton.anchor.set(0.5,0.5);
        
        this.gameplayText = this.game.add.text(this.gameplayButton.x, this.gameplayButton.y, "Tap to Play", {font: '35px OdudoSoft', fill: '#fff', align:"center"});
        this.gameplayText.anchor.set(0.5,0.5);        

        this.howToPlayText = this.game.add.text(this.gameplayButton.x, this.game.height * 0.05, "How to play", {font: '45px OdudoSoft', fill: '#111', align:"center"});
        this.howToPlayText.anchor.set(0.5,0.5);
        
        this.instructionText = this.game.add.text(this.gameplayButton.x, this.game.height * 0.15, this.tutMessages[this.tutIndex], {font: '35px OdudoSoft', fill: '#111', align:"center", wordWrapWidth: this.game.width * 0.9, wordWrap: true});
        this.instructionText.anchor.set(0.5,0.5);        
        
        this.tutorImgs = [];
        
        this.tutorImgs[0] = this.game.add.sprite(this.game.width*0.5, this.game.height*0.5,"tutor1");
        this.tutorImgs[0].scale.set(0.675, 0.675);
        this.tutorImgs[0].anchor.set(0.5, 0.5);
        
        this.tutorImgs[1] = this.game.add.sprite(this.game.width*0.5, this.game.height*0.5,"tutor2");
        this.tutorImgs[1].scale.set(0.675, 0.675);
        this.tutorImgs[1].anchor.set(0.5, 0.5);
        
        this.tutorImgs[2] = this.game.add.sprite(this.game.width*0.5, this.game.height*0.5,"tutor3");
        this.tutorImgs[2].scale.set(0.675, 0.675);
        this.tutorImgs[2].anchor.set(0.5, 0.5);
                        
        this.leftNextButton = this.game.add.button(this.game.width * 0.065, this.game.height * 0.5, "next_button", this.prevTutor, this);
        this.leftNextButton.scale.set(-0.6,0.6);
        this.leftNextButton.anchor.set(0.5,0.5);  
        this.leftNextButton.visible = false;
        
        this.rightNextButton = this.game.add.button(this.game.width * 0.935, this.game.height * 0.5, "next_button", this.nextTutor, this);
        this.rightNextButton.scale.set(0.6,0.6);
        this.rightNextButton.anchor.set(0.5,0.5);
        
        this.createSliderDots(); 
        this.displayTutorImage(this.tutIndex);
    },
    
    createSliderDots: function(size = 3)
    {
        var tempSliderDot;
        var baseX = 0.45;
        var deltaX = 0.05;
        
        for (let i=0;i<3;i++)
        {
            tempSliderDot = this.game.add.sprite(this.game.width*(baseX+deltaX*i), this.game.height*0.78,"slide_dot");
            tempSliderDot.scale.set(0.6,0.6);
            tempSliderDot.anchor.set(0.5,0.5);
            tempSliderDot.frame = 1;
            this.sliderDots.push(tempSliderDot);
        }
        
        this.sliderDots[0].frame = 0;
    },
    
    prevTutor: function()
    {
        if (this.tutIndex > 0)
        {
            this.tutIndex--;
            
            if (this.tutIndex == 0)
            {
                this.leftNextButton.visible = false;
            } 
            else
            {
                if (!this.rightNextButton.visible)
                {
                    this.rightNextButton.visible = true;
                }                
            }
        }
        
        this.displayTutorImage(this.tutIndex);
    },    
    
    nextTutor: function()
    {
        if (this.tutIndex < this.tutorImgs.length)
        {
            this.tutIndex++;

            if (this.tutIndex == this.tutorImgs.length-1)
            {
                this.rightNextButton.visible = false;
            }
            else
            {
                if (!this.leftNextButton.visible)
                {
                    this.leftNextButton.visible = true;
                }    
            }
        }
        
        this.displayTutorImage(this.tutIndex);
    },
    
    displayTutorImage: function(index)
    {
        for (let i=0;i<this.tutorImgs.length;i++)
        {
            this.tutorImgs[i].visible = false;
            this.sliderDots[i].frame = 1;
        }
        
        this.tutorImgs[index].visible = true;
        this.sliderDots[index].frame = 0;
        this.instructionText.text = this.tutMessages[index];
    },
    
    changeTutInstruction: function()
    {
        this.instructionText.text = this.tutMessages[this.tutIndex];
    },
    
    goToTitle: function()
    {
        this.game.state.start('title');
    },
    
    goToGameplay: function()
    {
        this.game.state.start('gameplay');
    }
}