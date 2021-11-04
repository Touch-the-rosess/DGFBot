console.log("Background is running.")
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));

var initVar = {}; // it'll be "tab.id": "isInitInjectedOrNot"
//this listener would be global listener for mesaging betwen popup-background, content-background
function onError(error) {console.log(`Error handler of background catched an error:\n\t ${error}`);}

browser.runtime.onMessage.addListener(handleMessage);
browser.tabs.onRemoved.addListener(handleOnTabRemoved);
browser.tabs.onCreated.addListener(handleOnTabCreated);

function handleMessage(request, sender, sendResponse) {
	var WhoSummoned = request.sender;
	console.log("Message from \"" + WhoSummoned + "\".\nWith whatToDo = " + request.whatToDo);
	var m = sendResponse; // reasigning function (without it calling) for further use
	switch(request.whatToDo)
	{
		case "CheckIfDGTabIsAvailable":
			{
				browser.tabs.query({}).then((tabs) => {
					let filteredTabs = {};
					i = 1;
					for (let tab of tabs)
					{
						if (tab.url == "https://us-nizi2d-app.amz-aws.jp/pc_room/")
						{
							if (!(tab.id in initVar)) 
							{
								initVar[tab.id] = null;
							}
							filteredTabs[i] = tab.id;
							i++;
						}// at the moment when we find the id we just send response
					} 
					for (let tab of Object.keys(initVar))
					{
						if (initVar[tab] == null)
						{
							//insert "init.js"
							// and change state of initvar[tab]
							//debugger;
							initVar[tab] = 1;
							browser.tabs.executeScript(parseInt(tab),{file: "/Functionality/scripts/Init.js"});
						}
					}

					browser.tabs.query({active: true}).then((curenttab) => {
						
						//console.log(filteredTabs);
		
						if (curenttab[0].url == "https://us-nizi2d-app.amz-aws.jp/pc_room/"){console.log(curenttab[0].url);m({response: request.whatToDo,niziTabId: curenttab[0].id});}
						else if (JSON.stringify(filteredTabs) != "{}") {console.log(filteredTabs[1]);m({response: request.whatToDo,niziTabId: filteredTabs[1]});}
						else {m({response: request.whatToDo,niziTabId: null});} // if the url wasnt find then we just sent "niziTabId" as null
						/*return true; // keep the messaging channel open for sendResponse*/

					});

				}); // get all tabs from curent window
				//console.log(alltabs);
				return true;
			break;
			}
		case "GetVars"://this is sending sendMessage
			{
				//StylingVars: {BeoutifyVar:0,HeaderVar:0,FooterVar:0,InformationVar:0,CampaignsVar:0}
				//InjectedVars: {LikeVar:0,ChatVar:0,clickVar:0,waitVar:0}  from left side would be content scripts, from right modules
				var whatVars = request.whatVars;
				var vars;
				try
				{	
					if (request.FromWho == "StylingVars"){vars = JSON.parse(localStorage.getItem("StylingVars"));vars.BeoutifyVar;}
					if  (request.FromWho == "InjectedVars"){vars = JSON.parse(localStorage.getItem("InjectedVars"));vars.LikeVar;}
					//console.log(vars);
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
					if (request.FromWho == "StylingVars"){vars = {BeoutifyVar:0,HeaderVar:1,FooterVar:1,InformationVar:1,CampaignsVar:1};localStorage.setItem("StylingVars", JSON.stringify(vars)); }
					if (request.FromWho == "InjectedVars"){vars = {LikeVar:0,ChatVar:0,clickVar:0,waitVar:0};localStorage.setItem("InjectedVars", JSON.stringify(vars)); }
					
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
				return true; // keep the messaging channel open for sendResponse
				break;
			}
		case "SetVars":
			{
				//{BeoutifyVar:0,HeaderVar:0,FooterVar:0,InformationVar:0,CampaignsVar:0}
				var whatVars = request.whatVarsToChange;
				if (request.ToWho == "StylingVars")  {vars = JSON.parse(localStorage.getItem("StylingVars"));}
				if (request.ToWho == "InjectedVars") {vars = JSON.parse(localStorage.getItem("InjectedVars"));}
				//console.log(vars);
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
				if (request.ToWho == "StylingVars") {localStorage.setItem("StylingVars",JSON.stringify(vars));}
				if (request.ToWho == "InjectedVars"){localStorage.setItem("InjectedVars",JSON.stringify(vars));}
				m({response: 0}); // just response nothing
				return true; // keep the messaging channel open for sendResponse
				break;
			}
		default:
			{
				console.log("There is no such an action, showing the request: ",request)
				return false;
				break;
			}
	}
	
}

async function handleOnTabRemoved(tabId, removeInfo){
	if (JSON.stringify(initVar) != "{}")
	{
		for (let tab in initVar)
		{
			//console.log(tab + " " + tabId);
			if(tab == JSON.stringify(tabId))// tab is key with name as id geted from initVar, but tabId is parameter parsed to "onTabRemoved"
			{
				console.log(initVar);
				delete initVar[tab];
				console.log(initVar);
			}
		}
	}else{console.log("initVar is empty");console.log(initVar);}
}

async function handleOnTabCreated(createdTab) // updating the initVar state
{
	let alltabs = await browser.tabs.query({}).then((tabs) => {return tabs;}); 
	for (let tab of alltabs)
	{
		if (tab.url == "https://us-nizi2d-app.amz-aws.jp/pc_room/")
		{
			if (!(tab.id in initVar)) 
			{
				initVar[tab.id] = null;
			}
		}
	} // we get all windows, and if there is some nizi tabs that isn't registered in initVar we get em and add em in initVar, ugh and the last opened tab allways would be at start "about:blank" what would prevent me from proper checking. But the checking would be performed one more time by the "CheckIfDGTabIsAvailable"
	
}