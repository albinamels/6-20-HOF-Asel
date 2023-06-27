const locationName = document.querySelector('.location');
const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels .bold');
const humidity = document.querySelector('.humidity .bold');
const wind = document.querySelector('.wind .bold');
const cityInput = document.querySelector('#city-input');
const searchForm = document.querySelector('#search-form');
const celciusBtn = document.querySelector('.celcius')
const fahrenheitBtn = document.querySelector('.fahrenheit');
const body = document.querySelector('body');
const saveLocBtn = document.querySelector('.save-location')
const modeBtn = document.querySelector('.mode')


// 4 step
let unit = 'imperial'; // Fahrenheit

celciusBtn.addEventListener('click', () => {
  unit = 'metric';
  celciusBtn.classList.add('active');
  fahrenheitBtn.classList.remove('active');
})

fahrenheitBtn.addEventListener('click', () => {
  unit = 'imperial';
  fahrenheitBtn.classList.add('active');
  celciusBtn.classList.remove('active');
})

// 8 step - setItem('', )
saveLocBtn.addEventListener('click', () => {
  const city = cityInput.value;
  localStorage.setItem('cityName', city);
  alert('Your city is successfully saved')
})

// 9 step - getItem()
document.addEventListener('DOMContentLoaded', () => {
  const storedCity = localStorage.getItem('cityName');
  fetchWeatherData(storedCity);
  fetchPhotos(storedCity);
})

// 1, 9 step
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default behavior of form
  fetchWeatherData(cityInput.value);
  fetchPhotos(cityInput.value);
});

// 2, 9 step
const fetchWeatherData = async(city) => {
  //const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=warsaw&appid=d030ac84773f6c1da5dcb6a7fe964373`);
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=d030ac84773f6c1da5dcb6a7fe964373`);
  const data = await res.json();
  displayData(data);  
};

// 6, 9 step
const fetchPhotos = async(city) => {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=K1z7daCOfTevvq6JyTpQCEB3wXsdfC4N1d4H4WPWtxM`);
  const data = await res.json();
  const imageUrl = data.results[3].urls.full;
  renderBackground(imageUrl);
}

// 7 step
 const renderBackground = (url) => {
  body.style.backgroundImage = `url(${url})`;
 }

// 3, 5 step
const displayData = (data) => {
  let tempVal = unit === 'imperial' ? 'F' : 'C';
  let windSpeed = unit === 'imperial' ? 'miles/hr' : 'km/hr';
  locationName.innerText = data.name;
  wind.innerText = `${data.wind.speed} ${windSpeed}`
  temp.innerText = `${Math.round(data.main.temp)}° ${tempVal}`;
  feels.innerText = `${data.main.feels_like.toFixed()}°`;
  humidity.innerText = `${data.main.humidity}%`;
  //unit = 'metric' ? wind.innerText = `${data.wind.speed} km/hr` : wind.innerText = `${data.wind.speed} miles/hr`;
  //unit = 'metric' ? temp.innerText = `${Math.round(data.main.temp)}° C` : temp.innerText = `${Math.round(data.main.temp)}° F`;  
}

modeBtn.addEventListener('click', () => {
  if(modeBtn.innerText === 'Dark Mode'){
    modeBtn.innerText = 'Light Mode'; 
    body.className = 'dark';
  } else {
    modeBtn.innerText = 'Dark Mode';  
    body.className = 'light'; 
  }
})

//task:
// 1. create a button called "Dark Mode"
// 2. as i click on the button, I want my screen to be dark (either totally black or darker shade of the background picture)
// 3. if i click on the button again, I want my screen to go back to normal light mode.
// extra: make button name dynamic, toggle its name between dark mode and light mode
// extra extra: save dark mode preferences in the local storage.