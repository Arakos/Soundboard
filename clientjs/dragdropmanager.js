var counter = 0;

function dragStart(ev) {
	var data = ev.target.id;
	ev.dataTransfer.setData("id", data);
	console.log('drag event: ' + data);
}

function drop(ev) {
    var sourceID = ev.dataTransfer.getData("id");
	var targetID = ev.target.id;
	
	if(!targetID || targetID === 'soundimg') {
		targetID = ev.target.parentNode.id;
	}
	console.log('drop event for target: ' + targetID + " source: " + sourceID);

	if(targetID === "concatcontainer" && !sourceID.startsWith('copy')) {
		var toCopy = document.getElementById(sourceID);
		addCopy(toCopy);
		
	} else if(targetID === "trash" && sourceID.startsWith('copy')) {
		var concatcontainer = document.getElementById("concatcontainer")
		var concatedElements = concatcontainer.children;
		for(var i = 0; i < concatedElements.length; i++) {
			if(concatedElements[i].id === sourceID) {
				concatcontainer.removeChild(concatedElements[i]);
			}
		}
		
	} else if(targetID.startsWith('copy')) {
		var container = document.getElementById("concatcontainer");
		var sourceNode = document.getElementById(sourceID);
		
		if(sourceID.startsWith('copy')) {
			container.removeChild(sourceNode);
			
		} else {
			sourceNode = createCopy(document.getElementById(sourceID));
		}
		
		var concatedElements = container.children;
		for(var i = 0; i < concatedElements.length; i++) {
			if(concatedElements[i].id === targetID) {
				container.insertBefore(sourceNode,concatedElements[i]);
			}
		}
	}
}

function validDropTarget(ev) {
	console.log('drag over: ' + ev.target.id);
	ev.preventDefault();
}

