var fio = ['Але','Анд','Бар'];
var cInd = 0;
var arr = [];
var hash = {};
//var fs = require('fs');

function checkTr() {
	let tbody = window.document.getElementById('search-data');
	return tbody.children.length;
}

function parsePage() {
	if (cInd <= fio.length) {
		let tbody = window.document.getElementById('search-data');
		if (checkTr()) {
			hash[cInd] = Object.values(tbody.children).map(t => t.innerText);
			//tbody.innerHTML = '';
		}
		else {
			console.log('test', cInd);
			if (cInd) {
				setTimeout(parsePage, 1000);
				return;
			}
		}

		let s = window.document.getElementById('surname');
		if (s) s.value = fio[cInd++];
		else alert("не нашли: surname ");
		
		let b = window.document.getElementById('search');
		if (b) {
			b.click();
			parsePage();
		}

	} else {
		// arr = Object.values(hash).reduce((a, c) => { a = a.concat(c); return a;}, []);
		console.log('test', hash, arr);
		//navigator.clipboard.writeText(JSON.stringify(hash, null, 2));
		writeJSON(JSON.stringify(hash, null, 2), 'result.json')
		//console.log(JSON.stringify(hash), JSON.parse(JSON.stringify(hash)));
	}
}

/*
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("/Users/Documents/workspace/test.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});

chrome.runtime.getPackageDirectoryEntry(function(root) {
	root.getFile("g://github/Copy-Code/result.json", {}, function(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				var myFile = JSON.parse(this.result);
				//do here whatever with your JS object(s)
				console.log(JSON.stringify(myFile, null, 2))
			};
			reader.readAsText(file);
		});
	});
});
*/

function writeJSON(hash, file){
	var vLink = document.createElement('a'),
	vBlob = new Blob([hash], {type: "octet/stream"}),
	vUrl = window.URL.createObjectURL(vBlob);
	vLink.setAttribute('href', vUrl);
	vLink.setAttribute('download', file );
	vLink.click();
}

window.addEventListener("load", parsePage);
