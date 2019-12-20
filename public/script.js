
function start(){
	document.getElementById("detail").innerHTML = "";
	document.getElementById("all").innerHTML = "";
	var hash = window.location.hash;
	var xmlhttp = new XMLHttpRequest();

	//xmlhttp.open("GET", "drinks.json", true);
	xmlhttp.open("GET", "https://raw.githubusercontent.com/vbraz/make-drinks/master/public/drinks.json", true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
				if(hash){ detail(hash, myObj);
				} else  { all(myObj); }
			}
			if(hash){ detail(hash, myObj);
			} else  { all(myObj); }
		}
	};
}

function all(myObj){
	document.getElementById("title").innerHTML = "Make Drinks";
	document.getElementById("subtitle").innerHTML = "Quer aprender como fazer drinks e coquetéis como um verdadeiro barman? Explore o saboroso mundo do Make Drinks e descubra as melhores receitas.";
	var card = "<div class='card-columns'>";
	for(var i = 0; i < myObj.length; i++) {
		//console.log(myObj[i].name);
		card += "<div class='card col-3-md mb-4' onclick=\"window.location.hash='"+myObj[i].id+"'; start();\">";
		card += "<h3>"+myObj[i].name+"</h3>";
		card += "<img src='"+myObj[i].pic+"' class='card-img-top shadow' alt='"+myObj[i].name+"'>";
		card += "<div class='card-body p-0 pt-1'>";
		card += "<p class='lead'>"+myObj[i].text+"</p>";
		card += "</div>";
		card += "</div>";
	}
	card += "</div>";
	document.getElementById("all").innerHTML += card;
}

function detail(hash, myObj){
	var detail = "", ingredient = "", make = "", count = 1;
	for(var i = 0; i < myObj.length; i++) {
		if(hash == "#"+myObj[i].id){
			for(var ii = 0; ii < myObj[i].ingredients.length; ii++) {
				ingredient += "<p class='lead'> - "+myObj[i].ingredients[ii].ingredient+"</p>";
			}
			for(var ii = 0; ii < myObj[i].make.length; ii++) {
				make += "<p class='lead'><b>"+count+".</b> "+myObj[i].make[ii].step+"</p>";
				count = count + 1;
			}
			break;
		}
	}
	hash = hash.replace("#","%23");
	detail += "<center><img src='"+myObj[i].pic+"' class='img-fluid mb-4 shadow' alt='"+myObj[i].name+"'></center>";
	detail += "<h3>Ingredientes</h3>"
	detail += ingredient;
	detail += "<hr class='mt-3 mb-3'>";
	detail += "<h3>Modo de preparo</h3>"
	detail += make;
	detail += "<center>";
	detail += "<button type='button' class='btn btn-wb mt-3 mb-3 rounded-pill' onclick=\"window.location.hash=''; start();\">voltar</button> ";
	detail += "<a href='https://wa.me/?text="+myObj[i].text+" \n https://make-drinks.web.app/"+hash+"' data-action='share/whatsapp/share' role='button' class='btn  btn-success mt-3 mb-3 rounded-pill'>whatsapp</a>";
	detail += "</center>";

	document.getElementById("title").innerHTML = myObj[i].name;
	document.getElementById("subtitle").innerHTML = myObj[i].text;
	document.getElementById("detail").innerHTML += detail;
}


function search(){
	document.getElementById("search").innerHTML = "<form>";
	document.getElementById("search").innerHTML += "<div class='form-group'>";
	document.getElementById("search").innerHTML += "<input type='search' class='form-control' id='' aria-describedby=''>
	document.getElementById("search").innerHTML += "<small id='' class='form-text text-muted'></small>";
	document.getElementById("search").innerHTML += "</div>";

}