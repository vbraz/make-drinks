
function start(){
	document.getElementById("detail").innerHTML = "";
	document.getElementById("search").innerHTML = "";
	document.getElementById("drinkday").innerHTML = "";
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
	};
}

function all(myObj){
	var i = Math.floor(Math.random() * 5);
	document.getElementById("title").innerHTML = "Make Drinks <img src='static/"+i+".svg' class='icon-title' alt='icon drink'>";
	document.getElementById("subtitle").innerHTML = "Quer aprender como fazer drinks e coquetéis como um verdadeiro barman?<br>Explore o saboroso mundo do Make Drinks e descubra as melhores receitas.";
	drinkday(myObj);
	search();
	var card = "<div class='card-columns' id='card-columns'>";
	for(i = 0; i < myObj.length; i++) {
		//console.log(myObj[i].name);
		card += "<div class='card col-3-md mb-4' id='card' onclick=\"window.location.hash='"+myObj[i].id+"'; start();\">";
		card += "<h3>"+myObj[i].name+"</h3>";
		//card += "<img src='"+myObj[i].pic+"' class='card-img-top shadow mb-2' alt='"+myObj[i].name+"'>";
		card += "<img src='static/drink/webp/"+myObj[i].id+".webp' class='card-img-top shadow mb-2' alt='"+myObj[i].name+"'>";
		card += "<p class='lead p-0 pt-1'>"+myObj[i].text+"</p>";
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
	//detail += "<center><img src='"+myObj[i].pic+"' class='img-fluid mb-4 shadow' alt='Imagem de um "+myObj[i].name+"'></center>";
	detail += "<center><img src='static/drink/webp/"+myObj[i].id+".webp' class='img-fluid mb-4 shadow' alt='"+myObj[i].name+"'></center>";
	detail += "<h3>Ingredientes</h3>"
	detail += ingredient;
	detail += "<hr class='mt-3 mb-3'>";
	detail += "<h3>Modo de preparo</h3>"
	detail += make;
	if(myObj[i].obs) detail += "<p>OBS: "+myObj[i].obs+"</p>";
	detail += "<small>autor: "+myObj[i].copyright+"</small>";
	detail += "<center>";
	detail += "<button type='button' class='btn btn-wb mt-3 mb-3 mr-3 rounded-pill' onclick=\"window.location.hash=''; start();\">voltar</button> ";
	detail += "<a href='https://wa.me/?text="+myObj[i].text+" \n https://make-drinks.web.app/"+hash+"' data-action='share/whatsapp/share' role='button' class='btn  btn-success mt-3 mb-3 rounded-pill'>whatsapp</a>";
	detail += "</center>";

	document.getElementById("title").innerHTML = myObj[i].name+"<img src='static/"+myObj[i].cup+".svg' alt='icon drink' class='icon-title'>";
	document.getElementById("subtitle").innerHTML = myObj[i].text;
	document.getElementById("detail").innerHTML += detail;
}

function search(){
	var element = document.getElementById("search");
	element.classList.add("sticky-top");

	var search = "<form id='search_form'>";
	search += "<div class='form-group mt-4 mb-5' data-spy='affix'>";
	search += "<input type='search' id='insearch' class='form-control shadow rounded-pill' onkeyup='working_search()' autocomplete='off' aria-describedby='Pesquisar... como por exemplo caipirinha, mojito, dry martin, entre outros.' placeholder='Pesquisar... como por exemplo caipirinha, mojito, dry martin, entre outros.'>";
	search += "</div>";
	search += "</form>";
	document.getElementById("search").innerHTML = search;
}

function working_search(){
  var filter, cardcolumns, card, a, i, txtValue;
  filter = document.getElementById('insearch').value.substring().toUpperCase();
  cardcolumns = document.getElementById("card-columns");
  card = cardcolumns.getElementsByTagName('div');

  for (i = 0; i < card.length; i++) {
    a = card[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
		card[i].style.display = "";
    } else {
		card[i].style.display = "none";
    }
  }
}

function drinkday(myObj){
	var drinkday, rand;
	i = Math.floor(Math.random() * 22);
	//i = getDate();
	drinkday = "<div class='card mb-5 mt-5 d-md-block d-none' onclick=\"window.location.hash='"+myObj[i].id+"'; start();\">";
	drinkday += "<div class='row no-gutters'>";
	drinkday += "<div class='col-sm pr-3'>";
	//drinkday += "<img src='"+myObj[i].pic+"' class='card-img shadow' alt='"+myObj[i].name+"'>";
	drinkday += "<img src='static/drink/webp/"+myObj[i].id+".webp' class='card-img shadow' alt='"+myObj[i].name+"'>";
	drinkday += "</div>";
	drinkday += "<div class='col-md-8'>";
	drinkday += "<h3><small>Sugestão do barman</small><br><img src='static/star.svg' alt='icone drink da rodada' class='icon-sugesta'> "+myObj[i].name+"</h3>";
	drinkday += "<p class='card-text lead'>"+myObj[i].text+"</p>";
	drinkday += "</div>";
	drinkday += "</div>";
	drinkday += "</div>";

	drinkday += "<div class='card mb-5 mt-5 d-md-none d-block' id='card' onclick=\"window.location.hash='"+myObj[i].id+"'; start();\">";
	drinkday += "<h3><small>Sugestão do barman</small><br><img src='static/star.svg' alt='icone drink da rodada' class='icon-sugesta'> "+myObj[i].name+"</h3>";
	//drinkday += "<img src='"+myObj[i].pic+"' class='card-img-top shadow mb-2' alt='"+myObj[i].name+"'>";
	drinkday += "<img src='static/drink/webp/"+myObj[i].id+".webp' class='card-img-top shadow mb-2' alt='"+myObj[i].name+"'>";
	drinkday += "<p class='lead p-0 pt-1'>"+myObj[i].text+"</p>";
	drinkday += "</div>";


	document.getElementById("drinkday").innerHTML = drinkday;
}