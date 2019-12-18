function start(){
	document.getElementById("detail").innerHTML = "";
	document.getElementById("all").innerHTML = "";
	var hash = window.location.hash;
	if(hash){
		detail(hash);
	} else {
		all();
	}
}

function all(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var card = "<div class='card-columns'>";
			for(var i = 0; i < myObj.length; i++) {
				//console.log(myObj[i].name);
				card += "<div class='card col-3-md mb-4' onclick=\"window.location.hash='"+myObj[i].name+"'; start();\">";
				card += "<h3>"+myObj[i].name+"</h3>";
				card += "<img src='"+myObj[i].pic+"' class='card-img-top' alt='"+myObj[i].name+"'>";
				card += "<div class='card-body p-0 pt-1'>";
				card += myObj[i].text;
				card += "</div>";
				card += "</div>";
			}
			card += "</div>";
			document.getElementById("all").innerHTML += card;
		}
	};
	var key = "ABZUC72SBGFANEDVDRXVGQ257J55Q";
	xmlhttp.open("GET", "https://raw.githubusercontent.com/vbraz/make-drinks/master/drinks.json?token="+key, true);
	xmlhttp.send();
}

function detail(hash){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var detail = "";
			for(var i = 0; i < myObj.length; i++) {
				if(hash == "#"+myObj[i].name){
					//console.log(myObj[i].name);
					detail += "<div class='card col-3-md mb-4' onclick=\"window.location.hash='"+myObj[i].name+"'; start();\">";
					detail += "<h3>"+myObj[i].name+"</h3>";
					detail += "<img src='"+myObj[i].pic+"' class='card-img-top' alt='"+myObj[i].name+"'>";
					detail += "<div class='card-body p-0 pt-1'>";
					detail += myObj[i].text;
					detail += "</div>";
					detail += "</div>";
				}
			}
			detail += "<center><button type='button' class='btn btn-dark' onclick=\"window.location.hash=''; start();\">voltar</button></center>";
			document.getElementById("detail").innerHTML += detail;
		}
	};
	var key = "ABZUC72SBGFANEDVDRXVGQ257J55Q";
	xmlhttp.open("GET", "https://raw.githubusercontent.com/vbraz/make-drinks/master/drinks.json?token="+key, true);
	xmlhttp.send();
}