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
	document.getElementById("title").innerHTML = "Make Drinks";
	document.getElementById("subtitle").innerHTML = "Quer aprender como fazer drinks e coquetéis como um verdadeiro barman? Explore o saboroso mundo do TheBar.com e descubra as melhores receitas de...";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var card = "<div class='card-columns'>";
			for(var i = 0; i < myObj.length; i++) {
				//console.log(myObj[i].name);
				card += "<div class='card col-3-md mb-4' onclick=\"window.location.hash='"+myObj[i].id+"'; start();\">";
				card += "<h3>"+myObj[i].name+"</h3>";
				card += "<img src='"+myObj[i].pic+"' class='card-img-top shadow' alt='"+myObj[i].name+"'>";
				card += "<div class='card-body p-0 pt-1'>";
				card += myObj[i].text;
				card += "</div>";
				card += "</div>";
			}
			card += "</div>";
			document.getElementById("all").innerHTML += card;
		}
	};
	xmlhttp.open("GET", "https://make-drinks.web.app/drinks.json", true);
	xmlhttp.send();
}

function detail(hash){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var detail = "", ingredient = "", make = "", count = 1;
			for(var i = 0; i < myObj.length; i++) {
				if(hash == "#"+myObj[i].id){
					for(var ii = 0; ii < myObj[i].ingredients.length; ii++) {
						ingredient += " - "+myObj[i].ingredients[ii].ingredient+"<br>";
					}
					for(var ii = 0; ii < myObj[i].make.length; ii++) {
						make += "<p><b>"+count+".</b> "+myObj[i].make[ii].step+"</p>";
						count = count + 1;
					}
					break;
				}
			}
			detail += "<center><img src='"+myObj[i].pic+"' class='img-fluid mb-4 shadow' alt='"+myObj[i].name+"'></center>";
			detail += "<h3>Modo de preparo</h3>"
			detail += ingredient;
			detail += "<hr class='mt-3 mb-3'>";
			detail += "<h3>Ingredientes</h3>"
			detail += make;
			detail += "<center><button type='button' class='btn mt-3 mb-3 pr-5 pl-5 rounded-pill' onclick=\"window.location.hash=''; start();\">voltar</button></center>";

			document.getElementById("title").innerHTML = myObj[i].name;
			document.getElementById("subtitle").innerHTML = myObj[i].text;
			document.getElementById("detail").innerHTML += detail;
		}
	};
	xmlhttp.open("GET", "https://make-drinks.web.app/drinks.json", true);
	xmlhttp.send();
}