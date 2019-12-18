function list_cards(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			for(var i = 0; i < myObj.length; i++) {
				console.log(myObj[i].name);
				document.getElementById("card").innerHTML += "<div class='card col-3-md'>";
				document.getElementById("card").innerHTML += "<img src='"+myObj[i].pic+"' class='card-img-top' alt='"+myObj[i].name+"'>";
				document.getElementById("card").innerHTML += "<div class='card-body p-0 pt-1'>";
				document.getElementById("card").innerHTML += "<h3>"+myObj[i].name+"</h3>";
				document.getElementById("card").innerHTML += "</div>";
				document.getElementById("card").innerHTML += "</div>";
			}
		}
	};
	xmlhttp.open("GET", "https://raw.githubusercontent.com/vbraz/make-drinks/master/drinks.json?token=ABZUC74MB4ZPJHMVGGICTC257I6PW", true);
	xmlhttp.send();
}