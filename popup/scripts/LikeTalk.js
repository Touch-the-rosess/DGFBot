async function Init()
{
	document.getElementById("MyMessageDiv").childNodes[2].nodeValue = "Now is running Friend Like and Chat script."
	document.getElementById("AllertDiv").style.display = "block"
	document.getElementById("OverlapDiv").style.display = "block"
	document.getElementById("ButtonsDiv").style.display = "block"
	await sessionStorage.setItem("isScriptRunning","Run")
	return
}
function TryToClick(code)
{
	return new Promise((resolve,reject) =>
	{
		search = code.indexOf("document") //if the word document starts from index 0 then it's kind of safe (actualy need to think about how to make it more safe)
		if (search == 0)
		{
			counter = 0
			checkExist = setInterval(() =>
			{
				try 
				{
					eval(code);//trying to execute code, all times it'll be code for clicking. if the searching thing woould be undefined it'll throw a error 
					clearInterval(checkExist);
					resolve();
				}catch(e){counter++;if(counter==20){clearInterval(checkExist);reject(new Error("Smth went wrong, i wasn't able to find the div (Try)"))}}
			},500)
		}
		else{reject(new Error("Or someone try to insert malicious code, or the dev make a mistake in pasting code"))}
	})
}

function WaitUntil(time) //this will receize the time in milis to wait
{return new Promise((resolve,reject) =>{wait = setTimeout(() =>{resolve();},time)})}

function WaitUntilUnpause()//Thsi WaitUntilUnpause would check the sessionStorage and would wait till resume or stoped, and would change isScriptResummed = true
{
	return new Promise((resolve,reject) => 
	{
		wait = setInterval(() =>
		{
			isScriptRunning = sessionStorage.getItem('isScriptRunning')
			if (isScriptRunning == "Stoped") {new Error("This is not an error, this is just quick stop of the programm, the dev was just lazy to make good exit of programm")}
			else if (isScriptRunning == "Run")
			{
				isScriptResummed = true
				resolve();
			}
		
		},time)
		//now is the time to make it to get you to desired place 
		
	})
}

async function CheckIfPaused() //CheckIfPaused would check if is run paused or stoped, based on those would run WaitUntilUnpause
{
	isScriptRunning = await sessionStorage.getItem('isScriptRunning')
	if (isScriptRunning == "Run")
	{}
	else 
	{
		if (isScriptRunning == "Stoped"){return new Error("This is not an error, this is just quick stop of the programm, the dev was just lazy to make good exit of programm")}
		else if (isScriptRunning == "Paused")
		{
			await WaitUntilUnpause()
		}
	}
}

function CheckIfElementExists(code)
{
	return new Promise((resolve,reject) =>
	{
		search = code.indexOf("document") //if the word document starts from index 0 then it's kind of safe (actualy need to think about how to make it more safe)
		if (search == 0)
		{
			counter = 0
			checkExist = setInterval(() =>
			{
				try 
				{
					test = eval(code);	// this eval is executing the code 
					if (test != null) // sometimes it can throw null
					{
						clearInterval(checkExist);
						resolve("defined"); // but we are just returning if is not null then return "defined" elese (better say, if we dont find it "catch") we return undefined, which means we didnt find it, and that means it does not exitsts
					}
					else //this counter need to be in both, else and catch, cuz sometimes it can throw error, sometimes it throw null, and if it were sitting just in catch then this interval (if eval throws null) would run endlessly just cuz catch didn't catch anything and he wasn't able to stop the interval
					{
						counter++;
						if(counter==3)
						{
							clearInterval(checkExist);
							resolve("undefined")
						}
					}
				}catch(e){counter++;if(counter==3){clearInterval(checkExist);resolve("undefined")}} // sometimes it can throw error
			},500)
		}
		else{reject(new Error("Or someone try to insert malicious code, or the dev make a mistake in pasting code (Check)"))}
	})
}

async function WhereAmI()
{
	//This function will check where u are 
	var here = null;
	centerContents = await document.getElementById("center").contentWindow.document.getElementById("contents");
	try {																	   						  if (centerContents.children[0].className == "friend_header"){here = "FriendList";					   }}catch(e) {}
	try {																	    	  if (centerContents.querySelector(".close_popup").className == "close_popup"){here = "Home";						   }}catch(e) {}
	try {				   	   if (centerContents.children.f_menu_window.children[1].children[0].children[2].children[4].children[0].innerHTML == "FriendRequest"){here = "OnSomeRandomPersonPage";		   }}catch(e) {}
	try {if (centerContents.children.f_menu_window.children[1].children[0].children[2].children[4].children[0].innerHTML == "This person is already your Friend."){here = "OnFriendHomePage";			   }}catch(e) {}
	try {																								  if (centerContents.children.button.children.length == 6){here = "OnRandomPersonShowOffPage";	   }}catch(e) {} 	
	try {																								  if (centerContents.children.button.children.length == 7){here = "OnFriendShowOffPage";		   }}catch(e) {}			
	try {																		if (centerContents.children[0].children[4].children[0].innerHTML == "Next Friend"){here = "OnFriendShowOffLikedPage";	   }}catch(e) {}		
	try {																	     if (centerContents.children[0].children[4].children[0].innerHTML == "To My Room"){here = "OnRandomPersonShowOffLikedPage";}}catch(e) {}
	return here
	// Home, FriendList, OnSomeRandomPersonPage, OnFriendHomePage, OnRandomPersonShowOffPage
	// OnFriendShowOffPage, OnFriendShowOffLikedPage, OnRandomPersonShowOffLikedPage
}

async function GoToPlace(place,whoSummoned)//this function is getting the place from where we need to go, and with what purpose  "DoFl"   "DoRandomLike"    "DoRandomTalk"
{
	//whosummoned says what func summoned this, like different functions have different purposes.
	if (whoSummoned == "DoFl") //when doeing Fl we need to get to show off page
	{
		if (place == "Home")
		{
			//those three lines brings you from home to you'r first friend show off page
			await TryToClick('document.getElementById("left").contentWindow.document.getElementById("contents").children[0].children[0].children[0].children[6].children[0].click() ')	  // clicking friends button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_paper_center").querySelector(".button").click()') // clicking visit her
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].click();')							  // clicking show off button
		}
		else if (place == "FriendList")
		{
			//those two lines btings you from Friend List to you'r first friend show off page
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_paper_center").querySelector(".button").click()') // clicking visit her
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].click();') 							  // clicking show off button
		}
		else if (place == "OnFriendHomePage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].click();') 							  // clicking show off button
		}
		else if (place == "OnFriendShowOffPage"){}
		else if (place == "OnFriendShowOffLikedPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".select_pink_long").click()')							  //clicking next friend
		}

		else 
		{
			//in else would be OnSomeRandomPersonPage, OnRandomPersonShowOffPage,OnRandomPersonShowOffLikedPage
			await TryToClick('document.getElementById("left").contentWindow.document.getElementById("contents").children[0].children[0].children[0].children[6].children[0].click() ')	  // clicking friends button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_paper_center").querySelector(".button").click()') // clicking visit her
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].click();')							  // clicking show off button
		}
		
	}
	else if (whoSummoned == "DoRandomLike") // when doeing random likes we also need to be on show off page, but show off page of a random person
	{
		if (place == "Home")
		{
			await TryToClick('document.getElementById("left").contentWindow.document.getElementById("contents").children[0].children[0].children[0].children[6].children[2].click()') // clicking random visit button button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".center").querySelector(".mb").children[0].click()') // clicking button "show off! girlfriends" button (from random "visit button" place)
		}
		else if (place == "OnRandomPersonShowOffPage"){}
		else if (place == "OnRandomPersonShowOffLikedPage" )
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".mt").children[1].click()') 						  // clicking next girlfriend
		}
		else if (place == "OnFriendHomePage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].click();')						  //clicking show off button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[4]') 								 	  //clicking next button
		}
		else if (place == "OnSomeRandomPersonPage")
		{
			checkExist = setInterval(function() {try{if ( document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].tagName != "A"){document.getElementById("center").contentWindow.document.getElementById("contents").children.next_rand_link.children[1].click()}else {document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.children[0].click();clearInterval(checkExist)}}catch(e){}		}, 1000);
			// check this set interval, and make it ideal
		}
		else if (place == "OnFriendShowOffPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[4]') 									 //clicking next button
		}
		else if (place == "OnFriendShowOffLikedPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".mt").children[1].click()') 						 // clicking next girlfriend
		}
		
		else 
		{
			await TryToClick('document.getElementById("left").contentWindow.document.getElementById("contents").children[0].children[0].children[0].children[6].children[2].click()') //clicking random visit button button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".center").querySelector(".mb").children[0].click()') //clicking button "show off! girlfriends"
		}
		// Home, FriendList, OnSomeRandomPersonPage, OnFriendHomePage, OnRandomPersonShowOffPage
		// OnFriendShowOffPage, OnFriendShowOffLikedPage, OnRandomPersonShowOffLikedPage
	}
	else if (whoSummoned == "DoRandomTalk") // when doeing random talks we need to be on talk page with a random person
	{
		if (place == "Home")
		{
			await TryToClick('document.getElementById("left").contentWindow.document.getElementById("contents").children[0].children[0].children[0].children[6].children[2].click()') // clicking random visit button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".center").children[0].children[0].click()') 		  // clicking random button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()') 		  // clicking talk button
		}
		else if (place == "OnSomeRandomPersonPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()') 		  // clicking talk button
		}
		else if (place == "OnFriendHomePage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.next_rand_link.children[1].click()') 					  // clicking next button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()') 		  // clicking talk button
		}
		else if (place == "OnRandomPersonShowOffPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[0].click()')								  // clicking visit her
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()')		  // clicking talk button
		}
		else if (place == "OnFriendShowOffPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[0].click()')								  // clicking visit her
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.next_rand_link.children[1].click()') 					  // clicking next button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()') 		  // clicking talk button
			
		}
		else if (place == "OnFriendShowOffLikedPage" || place == "OnRandomPersonShowOffLikedPage")
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".select_pink_middle").click()')					  // clicking next girlfriend
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[0].click()')								  // clicking visit her
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()') 		  // clicking talk button
		}
		else
		{
			//else would be Friend list, 
			await TryToClick('document.getElementById("left").contentWindow.document.getElementById("contents").children[0].children[0].children[0].children[6].children[2].click()') // clicking random visit button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".center").children[0].children[0].click()') 		  // clicking random button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk").click()') 		  // clicking talk button
		}
		
	}
}

async function PrepareAll()
{
	//Into prepare i need to bring the user to the certain place and then to let another function to do it work
	// At first we need to check if we need to do the FL, if not then check if we need to do the Random Like, if not then check if we need to do the talk
	imHere = await WhereAmI()																																							 							 // Checking where we are
	await GoToPlace(imHere,"DoFl")  																																					 							 //  then we go to try to do fl
	//debugger
	isLikeGray = await CheckIfElementExists('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.querySelector(".select_gray")') 							 		 //  checking if like is gray
	if (isLikeGray == "defined") 																																						 							 //  if the like button is gray then
	{
		//debugger;
		await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[6].click()')										 							 //  we click next friend
		await WaitUntil(500); 																																													  	 //	 waiting 500 milis to page to load
		if (document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.children.length == 3)  												 							 //  The popup when is showing it have 3 nodes, if is not showing then it  have 0 nodes
		{
			isFlFinished = true 																																						 							 //  and if it is showing we just make isFlFinished true
																																																					 //  this means we can try to check if the random like is finished
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.querySelector(".select_blue").click()') 			 							 //  then closing the popup 
			//debugger; // idk what but this programm is broking on the next line CHECK WHY!
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[4].click()') 								 							 //  and clicking next button
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children.good_button.children[0].click()') 			 							 //  and clicking like button
			reachedMaxCap = await CheckIfElementExists('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_cloth_center").querySelector(".txt_12")') 		 //  checking if the message of "max like cap reached" is showed
			if(reachedMaxCap == "defined")  																																										 //  if the message about max like cap is showed then
			{
				isRandomLikeFinished = true 																																										 //  we make isRandomLikeFinished to be true 
																																																					 //  then we go to visit her and try to talk, to see if the talk is finished
				await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".select_blue_middle").click()')												 //  clicking visit her
				await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".icon_talk").click()') 													 	 //  clicking talk button
				isMaxCapChatReached = await CheckIfElementExists('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_cloth_center").children[1].children[1]') //  checking if the page loaded
				if (isMaxCapChatReached == "defined")
				{
					if (document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_cloth_center").children[1].children[1].localName == "div") 						 //  and if loaded then we check if the masage (hided in div) is showed, if is showed then we make isChatFinished = true
					{
						isChatFinished = true;return
					}
				}
			}
		}
	}
}

async function CheckIfIsLikeGray()
{
	isLikeGray = await CheckIfElementExists('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.querySelector(".select_gray")') 							 		 //  checking if like is gray
		if (isLikeGray == "defined") 																																						 							 //  if the like button is gray then
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[6].click()')	//  we click next friend
			await WaitUntil(500); //	 waiting 500 milis to page to load
			if (document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.children.length != 0)  	//  The popup when is showing it have 3 nodes, if is not showing then it  have 0 nodes
			{
				isFlFinished = true 
				await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.querySelector(".button").click()')  //  and closing the popup
				return "continue"
			}
			return 'continue'
		}
	return 'else' // making it to return smth for if (for if to have with what to compare), better would say isLikeGray == undefined
}

async function DoFl()
{
	//visit, talk, visit, showoff, like, next friend(check if the popup is showing)
	while (!isFlFinished)
	{
		await CheckIfPaused(); if(isScriptResummed == true){iAmHere = await WhereAmI();await GoToPlace(iAmHere,"DoFl");isScriptResummed = false} 		//  chicking if paused, if really was paused we need to bring bot to "show off page", cuz we need to click visit her
		isLike = await CheckIfIsLikeGray(); if (isLike == "continue") {continue;}// if this if gets continue then it means that it posibly can be taht Fl is finished, else just continue
		await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[0].click()')     // 	clicking "visit her"

		await CheckIfPaused(); if(isScriptResummed == true)
		{
			iAmHere = await WhereAmI() //  if the script was paused and after restarted, then we try to guess where we are 
			await GoToPlace(iAmHere,"DoFl")  //  and returne with help with goto, (but it'll bring us to "show off plage")
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children[0].click()')     // 	that's why we are clicking "visit her" after goto
			isScriptResummed = false
		}
		isTalkGray = await CheckIfElementExists('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".icon_talk_none")')  //checking if talk is gray
		if(isTalkGray == "defined") //  becouse of [maybe user already talked with this girlfriend]
		{// we go to like her and jump to next person
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".select_pink_middle").click()')  //  clicking ""show off button"
			isLike = await CheckIfIsLikeGray(); if (isLike == "continue") {continue;}// if this if gets continue then it means that it posibly can be taht Fl is finished, else just continue
			else //  if isLikeGray  == "undefined", then it means that we can click like button
			{
				await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children.good_button.children[0].click()')//  clicking like button 
				await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".select_pink_long").click()')//  and clicking next friend button
				//  and checking if the popup showed 
				if (document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.children.length != 0) //  if popup showed then 
				{
					isFlFinished = true //  we are making isFlFinished true to stop the while
					await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.querySelector(".button").click()')  //  and closing the popup
					continue;
				}
				else
				{// and if the popup didnt showed then we  are just skiping this iteration 
					continue;
				}
			}
		}
		else if (isTalkGray == "undefined") // and if the talk button is not gray then we continue the script
		{
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".icon_talk").click()')//clicking talk button
			await CheckIfPaused(); if(isScriptResummed == true)// checking if user paused and resummed
			{// if it really paused and then resummed then we just go to next person show off page
				iAmHere = await WhereAmI();
				await GoToPlace(iAmHere,"DoFl"); // by using whereami and gotoplace
				isScriptResummed = false;
				continue;
			} 
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".frame_cloth_center").querySelector(".select_blue_middle").click()') //  clicking visit her 
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.side_button.querySelector(".select_pink_middle").click()') //  clicking show off
			//checking if like is gray
			
			isLike = await CheckIfIsLikeGray(); if (isLike == "continue") {continue;}// if this if gets continue then it means that it posibly can be taht Fl is finished, else just continue to execute lines below
			//  if the like is not gray then we jsut continue to execute next lines,
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.button.children.good_button.children[0].click()')	//  clicking like    AHTUNG!!!! THIS IS CAUSING SOME TROBLE, I THINK THAT I DONT NEED TO CLICK THE DIV, BUT THE A TAG THAT IS HOLDING THIS DIV
			await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").querySelector(".select_pink_long").click()')							//  clicking next friend,
				//  and checking if is finished FL
			await WaitUntil(200)
			isPopupShowing = document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.children.length
			if (isPopupShowing != 0) //  if popup showed then 
			{
				isFlFinished = true //  we are making isFlFinished true to stop the while
				await TryToClick('document.getElementById("center").contentWindow.document.getElementById("contents").children.popWindow.querySelector(".button").click()')  //  and closing the popup
				continue;
					
			}
			else  //  if the popup isn't showed then it means that the Fl is not finished and  
			{
				continue;//  we just jump all code below till next iteration  and we on show off page of next friend
			}
			continue; //  and skip this iteration
		}
		// clicking talk button
	}
}

async function Bot()
{
	await Init()
	await PrepareAll() //On the preparation you wouldnt be able to pause 
	if (!isFlFinished)		  {await DoFl()}
	debugger
	if (!isRandomLikeFinished){}
	if (!isChatFinished)	  {}
	//after all done hide the divs and show a message that alles done
}

//debugger
isScriptResummed = false
isFlFinished = false
isRandomLikeFinished = false
isChatFinished = false
Bot()