//this is my API key from NMA website
const apikey = "dUE8AYylCvyTMEdOCrKBMJd4SBb55hce";
const nmaURL = "https://data.nma.gov.au/object?apikey" + apikey;

//query the NMA API
const nmaAPI ="https://data.nma.gov.au/object?title=*";

const nmaImg = "https://data.nma.gov.au/object?limit=20&media=*&medium=wood"


// function that will load exhibitions
async function getExhibitions() {
	const objectsContainer = document.getElementById('objectsContainer');

	try {
		//go get the data from NMA
		const response = await fetch(nmaImg);
		//return it in JSON
		const data = await response.json();

		//log the data to the browser
		console.log(data);

		data.data.forEach(item => {
			// console.log(item);

			//dig down till we find the image
			const image = item.hasVersion[0].hasVersion[1].identifier;

			//image array
			const img2 = item.hasVersion[0].hasVersion;

			//define empty img url for html tag
			let imgurl;

			// for loop so we can get the index
			for (i=0; i < img2.length; i++) {
				// match on large image
				if (img2[i].version === 'large image') {
					console.log(img2[i].identifier);

					imgurl = img2[i].identifier;
				}
			}


			// console.log(image);

			//create a container
			const itemContainer = document.createElement('div');

			//create our html tags
			const title = '<h2>'+ item.title + '</h2>';
			const imageTag = '<div class="imgContainer"><img src="' + imgurl +'" alt="image"></div>';

			//add all the html tags to the listItem
			itemContainer.innerHTML = title + imageTag;

			//append the children to the parent ul
			objectsContainer.appendChild(itemContainer);

		});


	} catch (error) {
		console.log('error: ', error);
	}

}

// call the function so it executes
getExhibitions()