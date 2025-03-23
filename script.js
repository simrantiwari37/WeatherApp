const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherBox=document.querySelector('.weather-box');
const weatherDetails=document.querySelector('.weather-details');
const error404=document.querySelector('.not-found');
const searchBox=document.querySelector('input');
const opened=false;

search.addEventListener("click",displayWeather);
searchBox.addEventListener("keydown",function(event){
	if(event.key=='Enter'){
		displayWeather();
	}
});

function displayWeather(){
	// weatherBox.classList.add('fadeOut');
	// weatherDetails.classList.add('fadeOut');
	// error404.classList.add('fadeOut');
	const APIKey='f423b32b8f661ff4ab5c1a89e063ee6d';
	const city=document.querySelector('.search-box input').value;  //gives value of the value attribute of a text field, default value or one typed by user

	if(city===''){
		return;
	}

	//make sure to use ` instead of '
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
	.then(response=>response.json())
	.then(json=>{
		console.log(json);

		
		
		
		if(json.cod=='404'){
			//error404.classList.remove('fadeOut');
			console.log("error");
			container.style.height='605px';
			weatherBox.style.display='none';
			weatherDetails.style.display='none';
			error404.style.display='block';
			error404.classList.add('fadeIn');
			
			return;
		}


		
		//needed to keep in else otherwise uncaught error came while accessing json.weather[0]
		else{
			//undo changes if any
			error404.style.display='none';
			error404.classList.remove('fadeIn');
				//select all required
			const image=document.querySelector('.weather-box img');
			const temperature=document.querySelector('.weather-box .temperature');
			const description=document.querySelector('.weather-box .description');
			const humidity=document.querySelector('.weather-details .humidity span');
			const wind=document.querySelector('.weather-details .wind span');


			

			//setting the image
			switch(json.weather[0].main){
				case 'Clear':
					image.src="./images/clear.png";
					break;

				case 'Haze':
					image.src="./images/haze.png";
					break;

				case 'Rain':
					image.src="./images/rain.png";
					break;

				case 'Snow':
					image.src="./images/snow.png";
					break;
				case 'Clouds':
					image.src="./images/cloud.png";
					break;


				default:
					image.src="";
			}

			//setting the data
			temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
			description.innerHTML=`${json.weather[0].description}`;
			humidity.innerHTML=`${json.main.humidity}%`;
			wind.innerHTML=`${parseInt(json.wind.speed)} km/h`;

			//formatting
			weatherBox.style.display='';
			weatherDetails.style.display='';
			container.style.height="605px";
			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("fadeIn");


		
		}

	

	
	});

}



