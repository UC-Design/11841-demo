//function to get location using geolocation API
function getLocation() {
	console.log('getting location');

	if(navigator.geolocation) {
		//get the location from browser and call getWeather
		navigator.geolocation.getCurrentPosition(getWeather);
	} else {
		// can't get location
		const weatherInfo = document.getElementById('weather-info');
		weatherInfo.innerHTML = '<p>Geolocation not supported.</p>';
	}
}

//our getweather function
async function getWeather(position) {
	console.log(position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	//new key from weatherapi.com
	// you should use your own key!
	const apiKey = '8c27e7fb4cb24063af105842230509';

	//create a variable for the lat + long to match API call requirements
	const locStr = latitude + ',' + longitude;

	//go get the data
	try {
		//api call includes our key + lat long
		const response = await fetch('http://api.weatherapi.com/v1/current.json?key='+apiKey+'&q='+locStr+'&aqi=no');
		const data = await response.json();
		//log the data returned
		console.log(data);

		//set the weathertype so we can use it to set class
		const weatherType = data.current.condition.code;

		//check what the current conditions are and update the body class
		//this is a very inefficient way to do this
		if (weatherType == 1000) {
			//it is sunny
			console.log('it is sunny');
			//set the body class to be sunny
			weatherClass = 'sunny';
		} else if (weatherType == 1003) {
			//do something else
			weatherClass = 'something';
		}

		//add the class to the body
		document.body.classList.add(weatherClass);

		// find the div in the HTML page with ID
		const weatherInfo = document.getElementById('weather-info');

		//create our HTML tags and set them as constants
		const currentLocation = "<h2>" + data.location.name + "</h2>";
		const currentTemp = "<p>" + data.current.temp_c + "&deg; C</p>";
		const weatherIcon = "<img src='http:" + data.current.condition.icon + "' />";

		//now add all that HTML into that div we found before
		weatherInfo.innerHTML = currentLocation + currentTemp + weatherIcon;

	} catch(error) {
		//show any errors in the console for googling
		console.log('Error: ', error);
	}

};

//call the function
getLocation();
