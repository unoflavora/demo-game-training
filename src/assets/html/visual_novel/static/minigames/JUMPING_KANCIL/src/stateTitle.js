var stateTitle = function(game){}

stateTitle.prototype = {
    init: function(){
        
    },
    
    preload: function(){

    },
    
    create: function(){
        this.game.stage.backgroundColor = '#58fafd';
        
        this.createHUD();
    },
    
    createHUD: function()
    {        
        playMusic(this.game, "opening_bgm");
        
        this.gameplayButton = this.game.add.button(this.game.width * 0.5, this.game.height * 0.65, "title_button", this.goToGameplay, this,null,0,1);
        this.gameplayButton.scale.set(0.6,0.6);
        this.gameplayButton.anchor.set(0.5,0.5);
        
        this.gameplayText = this.game.add.text(this.gameplayButton.x, this.gameplayButton.y, "Start", {font: '35px OdudoSoft', fill: '#fff', align:"center"});
        this.gameplayText.anchor.set(0.5,0.5);
        
        this.tutorialButton = this.game.add.button(this.game.width * 0.5, this.game.height * 0.75, "title_button", this.goToTutorial,this,null,0,1);
        this.tutorialButton.scale.set(0.6,0.6);
        this.tutorialButton.anchor.set(0.5,0.5);
        
        this.tutorialText = this.game.add.text(this.tutorialButton.x, this.tutorialButton.y, "Tutorial", {font: '35px OdudoSoft', fill: '#fff', align:"center"});
        this.tutorialText.anchor.set(0.5,0.5);
        
        this.grassUp = this.game.add.sprite(this.game.width * 0.5, this.game.height * 0, 'goal');
        this.grassUp.scale.set(0.675, 0.675);
        this.grassUp.anchor.set(0.5,0); 
        
        this.grassBelow = this.game.add.sprite(this.game.width * 0.5, this.game.height * 1, 'base');
        this.grassBelow.scale.set(0.675, 0.675);
        this.grassBelow.anchor.set(0.5,1);   
        
        this.titleLogo = this.game.add.sprite(this.game.width * 0.5, this.game.height * 0.375, 'title_logo');
        this.titleLogo.scale.set(0.675, 0.675);
        this.titleLogo.anchor.set(0.5,0.5);        
    },
    
    goToGameplay: function()
    {
        if (!isTutorialFirstTime)
        {            
            this.game.state.start('gameplay');
        }
        else
        {
            isTutorialFirstTime = false;
            this.goToTutorial();
        }
    },
    
    goToTutorial: function()
    {
        this.game.state.start('tutorial');
    },    
}