function createLink() {
	var containerElements = document.getElementById('concatcontainer').childNodes;
	var linkText = '';
	try {
		for(var i = 0; i < containerElements.length; i++) {
			var elm = containerElements[i];
			if(elm.id) {
				linkText += 's' + i + '=' + elm.id.split(':')[1].replace(new RegExp(' ', 'g'), '%20') + '&';
			}
			if(linkText.length > 1500) {
				makeToast('To many sounds in queue! Cant create Link!');
				return;
			}
		}
	} catch(err) {
		console.log(err);
	}
	if(linkText !== '') {
		doXHTTPReq("php/SoundRequestHandler.php?" + linkText.substring(0,linkText.length-1), 
			function(response) {
				console.log("XHTML res: " + response);
				makeToast('<a style="line-height: 1.5em; height: 1.5em" class="waves-effect waves-light btn" onmouseup="linkToClipboardHelper(\'' + window.location.href.split('?')[0] + '?key=' + response + '\')">Copy to clipboard</a>', 5000);
			}
		);
	}
}

function linkToClipboardHelper(linkText) {
	copyToClipboard(linkText);
	makeToast("Link copied!", 2000);
}


