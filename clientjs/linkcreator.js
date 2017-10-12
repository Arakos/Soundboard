function createLink() {
	var containerElements = document.getElementById('concatcontainer').childNodes;
	var linkTextServer = '';
	var linkTextClient = '';
	try {
		for(var i = 0; i < containerElements.length; i++) {
			var elm = containerElements[i];
			if(elm.id) {
				linkTextServer += 's' + i + '=' + elm.id.split(':')[1].replace(new RegExp(' ', 'g'), '%20') + '&';
				linkTextClient += elm.id.split(':')[1] + ';';
			}
			if(linkTextServer.length > 1500) {
				makeToast('To many sounds in queue! Cant create Link!');
				return;
			}
		}
	} catch(err) {
		console.log(err);
	}
	if(linkTextServer !== '') {
		linkTextServer = linkTextServer.substring(0,linkTextServer.length-1);
		linkTextClient = linkTextClient.substring(0,linkTextClient.length-1);
		doXHTTPReq("php/SoundRequestHandler.php?" + linkTextServer, 
			function(response) {
				console.log("XHTML res: " + response);
				if(!response.match('^[0-9]*$')) {
					makeToast("An Error occured. Your soundlink may not work correctly.", 3000);
				}
			}
		);
		copyToClipboard(window.location.href.split('?')[0] + '?key=' + simpleHash(linkTextClient));
		makeToast("Link copied!", 2000);
	}
}

function linkToClipboardHelper(linkText) {
	copyToClipboard(linkText);
	makeToast("Link copied!", 2000);
}


function simpleHash(str) {
	var hash = 1;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; i++) {
		var charat = str.charCodeAt(i);
		hash = 31 * hash + charat;
		hash = hash % 10000000;
	}
	return hash;
}


