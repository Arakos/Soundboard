var sounds= document.getElementsByName("soundwrapper");
var lastSearchStr = '';

function search() {
	var delButton = document.getElementById('delSearchButton');
	var value = document.getElementById('search').value;
	console.log('searchvalue: ' + value);
	if(value === '') {
		resetItems();
		delButton.style.display = 'none';
		
	}else if(value === '#') {
		resetItems();
		delButton.style.display = 'block';
		
	} else {
		doSearch(value);
		delButton.style.display = 'block';
	}
	lastSearchStr = value;
}

function doSearch(value) {
	if(!value.startsWith(lastSearchStr)) {
		resetItems();
	}
	
	for(var i = 0; i < sounds.length; i++) {
		var sound = sounds[i].getElementsByClassName('soundchip')[0];
		var soundWrapper = sounds[i];
		if(sound) {
			if(value.startsWith('#')) {
				if(!startsWithIgnoreCase(sound.attributes["category"].value, value.substring(1,value.length))) {
					soundWrapper.style.display = 'none';
				}
				
			} else if(!startsWithIgnoreCase(sound.id.split('.')[1], value)) {
				soundWrapper.style.display = 'none';
			} 
		}
	}
}

function resetItems() {
	console.log('reset');
	for(var i = 0; i < sounds.length; i++) {
		sounds[i].style.display = 'block';
	}
}

function delSearch() {
	var searchfield = document.getElementById('search')
	searchfield.value = '';
	lastSearchStr = '';
	search(searchfield);	
}

function startsWithIgnoreCase(s1, s2) {
	return s1.toUpperCase().startsWith(s2.toUpperCase());
}
