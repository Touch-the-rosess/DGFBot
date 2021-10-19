//this file would be just for storing some funtions, events with those funciton would be in the html files
/*
function LikeChatScript()
{
	browser.tabs.executeScript({file: "../../scripts/Init.js",allFrames: false});
	//browser.tabs.executeScript({file: "scripts/LikeChat.js",allFrames: false});
	setTimeout(() => { browser.tabs.executeScript({file: "../../scripts/LikeTalk.js",allFrames: false});window.close(); }, 1000);
	//setTimeout(function(){ browser.tabs.executeScript({file: "scripts/LikeChat.js"}); }, 500);
    //this is some kind of wait,
	//window.close();
}

document.getElementById('Checkbox1').addEventListener('change', BeautifyFunction);
document.getElementById('Button1').addEventListener('click', LikeChatScript)
*/
var NiziTabId = null;  // i need this var to be global cuz for further use, in future i'll need it to send "content script" to certain tab

Popup();
async function Popup()
{
	function handleResponse(message) {// i'll make handleResponse also to be global
		if(message.response == "CheckIfDGTabIsAvailable"){NiziTabId = message.niziTabId;console.log("Nizi site is on tab with id: " + message.niziTabId);return;}
		if(message.response == "GetBeoutifyCheckboxVar"){if (message.variable == 1){document.getElementById("Checkbox1").checked = true;}console.log("Popup var named beoutify had in it that data: " + message.variable);return;}// we don't need else (for if message.variable) cuz every time we reopen popup, we need to reinitialyze page
		if(message.response == "GetOthersCheckboxVar"){return JSON.parse(message.variables);}
	}

	function handleError(error) {console.log(`Error handler of popup catched an error:\n\t ${error}`);}


	var isTabAvailable =  browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"CheckIfDGTabIsAvailable"});// i would send this object to the background script 
	await isTabAvailable.then(handleResponse, handleError); // becouse "handleResponse" have return this await would make programm to runc line by line even if this is async
	
	if(NiziTabId != null)
	{
		var clases = document.getElementsByClassName("allBox");for(var i = 0; i < clases.length;i++){clases[i].style.display = "block";} // show boxes
		// and now need to set switches acordingly to vars that would be stored in local.storage
		var getStateOfVars = browser.runtime.sendMessage({sender:"PopupPage",whatToDo:"GetBeoutifyCheckboxVar"});
		await getStateOfVars.then(handleResponse, handleError);
		document.getElementById('Checkbox1').addEventListener('change', BeautifySwitchOnChangeFunction);
		
	} else  {document.getElementById("Alert").style.display = "block";} //show alert
	
	async function BeautifySwitchOnChangeFunction()
	{
		
		if(document.getElementById('Checkbox1').checked) {
			//browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";document.getElementById("footer").style.display = "none";browser.storage.local.set({["isBeautifySwitched"]:1})'});
			/*var setBeoutifyVar =  */browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"SetBeoutifyCheckboxVar",changeTo:1});
			var getOtherVars = browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"GetOthersCheckboxVar"}); // by others i mean Header, footer, information and campaign
			var vars = await getOtherVars.then(handleResponse, handleError);
			if (vars.HeaderVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("game_header").style.display = "none";'});}
			if (vars.FooterVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("footer").style.display = "none";'});}
			if (vars.InformationVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "none";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "none";'});}
			if (vars.CampaignsVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "none";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "none";'});}		
		} else {	
			//browser.tabs.executeScript({code: 'document.getElementById("game_header").style.display = "block";document.getElementById("footer").style.display = "block";browser.storage.local.set({["isBeautifySwitched"]:0})'});
			/*var setBeoutifyVar =  */browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"SetBeoutifyCheckboxVar",changeTo:0});
			var getOtherVars = browser.runtime.sendMessage({sender:"PopupPage", whatToDo:"GetOthersCheckboxVar"}); // by others i mean Header, footer, information and campaign
			var vars = await getOtherVars.then(handleResponse, handleError);
			if (vars.HeaderVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("game_header").style.display = "block";'});}
			if (vars.FooterVar){browser.tabs.executeScript(NiziTabId,{code:'document.getElementById("footer").style.display = "block";'});}
			if (vars.InformationVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "block";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "block";'});}
			if (vars.CampaignsVar){browser.tabs.executeScript(NiziTabId,{code:'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "block";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "block";'});}		
		}
	}
	
	
}

