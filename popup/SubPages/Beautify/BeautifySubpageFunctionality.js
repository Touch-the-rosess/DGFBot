function HeaderCheckbox()
{
	
	if(document.getElementById('HeaderCheckbox').checked) {
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideHeaderBool checkbox is checked")}
		localStorage.setItem("HideHeaderBool", "True");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";'});}}
	} else {	
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideHeaderBool checkbox isn't checked")}
		localStorage.setItem("HideHeaderBool", "False");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "block";'});}}

	}
}
function FooterCheckbox()
{
	
	if(document.getElementById('FooterCheckbox').checked) {
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideFooterBool checkbox is checked")}
		localStorage.setItem("HideFooterBool", "True");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'document.getElementById("footer").style.display = "none";'});}}
	} else {	
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideFooterBool checkbox isn't checked")}
		localStorage.setItem("HideFooterBool", "False");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'document.getElementById("footer").style.display = "block";'});}}

	}
}
function InformationCheckbox()
{
	
	if(document.getElementById('InformationCheckbox').checked) {
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideInformationBool checkbox is checked")}
		localStorage.setItem("HideInformationBool", "True");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "none";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "none";'});}}
	} else {	
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideInformationBool checkbox isn't checked")}
		localStorage.setItem("HideInformationBool", "False");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "block";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "block";'});}}
	}
}
function CampaignsCheckbox()
{
	
	if(document.getElementById('CampaignsCheckbox').checked) {
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideCampaignsBool checkbox is checked")}
		localStorage.setItem("HideCampaignsBool", "True");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "none";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "none";'});}}

	} else {	
		if (localStorage.getItem("Debug") == "True"){console.log("Now the HideCampaignsBool checkbox isn't checked")}
		localStorage.setItem("HideCampaignsBool", "False");
		if (localStorage.getItem("BeautifySwitch") == "True"){{browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "block";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "block";'});}}
	}
}

document.getElementById('HeaderCheckbox').addEventListener('change', HeaderCheckbox);
document.getElementById('FooterCheckbox').addEventListener('change', FooterCheckbox);
document.getElementById('InformationCheckbox').addEventListener('change', InformationCheckbox);
document.getElementById('CampaignsCheckbox').addEventListener('change', CampaignsCheckbox);