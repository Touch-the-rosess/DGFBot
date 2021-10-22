console.log("Background is running.")

//this listener would be global listener for mesaging betwen popup-background, content-background
function onError(error) {console.log(`Error handler of background catched an error:\n\t ${error}`);}

browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
	var WhoSummoned = request.sender;
	console.log("Message from \" " + WhoSummoned + "\".\nWith whatToDo = " + request.whatToDo);
	
	console.log(WhoSummoned + " sended a message");
	var m = sendResponse; // reasigning function (without it calling) for further use
	if (request.whatToDo == "CheckIfDGTabIsAvailable")
		{
			let tabs = browser.tabs.query({currentWindow: true}); // get all tabs from curent window
			tabs.then(TabsParsing, onError);
			function TabsParsing(tabs) { 
				for (let tab of tabs) //parse them
				{ //and when we find the needed url we sendResponse
					if (tab.url == "https://us-nizi2d-app.amz-aws.jp/pc_room/"){m({response: request.whatToDo,niziTabId: tab.id});}// at the moment when we find the id we just send response
				}  
				m({response: request.whatToDo,niziTabId: null}); // if the url wasnt find then we just sent "niziTabId" as null
			}
	}
	if (request.whatToDo == "GetVars")//this is sending sendMessage
	{
		//{BeoutifyVar:0,HeaderVar:0,FooterVar:0,InformationVar:0,CampaignsVar:0}
		var whatVars = request.whatVars;
		try
		{
			var vars = JSON.parse(localStorage.getItem("PopupVars"));
			vars.BeoutifyVar;
			var filteredVars = {};
			for (var key in vars)
			{
				for (var el in whatVars) 
				{
					if (whatVars[el] == key)
					{
						filteredVars[key] = vars[key];break;
					}
				}
			} //now filtering the output
			//console.log(filteredVars);
			m({response: request.whatToDo,variables: filteredVars});
		}
		catch (error)
		{
			var vars = {BeoutifyVar:1,HeaderVar:1,FooterVar:1,InformationVar:1,CampaignsVar:1}
			localStorage.setItem("PopupVars", JSON.stringify(vars)); 
			var filteredVars = {};
			for (var key in vars)
			{
				for (var el in whatVars) 
				{
					if (whatVars[el] == key)
					{
						filteredVars[key] = vars[key];break;
					}
				}
			}
			m({response: request.whatToDo,variables: filteredVars});
		}
	}
	if (request.whatToDo == "SetVars")
	{
		//{BeoutifyVar:0,HeaderVar:0,FooterVar:0,InformationVar:0,CampaignsVar:0}
		var whatVars = request.whatVarsToChange;
		var vars = JSON.parse(localStorage.getItem("PopupVars"));
		for (var key in vars)
		{
			for (var el in whatVars) 
			{
				if (el == key)
				{
					vars[key] = whatVars[el];break;
				}
			}
		}
		localStorage.setItem("PopupVars",JSON.stringify(vars));
	}
	return true; // keep the messaging channel open for sendResponse
	// i need this return to recreate it as an "return promis" and after this i need to paste all my code above ( the code from "checkifavailable")		
	
}