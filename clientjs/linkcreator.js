function createLink() {
	var containerElements = document.getElementById('concatcontainer').childNodes;
	var linkText = '';
	try {
		for(var i = 0; i < containerElements.length; i++) {
			var elm = containerElements[i];
			if(elm.id) {
				linkText += 's' + i + '=' + elm.id.split(':')[1] + '&';
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
		copyToClipboard(window.location.href.split('?')[0] + '?' + linkText.substring(0,linkText.length-1));
		makeToast('Link copied to Clipboard');
	}
}