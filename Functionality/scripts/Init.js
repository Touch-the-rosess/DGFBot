//Those three from below is some init lines, it'll need to be and in other bot like scripts
//Be carefull when creating the content scripts, cuz when u make a mistake the console wouldn't show it to u and that is creating some trouble
//console.log("Now is running the content scrpt init.js");
/*
var t0 = performance.now()
if(sessionStorage.getItem("isScriptRunning")){console.log("isScriptRunning are already created")}
else {sessionStorage.setItem("isScriptRunning","Run");}
if (document.getElementById("OverlapDiv") == null) 
{
	//console.log("The div does not exists then i'm creating it.");
	let DontTowch = document.createElement('div');
	DontTowch.style.setProperty('position','fixed','');
	DontTowch.style.setProperty('top','0','');
	DontTowch.style.setProperty('left','0','');
	DontTowch.style.setProperty('width','100%','');
	DontTowch.style.setProperty('height','100%','');
	DontTowch.style.setProperty('z-index','1000','');
	DontTowch.style.setProperty('border','1px solid #ff8f00',''); //And if i wanna to click just aply display:none to this div ()
	DontTowch.style.setProperty('display','none','')
	//DontTowch.setAttribute('tabindex','0') //This is for the div do be able to get onkeypress event
	DontTowch.id = 'OverlapDiv';
	
	document.body.insertBefore(DontTowch,document.body.firstChild)
	//function EscPause(e) {console.log(e.which)}
	//document.getElementById("OverlapDiv").addEventListener('keypress',EscPause)
	
}
//else{console.log("The OverlapDiv exists")}

if (document.getElementById("AllertDiv") == null)
{
	let AllertDiv = document.createElement("div");
	AllertDiv.id = 'AllertDiv';
	AllertDiv.setAttribute("class","menu comment_icon")
	AllertDiv.style.setProperty("background-image","url('https://us-nizi2d-r53.amz-aws.jp/img/comment/window.png?1025')","");
	AllertDiv.style.setProperty("background-size","100% 100%","");
	AllertDiv.style.setProperty("width","250px","");
	AllertDiv.style.setProperty("height","150px","");
	AllertDiv.style.setProperty("position","absolute","");
	AllertDiv.style.setProperty("left","20px","");
	AllertDiv.style.setProperty("z-index","1002","");
	AllertDiv.style.setProperty("margin-left","454px","");
	AllertDiv.style.setProperty("margin-top","178px","");
	AllertDiv.style.setProperty("display","none","");
	
	let MyMessageDiv = document.createElement("div");
	MyMessageDiv.id = 'MyMessageDiv';
	MyMessageDiv.setAttribute("class","menu comment_icon")
	MyMessageDiv.style.setProperty("font-size","1.4em","");
	MyMessageDiv.style.setProperty("font-weight","bold","");
	MyMessageDiv.style.setProperty("line-height","1em","");
	MyMessageDiv.style.setProperty("padding","17px 6px 0px 12px","");
	MyMessageDiv.style.setProperty("overflow-y","hidden","");
	MyMessageDiv.innerHTML = "•Alert •<br>There would be the message of the allert text. I hope that there wouldn't be too much text cuz it isn't resizeable"
	
	let BackButton = document.createElement("button");
	BackButton.id = 'MyAllertBackButton';
	BackButton.setAttribute("class","button select_blue")
	BackButton.setAttribute("type","button")
	BackButton.style.setProperty("margin","17px 6px 0px 76px","")
	BackButton.style.setProperty("bottom","11px","")
	BackButton.style.setProperty("position","absolute","");
	BackButton.innerHTML = "Back"
	
	AllertDiv.appendChild(MyMessageDiv);AllertDiv.appendChild(BackButton)
	document.body.insertBefore(AllertDiv,document.body.firstChild)
	function hideTheAllertDiv() {document.getElementById('AllertDiv').style.display = 'none'}
	document.getElementById("MyAllertBackButton").addEventListener('click', hideTheAllertDiv)
}

if (document.getElementById("ButtonsDiv") == null)
{
	let ButtonsDiv = document.createElement("div");
	ButtonsDiv.id = 'ButtonsDiv';
	ButtonsDiv.setAttribute("class","button select_blue")
	ButtonsDiv.style.setProperty("z-index","1001","");
	ButtonsDiv.style.setProperty('position','fixed','');
	ButtonsDiv.style.setProperty("display","none","");
	ButtonsDiv.style.setProperty("margin-left","869px","")
	ButtonsDiv.style.setProperty("margin-top","518px","")
	
	let PauseDiv = document.createElement('div');
	PauseDiv.id = "MyPauseButton"
	PauseDiv.setAttribute('class','button select_pink_middle');
	PauseDiv.innerHTML = "Pause";
	let StopDiv = document.createElement('div');
	StopDiv.id = "MyStopButton"
	StopDiv.setAttribute('class','button select_blue_middle')
	StopDiv.innerHTML = "Stop";
	
	ButtonsDiv.appendChild(PauseDiv);ButtonsDiv.appendChild(StopDiv)
	document.body.insertBefore(ButtonsDiv,document.body.firstChild)
	
	function StopBot() {document.getElementById('OverlapDiv').style.display = 'none';document.getElementById("ButtonsDiv").style.display = "none";sessionStorage.setItem("isScriptRunning", "Stoped")}
	document.getElementById("MyStopButton").addEventListener('click', StopBot)

	function PauseBot() 
	{
		if (sessionStorage.getItem("isScriptRunning") == "Paused") 
		{
			sessionStorage.setItem("isScriptRunning", "Run");
			document.getElementById("MyPauseButton").childNodes[0].nodeValue = "Pause";
			document.getElementById("OverlapDiv").style.display = "block";
		} 
		else if (sessionStorage.getItem("isScriptRunning") == "Run") 
		{
			sessionStorage.setItem("isScriptRunning", "Paused");
			document.getElementById("MyPauseButton").childNodes[0].nodeValue = "Start";
			document.getElementById("OverlapDiv").style.display = "none";
			document.getElementById("MyMessageDiv").childNodes[2].nodeValue = "You paused the script, you can do what u wanna and then restart it by pressing start.";document.getElementById("AllertDiv").style.display = "block"
		}
	}
	document.getElementById("MyPauseButton").addEventListener('click', PauseBot)
}
//else(console.log("The AllertDiv exists"))
var t1 = performance.now()
console.log("Call to Init.js took " + (t1 - t0) + " milliseconds.")

*/


console.log("Init injected");
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
	var WhoSummoned = request.sender;
	console.log("Message from \"" + WhoSummoned + "\".\nWith whatToDo = " + request.whatToDo);
	var m = sendResponse; // reasigning function (without it calling) for further use
	switch(request.whatToDo)
	{
		case "GetVars"://this is sending sendMessage
			{
				//WorkingVars: {LikeWorking:0,ChatWorking:0} // it would be stored in session storage
				var whatVars = request.whatVars;
				var vars;
				try
				{	
					vars = JSON.parse(sessionStorage.getItem("WorkingVars"));
					vars.LikeWorking;
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
					console.log(filteredVars);
					m({response: request.whatToDo,variables: filteredVars});
				}
				catch (error)
				{
					vars = {LikeWorking:0,ChatWorking:0};
					sessionStorage.setItem("WorkingVars", JSON.stringify(vars));
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
					console.log(filteredVars);
					m({response: request.whatToDo,variables: filteredVars});
				}
				return true; // keep the messaging channel open for sendResponse
				break;
			}
	}
}