if (localStorage.getItem("Debug") == "True"){console.log("Popup is showing")}
var Beautify = document.getElementById('Checkbox1'); //Storing checkbox for further using
if (localStorage.getItem("isNizi") == "False")
{
	document.getElementById("MyBody").style.display = "none";
	document.getElementById("Alert").style.display = "block";
}
else if (localStorage.getItem("isNizi") == "True")
{
	document.getElementById("MyBody").style.display = "block";
	document.getElementById("Alert").style.display = "none";
	var isBeautify = localStorage.getItem("BeautifySwitch")
	if 		(isBeautify == "True") 	{document.getElementById("Checkbox1").checked = true;}
	else if (isBeautify == "False") {document.getElementById("Checkbox1").checked = false;}
}
