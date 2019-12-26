
function start(){
	document.getElementById("detail").innerHTML = "";
	document.getElementById("search").innerHTML = "";
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
	document.getElementById("title").innerHTML = "Make Drinks";
	document.getElementById("subtitle").innerHTML = "Quer aprender como fazer drinks e coquetéis como um verdadeiro barman? Explore o saboroso mundo do Make Drinks e descubra as melhores receitas.";
	search();
	var card = "<div class='card-columns' id='card-columns'>";
	for(var i = 0; i < myObj.length; i++) {
		//console.log(myObj[i].name);
		card += "<div class='card col-3-md mb-4' id='card' onclick=\"window.location.hash='"+myObj[i].id+"'; start();\">";
		card += "<h3>"+myObj[i].name+"</h3>";
		card += "<img src='"+myObj[i].pic+"' class='card-img-top shadow mb-2' alt='"+myObj[i].name+"'>";
		card += "<p class='lead p-0 pt-1'>"+myObj[i].text+"</p>";
		card += "</div>";
	}
	card += "</div>";
	card += "<div class='row list-single' id='notAvailable' style='display: none;'>";
	card += "<h5>Desculpe, não encotramos esse drink :(</h5>";
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
	detail += "<center><img src='"+myObj[i].pic+"' class='img-fluid mb-4 shadow' alt='Imagem de um "+myObj[i].name+"'></center>";
	detail += "<h3>Ingredientes</h3>"
	detail += ingredient;
	detail += "<hr class='mt-3 mb-3'>";
	detail += "<h3>Modo de preparo</h3>"
	detail += make;
	detail += "<center>";
	detail += "<button type='button' class='btn btn-wb mt-3 mb-3 mr-3 rounded-pill' onclick=\"window.location.hash=''; start();\">voltar</button> ";
	detail += "<a href='https://wa.me/?text="+myObj[i].text+" \n https://make-drinks.web.app/"+hash+"' data-action='share/whatsapp/share' role='button' class='btn  btn-success mt-3 mb-3 rounded-pill'>whatsapp</a>";
	detail += "</center>";

	document.getElementById("title").innerHTML = myObj[i].name;
	document.getElementById("subtitle").innerHTML = myObj[i].text;
	document.getElementById("detail").innerHTML += detail;
}


function search(){
	var search = "<form id='search'>";
	search += "<div class='form-group mt-4 mb-4'>";
	search += "<input type='search' id='insearch' class='form-control rounded-pill' onkeyup='working_search()' autocomplete='off' aria-describedby='Pesquisar... como por exemplo caipirinha, mojito, dry martin, entre outros.' placeholder='Pesquisar... como por exemplo caipirinha, mojito, dry martin, entre outros.'>";
	search += "</div>";
	search += "</form>";
	document.getElementById("search").innerHTML = search;
}

function working_search(){
  var filter, ul, li, a, i, txtValue;
  filter = document.getElementById('insearch').value.substring().toUpperCase();
  ul = document.getElementById("card-columns");
  li = ul.getElementsByTagName('div');

  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}