if (localStorage.getItem("Debug") == "True"){console.log("Now is opened the beautify sub page. And initializating the page.")}
function check(item) {document.getElementById(item).checked = true;}
function uncheck(item) {document.getElementById(item).checked = false;}
function statusCheck(itemId,state) 

{
	//var converted = Number(state)
	if (state == "False") {uncheck(itemId)}
	else if (state == "True") {check(itemId)}
	else {if (localStorage.getItem("Debug") == "True"){console.log("There is some error with the statement, it should be False or True but it is: ",state);console.log(itemId)}}
	
}

statusCheck("HeaderCheckbox",localStorage.getItem("HideHeaderBool"));
statusCheck("FooterCheckbox",localStorage.getItem("HideFooterBool"));
statusCheck("InformationCheckbox",localStorage.getItem("HideInformationBool"));
statusCheck("CampaignsCheckbox",localStorage.getItem("HideCampaignsBool"));
if (localStorage.getItem("Debug") == "True"){console.log("End of the beautify sub page script.");}


