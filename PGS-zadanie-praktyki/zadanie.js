var http_request = new XMLHttpRequest();
var url = "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers ";
var fullnames = new Array();
var goals = new Array();

http_request.onreadystatechange = handle_json;
http_request.open("GET", url);

http_request.setRequestHeader("X-Mashape-Key",
		"kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw");
http_request.send(null);

function handle_json() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var json_data = http_request.responseText;
			var the_object = JSON.parse(json_data);
			var i = 0;

			fullnames.length = the_object.data.topscorers.length;
			goals.length = the_object.data.topscorers.length;

			for (i = 0; i < the_object.data.topscorers.length; i++) {
				fullnames[i] = the_object.data.topscorers[i].fullname;
				goals[i] = the_object.data.topscorers[i].goals;
			}

			fillTable();
		} else {
			alert('Wystąpił problem z wybranym adresem URL.');
		}
		http_request = null;
	}
}

function fillTable() {
	var i = 0;
	var background = "";
	var rows = '<tr id="column_name"><td style="width: 150px;">POZYCJA</td><td style="width: 500px; text-align: left; padding-left: 50px">ZAWODNIK</td><td style="width: 150px";>GOLE</td></tr>';

	for (i = 0; i < fullnames.length; i++) {
		if ((i) % 2 == 0) {
			content = '<tr class="dark"><td class="position">' + (i + 1)
					+ '</td><td class="player">' + fullnames[i]
					+ '</td><td class="goals">' + goals[i] + '</td></tr>';
		} else {
			content = '<tr class="light"><td class="position">' + (i + 1)
					+ '</td><td class="player">' + fullnames[i]
					+ '</td><td class="goals">' + goals[i] + '</td></tr>';
		}
		rows = rows + content;
	}

	document.getElementById("table").innerHTML = rows;
}