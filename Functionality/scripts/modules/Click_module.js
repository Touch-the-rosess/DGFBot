function TryToClick(code)
{
	return new Promise((resolve,reject) =>
	{
		counter = 0
		checkExist = setInterval(() =>
		{
			try 
			{
				code.click();//trying to execute code, all times it'll be code for clicking. if the searching thing woould be undefined it'll throw a error 
				clearInterval(checkExist);
				resolve();
			}catch(e){counter++;if(counter==20){clearInterval(checkExist);reject(new Error("Smth went wrong, or the div doesnt exist, or it don't have click function."))}}
		},500)
	})
}

