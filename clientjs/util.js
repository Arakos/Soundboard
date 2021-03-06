function showOrHide(node) {
	if(node.id === 'bottom-small') {
		var v1 = document.getElementById('side-container');
		var v2 = document.getElementsByTagName('body')[0];
		var v3 = document.getElementById('bottom-arrow');
		if(v1.style.display == 'none' || v1.style.display === '') {
			v1.style.display = 'block';
			v2.style.marginBottom = '120%';
			v3.innerHTML = "arrow_downward";
		} else {
			v1.style.display = 'none';
			v2.style.marginBottom = '10%';
			v3.innerHTML = "arrow_upward";
		}
	}
}

function init(initSounds) {
	if(Array.isArray(initSounds)) {
		if(initSounds.length > 0) {
			var container = document.getElementById('concatcontainer');
			for(var i = 0; i < initSounds.length; i++) {
				try {
					addCopy(document.getElementById(initSounds[i]));
				} catch(err) {
					console.log('Cannot find element for id: ' + initSounds[i]);
					console.log(err);
				}
			}
			showOrHide(document.getElementById('bottom-small'));
		}
		play('sounds/davis.Hallo.mp3');
		
	} else {
		doXHTTPReq("php/SoundRequestHandler.php?key=" + initSounds, 
			function(result) {
				init(result.split(';'));
			}
		);
	}
}


function copyToClipboard(str){
    //based on https://stackoverflow.com/a/12693636
	var tmp = document.oncopy;
    document.oncopy = function(event) {
		event.clipboardData.setData("Text", str);
		event.preventDefault();
    };
	console.log("copy to clipboad: " + str);
    document.execCommand("Copy");
    document.oncopy = tmp;
}

function makeToast(str, time = 1500) {
	if(str) {
		var toast = document.getElementById('toastdiv');
		toast.innerHTML = str;
		toast.style.display = 'inline-block';
		setTimeout(function() {toast.style.display = 'none';}, time);
	}
}

function replaceAll(src, find, replace) {
	if(src && find && replace) {
		return src.replace(new RegExp(find, 'g'), replace);
	}
	return src;
}

function doXHTTPReq(args, handler) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			handler(xhttp.responseText);
		};
	}
	xhttp.open("GET", args, true);
	xhttp.send();
}

