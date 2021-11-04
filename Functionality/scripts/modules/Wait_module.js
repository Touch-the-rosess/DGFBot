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