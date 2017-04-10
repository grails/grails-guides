function toggleNavIcon() {
	if ( document.getElementById('nav-icon').className === "open" ) {
		document.getElementById('nav-icon').className = "";	
		document.getElementById('navbar-nav').classList.add("closemobile");								
	} else {
		document.getElementById('nav-icon').className += "open";	
		document.getElementById('navbar-nav').classList.remove("closemobile");					
	}	 
console.log("class: " + document.getElementById('navbar-nav').className);
}
