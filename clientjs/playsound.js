var sound = new Audio();
var beat = new Audio();
var soundObjects = new Array();


function haltStop() {
	stop();
	play('sounds/andreas.RAAAAW.mp3');
}

function stop() {
	sound.pause();
	sound.currentTime = 0;
	sound.onended = undefined;
	sound.oncanplaythrough = undefined;
	sound.ontimeupdate = undefined;
	soundObjects = new Array();
}

function isValidPlayEvent() {
	var e = window.event; 
    if(!e || e.target == document || e.target.attributes['validplaytarget']) {
		return true;
	}
	return false;
}

function play(src) {
	console.log('playing: ' + src)
	if(!isValidPlayEvent()) {
		return;
	}
	stop();
	sound.src = src;
	sound.play();
}

// doesnt work on mobile for some reasen :/
function playAllNew(sounds, progress) {
	stop();
	var idx = 0;
	var myDuration = 0;
	
	var playtime = 0;
	var lastTimeStamp = 0;
	for(var i in sounds) {
		var audio = new Audio();
		audio.src = sounds[i];
		audio.preload = true;
		audio.onended = function() {
			console.log('end: ' + this.src + ' idx: ' + idx);
			if(idx < soundObjects.length) {
				sound = soundObjects[idx++];	// sound.src = soundObjects[idx++].src;
				console.log(idx + 'next: ' + sound.src);
				sound.play();	// not working on mobile for unknown reason. Works if upper line is changed but that fails the preload before play idea.
			} else {
				stop();
			}
		}
		
		audio.oncanplaythrough = function() {
			myDuration += this.duration;
			console.log('duration: ' + myDuration);
		}
		audio.ontimeupdate = function() {
			if(progress) {
				if(this.currentTime >= lastTimeStamp) {
					playtime += this.currentTime - lastTimeStamp;
				} else {
					playtime += this.currentTime;
				}
				lastTimeStamp = this.currentTime;
				progress.width = (playtime * 100) / myDuration + "%";
			}
			console.log('update for sound ' + this.src + 'currenttime: ' + this.currentTime + ' playtime: ' + playtime + ' lasttimestamp: ' + lastTimeStamp + ' duration: ' + myDuration);
		}
		
		soundObjects.push(audio);
	}
	sound.pause();
	sound = soundObjects[idx++];
	sound.play();
}

function playAll(sounds, progress) {
	var idx = 0;
	sound.src = sounds[idx++];
	console.log('playing: ' + sounds);
	sound.onended = function() {
		if(progress) {
			progress.width = (idx * 100) / sounds.length + "%";
		}
		if(idx < sounds.length) {
			sound.src = sounds[idx++];
			sound.play();
		} else {
			sound.src = '';
		}
	}
	sound.play();
}

function playMashUp() {
	var container = document.getElementById('concatcontainer');
	var items = container.childNodes;
	var soundfiles = [];
	for(var i = 0; i < items.length; i++) {
		if(items[i].id) {
			var id = items[i].id.startsWith('copy') ? items[i].id.split(':')[1] : items[i].id;
			var category = items[i].attributes["category"].value;
			soundfiles.push('sounds/' + id + '.mp3');
		}
	}
	if(soundfiles.length === 0) {
		return;
	}
	var progress = document.getElementById('soundprogress').style;
	progress.width = '0%';
	playAll(soundfiles, progress);
}

function playBeat(beatName) {
	stopBeat();
	setBeatButtonText(beatName.replace("beats/", "").replace("\.mp3", ""));
	console.log("playing beat: " + beatName.replace("beats/", "").replace("\.mp3", ""));
	beat.src = beatName;
	beat.volume = 0.6;
	beat.onended = function() {
		beat.currentTime = 0;
		beat.play();
	}
	beat.play();
	beatVolume(false);
}

function tmpBeatFunc() {
	var tmp = document.getElementById("tmpBeatButton");
	var toggleValue = tmp.attributes["data-toggle"].value;
	if(toggleValue == "0") {
		tmp.attributes["data-toggle"].value = "1";
		tmp.innerHTML = "Stop Background Beat";
		playBeat("beats/Beat 1.mp3");
	} else {
		tmp.attributes["data-toggle"].value = "0";
		tmp.innerHTML = "Play Background Beat";
		stopBeat();
	}
}

function setBeatButtonText(buttonText) {
	//document.getElementById("backgroundBeatButton").innerHTML = buttonText;
}


function beatVolume(increase) {
	if(beat.paused) {
		return;
	}
	if(increase) {
		beat.volume = beat.volume >= 0.9 ? 1.0 : beat.volume + 0.1;
	} else {
		beat.volume = beat.volume <= 0.3 ? 0.2 : beat.volume - 0.1;
	}
	makeToast("Volume: " + (beat.volume * 100).toFixed() + "%", 800);
}

function stopBeat() {
	setBeatButtonText("Background Beat");
	beat.pause();
	beat.currentTime = 0;
}
	
	
	