function list_cards(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			console.log(myObj.name);
		}
	};
	xmlhttp.open("GET", "drinks.json", true);
	xmlhttp.send();
}