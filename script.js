function list_cards(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var card = "<div class='card-columns'>";
			for(var i = 0; i < myObj.length; i++) {
				console.log(myObj[i].name);
				card += "<div class='card col-3-md'>";
				card += "<h3>"+myObj[i].name+"</h3>";
				card += "<img src='"+myObj[i].pic+"' class='card-img-top' alt='"+myObj[i].name+"'>";
				card += "<div class='card-body p-0 pt-1'>";
				card += myObj[i].text;
				card += "</div>";
				card += "</div>";
			}
			card += "</div>";
			document.getElementById("card").innerHTML += card;
		}
	};
	xmlhttp.open("GET", "https://raw.githubusercontent.com/vbraz/make-drinks/master/drinks.json?token=ABZUC72EMOTW6DRAZBFMVP257I6Z4", true);
	xmlhttp.send();
}