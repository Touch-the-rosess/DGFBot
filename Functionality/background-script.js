console.log("Background is running.")
currentTab = null;
browser.tabs.onActivated.addListener((event)=> currentTab = event.tabId);
setInterval(updateBroeseTime,1000)

//Var init, those vars is just for proper showing of the pages
//localStorage is saving things in string type, when getting var i need to convert it in Num type
if (localStorage.getItem("HideHeaderBool") != null)
{
	localStorage.clear(); //I clear the local storage at the start of the background cuz the localStorage isn't temporary it is persistent and for some of my vars i need em to be temporary
	console.log("Some of my hypothesys is true, but idk how to verify at the moment of creation, i need to prove it at the moment when it'll be compiled. The hiphothesys is that the local is persistent and i need to clear it everytime i start the backgroud script, cuz i need all my vars to be temp.")

}
localStorage.setItem("HideHeaderBool", "True");
localStorage.setItem("HideFooterBool", "True");
localStorage.setItem("HideInformationBool", "False");
localStorage.setItem("HideCampaignsBool", "False");
localStorage.setItem("BeautifySwitch", "False");
localStorage.setItem("Debug", "True");

//if (localStorage.getItem("Debug") == "True"){console.log()}
//if (localStorage.getItem("Debug") == "True"){

async function updateBroeseTime(){
	if(!currentTab){
		return;
	}
	let frames = null;
	try{
		frames = await browser.webNavigation.getAllFrames({"tabId": currentTab})
	} catch (error){
		if (localStorage.getItem("Debug") == "True"){console.log(error);}
	}
	
	let frame = frames.filter ((frame) => frame.parentFrameId == -1)[0];
	
	if (!frame.url.startsWith('http'))
		return;
	let hostname = new URL(frame.url).hostname;
	
	try{
		let IsNizi = await browser.storage.local.get({["isNizi"]:"0"});
		if (hostname.localeCompare("us-nizi2d-app.amz-aws.jp") === 0){
			localStorage.setItem('isNizi', 'True');//If isNizi = 1 then user is in site dream girlfriend
			return
		}else{
			localStorage.setItem('isNizi', 'False');//else isNizi = 0 then the user is not in site dream girlfriend (and we make a little log)
			if (localStorage.getItem("Debug") == "True"){console.log("You've switched to '" + hostname + "' site.")}
		}
	}catch (error){
		if (localStorage.getItem("Debug") == "True"){console.log(error)}
	}
}
//console.log("This is the fin of the background script, and is just running listener with some event.")