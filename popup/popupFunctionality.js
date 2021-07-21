//this file would be just for storing some funtions, events with those funciton would be in the html files

function BeautifyFunction()
{
	
	if(document.getElementById('Checkbox1').checked) {
		//browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";document.getElementById("footer").style.display = "none";browser.storage.local.set({["isBeautifySwitched"]:1})'});
		if (localStorage.getItem("Debug") == "True"){console.log("Now the beautify checkbox is checked")}
		localStorage.setItem("BeautifySwitch", "True");
		if (localStorage.getItem("HideHeaderBool") == "True"){browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "none";'});}
		if (localStorage.getItem("HideFooterBool") == "True"){browser.tabs.executeScript({code : 'document.getElementById("footer").style.display = "none";'});}
		if (localStorage.getItem("HideInformationBool") == "True"){browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "none";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "none";'});}
		if (localStorage.getItem("HideCampaignsBool") == "True"){browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "none";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "none";'});}
		
	} else {	
		//browser.tabs.executeScript({code: 'document.getElementById("game_header").style.display = "block";document.getElementById("footer").style.display = "block";browser.storage.local.set({["isBeautifySwitched"]:0})'});
		if (localStorage.getItem("Debug") == "True"){console.log("Now the beautify checkbox isn't checked")}
		localStorage.setItem("BeautifySwitch", "False");
		if (localStorage.getItem("HideHeaderBool") == "True"){browser.tabs.executeScript({code : 'document.getElementById("game_header").style.display = "block";'});}
		if (localStorage.getItem("HideFooterBool") == "True"){browser.tabs.executeScript({code : 'document.getElementById("footer").style.display = "block";'});}
		if (localStorage.getItem("HideInformationBool") == "True"){browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var info = contents.children[0].children[0].children[0].children[2].style.display = "block";var infobanner = contents.children[0].children[0].children[0].children[3].style.display = "block";'});}
		if (localStorage.getItem("HideCampaignsBool") == "True"){browser.tabs.executeScript({code : 'var contents = document.getElementById("right").contentWindow.document.getElementById("contents");var camp = contents.children[0].children[0].children[0].children[4].style.display = "block";var campbanner = contents.children[0].children[0].children[0].children[5].style.display = "block";'});}

	}
}

function LikeChatScript()
{
	browser.tabs.executeScript({file: "scripts/Init.js",allFrames: false});
	//browser.tabs.executeScript({file: "scripts/LikeChat.js",allFrames: false});
	setTimeout(() => { browser.tabs.executeScript({file: "scripts/LikeTalk.js",allFrames: false});window.close(); }, 1000);
	//setTimeout(function(){ browser.tabs.executeScript({file: "scripts/LikeChat.js"}); }, 500);
    //this is some kind of wait,
	//window.close();
}

document.getElementById('Checkbox1').addEventListener('change', BeautifyFunction);
document.getElementById('Button1').addEventListener('click', LikeChatScript)


