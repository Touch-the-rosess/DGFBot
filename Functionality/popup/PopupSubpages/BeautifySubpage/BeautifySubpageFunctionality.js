var NiziTabId = null;
BeautifySubpageFunctionality();
async function BeautifySubpageFunctionality()
{
	function handleResponse(message) {// i'll make handleResponse also to be global
		if(message.response == "CheckIfDGTabIsAvailable"){NiziTabId = message.niziTabId;console.log("Nizi site is on tab with id: " + message.niziTabId);return;}
		if(message.response == "GetVars"){return message.variables;}
	}

	function handleError(error) {console.log(`Error handler of popup catched an error:\n\t ${error}`);}

	var clases = document.getElementsByClassName("allBox");for(var i = 0; i < clases.length;i++){clases[i].style.display = "block";} // show boxes
	// and now need to set switches acordingly to vars that would be stored in local.storage
	await  browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"CheckIfDGTabIsAvailable"}).then(handleResponse, handleError);// i would send this object to the background script 
	var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["HeaderVar","FooterVar","InformationVar","CampaignsVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign

	if (vars.HeaderVar){document.getElementById("HeaderCheckbox").checked = true;} //setting the switches to it's positions
	if (vars.FooterVar){document.getElementById("FooterCheckbox").checked = true;}
	if (vars.InformationVar){document.getElementById("InformationCheckbox").checked = true;}
	if (vars.CampaignsVar){document.getElementById("CampaignsCheckbox").checked = true;}

	
	document.getElementById('HeaderCheckbox').addEventListener('change', HeaderCheckbox_OnChangeFunction);
	document.getElementById('FooterCheckbox').addEventListener('change', FooterCheckbox_OnChangeFunction);
	document.getElementById('InformationCheckbox').addEventListener('change', InformationCheckbox_OnChangeFunction);
	document.getElementById('CampaignsCheckbox').addEventListener('change', CampaignsCheckbox_OnChangeFunction);

	async function HeaderCheckbox_OnChangeFunction()
	{
		
		if(document.getElementById('HeaderCheckbox').checked) 
		{
			//browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";document.getElementById("footer").style.display = "none";browser.storage.local.set({["isBeautifySwitched"]:1})'});
			browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"HeaderVar":1},ToWho:"StylingVars"}); // setting var acordingly to it state
			var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // checking if beoutifycheckbox is checked
			if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("game_header").style.display = "none";'});}// if beoutifychecbox is checked then we modify the layout
		}
		else 
		{	
		//browser.tabs.executeScript({code: 'document.getElementById("game_header").style.display = "block";document.getElementById("footer").style.display = "block";browser.storage.local.set({["isBeautifySwitched"]:0})'});
		browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"HeaderVar":0},ToWho:"StylingVars"});
		var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign
		if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("game_header").style.display = "block";'});}// if beoutifychecbox is checked then we modify the layout
		}
	}
	
	async function FooterCheckbox_OnChangeFunction()
	{
		
		if(document.getElementById('FooterCheckbox').checked) 
		{
			//browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";document.getElementById("footer").style.display = "none";browser.storage.local.set({["isBeautifySwitched"]:1})'});
			browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"FooterVar":1},ToWho:"StylingVars"}); // setting var acordingly to it state
			var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // checking if beoutifycheckbox is checked
			if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("footer").style.display = "none";'});}// if beoutifychecbox is checked then we modify the layout
		}
		else 
		{	
		//browser.tabs.executeScript({code: 'document.getElementById("game_header").style.display = "block";document.getElementById("footer").style.display = "block";browser.storage.local.set({["isBeautifySwitched"]:0})'});
		browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"FooterVar":0},ToWho:"StylingVars"});
		var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign
		if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("footer").style.display = "block";'});}// if beoutifychecbox is checked then we modify the layout
		}
	}

	async function InformationCheckbox_OnChangeFunction()
	{
		
		if(document.getElementById('InformationCheckbox').checked) 
		{
			//browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";document.getElementById("footer").style.display = "none";browser.storage.local.set({["isBeautifySwitched"]:1})'});
			browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"InformationVar":1},ToWho:"StylingVars"}); // setting var acordingly to it state
			var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // checking if beoutifycheckbox is checked
			if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "none";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "none";'});}// if beoutifychecbox is checked then we modify the layout
		}
		else 
		{	
		//browser.tabs.executeScript({code: 'document.getElementById("game_header").style.display = "block";document.getElementById("footer").style.display = "block";browser.storage.local.set({["isBeautifySwitched"]:0})'});
		browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"InformationVar":0},ToWho:"StylingVars"});
		var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign
		if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "block";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "block";'});}// if beoutifychecbox is checked then we modify the layout
		}
	}

	async function CampaignsCheckbox_OnChangeFunction()
	{
		
		if(document.getElementById('CampaignsCheckbox').checked) 
		{
			//browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";document.getElementById("footer").style.display = "none";browser.storage.local.set({["isBeautifySwitched"]:1})'});
			browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"CampaignsVar":1},ToWho:"StylingVars"}); // setting var acordingly to it state
			var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // checking if beoutifycheckbox is checked
			if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "none";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "none";'});}// if beoutifychecbox is checked then we modify the layout
		}
		else 
		{	
		//browser.tabs.executeScript({code: 'document.getElementById("game_header").style.display = "block";document.getElementById("footer").style.display = "block";browser.storage.local.set({["isBeautifySwitched"]:0})'});
		browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"SetVars",whatVarsToChange:{"CampaignsVar":0},ToWho:"StylingVars"});
		var vars = await browser.runtime.sendMessage({sender:"Beautify_PopupSubpage", whatToDo:"GetVars",whatVars:["BeoutifyVar"],FromWho:"StylingVars"}).then(handleResponse, handleError); // by others i mean Header, footer, information and campaign
		if (vars.BeoutifyVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "block";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "block";'});}// if beoutifychecbox is checked then we modify the layout
		}
	}
}