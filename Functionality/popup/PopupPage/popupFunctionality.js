var NiziTabId = null;  // i need this var to be global cuz for further use, in future i'll need it to send "content script" to certain tab

Popup();
async function Popup()
{
	function handleResponse(message) {// i'll make handleResponse also to be global
		//console.log(message);
		if(message.response == "CheckIfDGTabIsAvailable"){NiziTabId = message.niziTabId;return;}
		if(message.response == "GetVars"){return message.variables;}
		//if(message.response == "GetOthersCheckboxVar"){return message.variables;}
	}

	function handleError(error) {console.log(`Error handler of popup catched an error:\n\t ${error}`);}


	await browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"CheckIfDGTabIsAvailable"}).then(handleResponse, handleError);// getting the id of the nizi game tab
	console.log("Nizi site is on tab with id: " + NiziTabId);
	if(NiziTabId != null)
	{
		var clases = document.getElementsByClassName("allBox");for(var i = 0; i < clases.length;i++){clases[i].style.display = "block";} // show boxes

		// and now need to set switches acordingly to vars that would be stored in local.storage
		var BeoutifyVar = await browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); //getting beautify var from storage of background script
		if (BeoutifyVar.BeoutifyVar){document.getElementById("Checkbox1").checked = true;} // setting the swithc of beautify acordingly to what giv us background script storage
		document.getElementById('Checkbox1').addEventListener('change', BeautifySwitchOnChangeFunction); // setting event on switch state change
		// switches are setted

		// and now i need to set buttons acordingly to vars that are stored in local.storage
		let likeButton = await browser.tabs.sendMessage(NiziTabId,{sender:"PopupPage",whatToDo:"GetVars", whatVars:["LikeWorking"]}) // sending message to init.js to get state of like script
		console.log(likeButton);
		if (!likeButton.LikeWorking){document.getElementById("Button1").removeAttribute('disabled');}
		//

	} else  {document.getElementById("Alert").style.display = "block";} //show alert
	
	async function BeautifySwitchOnChangeFunction()
	{
		
		if(document.getElementById('Checkbox1').checked) {
			browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"SetVars",whatVarsToChange:{"BeoutifyVar":1},ToWho:"StylingVars"});
			var vars = await browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"GetVars",whatVars:["HeaderVar","FooterVar","InformationVar","CampaignsVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign
			//var vars = await getOtherVars.then(handleResponse, handleError);
			if (vars.HeaderVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("game_header").style.display = "none";'});}
			if (vars.FooterVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("footer").style.display = "none";'});}
			if (vars.InformationVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "none";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "none";'});}
			if (vars.CampaignsVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "none";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "none";'});}		
		} else {	
			browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"SetVars",whatVarsToChange:{"BeoutifyVar":0},ToWho:"StylingVars"});
			var vars = await browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"GetVars",whatVars:["HeaderVar","FooterVar","InformationVar","CampaignsVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign
			if (vars.HeaderVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("game_header").style.display = "block";'});}
			if (vars.FooterVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("footer").style.display = "block";'});}
			if (vars.InformationVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "block";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "block";'});}
			if (vars.CampaignsVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "block";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "block";'});}		
		}
	}

	//async function 
}

