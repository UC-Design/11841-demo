//this is my API key from NMA website
const apikey = "dUE8AYylCvyTMEdOCrKBMJd4SBb55hce";
const nmaURL = "https://data.nma.gov.au/object?apikey" + apikey;

//query the NMA API
const nmaAPI ="https://data.nma.gov.au/object?title=*";

const mediumQuery = 'wood' ;
const searchUrl = 'https://data.nma.gov.au/object?limit=20&media=*&medium=' + mediumQuery;

// function that will load exhibitions
async function getExhibitions() {
	const objectsContainer = document.getElementById('objectsContainer');

	try {
		//go get the data from NMA
		const response = await fetch(searchUrl);
		//return it in JSON
		const apiData = await response.json();

		//log the data to the browser
		console.log(apiData);

		//loop through the data
		// remember, apiData is what we've called the data returned from the API
		// apiData.data is the actual data array returned by the API call
		apiData.data.forEach(item => {
			//log each item
			console.log(item);

			//the data is messy and we want to return an image so we need to find it
			// use the data object in the console to work out where it is

			// image array
			const imgArr = item.hasVersion[0].hasVersion;

			//define empty img url for html tag
			let imgurl;

			// we need to use a for loop now so we can get the 'i' - the index number
			for (i=0; i < imgArr.length; i++) {
				// match on large image
				if (imgArr[i].version === 'large image') {
					console.log(imgArr[i].identifier);
					imgurl = imgArr[i].identifier;
				}
			}

			//create a container
			const itemContainer = document.createElement('div');

			// option 1, make a const for each item
			// const title = '<h2>'+ item.title + '</h2>';
			// const imageTag = '<div class="imgContainer"><img src="' + imgurl +'" alt="image"></div>';

			// add all the html tags to the listItem
			// itemContainer.innerHTML = title + imageTag;

			// option 2, use template literals
			itemContainer.innerHTML = `
			<h2>${item.title}</h2>
			<div class="imgContainer"><img src="${imgurl}" alt="image"></div>
			`;

			//append the children to the parent ul
			objectsContainer.appendChild(itemContainer);

		});


	} catch (error) {
		console.log('error: ', error);
	}

}

// call the function so it executes
getExhibitions()