function add(elm) {
	var container = document.getElementById('concatcontainer');
	console.log(elm);
	container.appendChild(elm);
}

function addCopy(elm) {
	add( createCopy(elm) );
}

function createCopy(elm) {
	var newNode = elm.cloneNode(true);
	newNode.id = 'copy' + counter++ + ':' + newNode.id;
	newNode.style.margin = '5px';
	var childs = newNode.childNodes;
	for(var i = 0; i < childs.length; i++) {
		if(childs[i].tagName === 'A') {
			childs[i].onclick = function() { return remove(this.parentNode); };
			childs[i].childNodes[1].innerHTML = 'remove';
		}
		if(childs[i].className === 'waves-ripple ') {	// remove wave effects temp div from copied object
			newNode.removeChild(childs[i]);
		}
	}
	console.log('copied: ' + elm.id + ' --> ' + newNode.id);
	return newNode;
}

function remove(elm) {
	var concatedElements = document.getElementById("concatcontainer");
	concatedElements.removeChild(elm);
	return false;
}

function removeAll() {
	var concatedElements = document.getElementById("concatcontainer");
	while(concatedElements.childNodes.length > 0) {
		concatedElements.removeChild(concatedElements.firstChild);	
	}
}