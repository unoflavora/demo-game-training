var Cur_Music = '';
var Cur_Music_Obj = null;
var Debug = false;

var defaultHeight = 720;
var defaultWidth = defaultHeight;
var desktopMobileRatio;
gameRatio = window.innerHeight / window.innerWidth;
defaultGameRatio = window.innerWidth / window.innerHeight;
defaultHeight *= gameRatio;
desktopMobileRatio = defaultGameRatio * 1.75;

function ConsoleLog(msg) {
	if (Debug) {
		console.log(msg);
	}
}

function Global(game) {
	this.game = game;
	this.parameters = GetQueries();

	this.isBGM_running = false;
}

function playMusic(game, musicName) {
	if (Cur_Music == musicName) {
		return;
	}

	if (Cur_Music_Obj != null) {
		Cur_Music_Obj.stop();
		Cur_Music_Obj.destroy();
	}

	Cur_Music = musicName;

	/*if (!global.isBGM_running)
    {
        this.bgm.loopFull();
        this.bgm.volume = 0.35;
        global.isBGM_running = true;
    }*/

	Cur_Music_Obj = game.add.audio(musicName);

	//Cur_Music_Obj.volume = 0.35;
	Cur_Music_Obj.loopFull();
}

function GetQueries() {
	var queries = window.location.search.substring(1).split('&');
	var len = queries.length;
	var query;
	var parameters = [];

	for (let i = 0; i < len; i++) {
		query = queries[i].split('=');
		parameters[query[0]] = query[1];
	}

	ConsoleLog(parameters);

	return parameters;
}

function NextLesson() {
	let id = global.parameters['id'];
	let token = global.parameters['token'];
	let exp = global.parameters['exp'];
	let lessonId = global.parameters['lessonId'];
	let company = global.parameters['company'];
	let lessonidx = global.parameters['lessonidx'];
	let topicidx = global.parameters['topicidx'];

	if (CheckIdAndToken()) {
		ConsoleLog('Next Lesson');
		document.location.href = '../../index.html?' + window.location.search.slice(1);
	}
}

function CheckIdAndToken() {
	let id = global.parameters['id'];
	let token = global.parameters['token'];

	if (id != undefined && token != undefined) {
		return true;
	} else {
		return false;
	}
}
