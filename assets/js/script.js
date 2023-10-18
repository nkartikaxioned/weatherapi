
const search = document.querySelector('.input-text'),
  submitButton = document.querySelector('.submit'),
  day = document.querySelector('.day'),
  date = document.querySelector('.date'),
  cityy = document.querySelector('.city'),
  temprature = document.querySelector('.temprature'),
  figure=document.querySelector('figure'),
  rainProbability = document.querySelector('.rain-probability'),
  windSpeed = document.querySelector('.wind-speed'),
  windDirection = document.querySelector('.wind-direction'),
  dataContainer = document.querySelector('.data-container');
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const now = new Date();

async function getWeather(city = 'mumbai') {
  try {
    var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c33ecddffd96e7dc6aa94c5e89e44aa1&units=metric`);
    console.log(res)
    if (!res) {
      throw new Error('Failed to fetch weather data')
    } else {
      var data = await res.json();
      console.log(data)
      cityy.innerText = data.name;
      temprature.innerText = Math.round(data.main.temp) + ' °C';
      windSpeed.innerText = data.wind.speed + ' Km/hr';
      figure.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Symbol"></img>`;
      windDirection.innerText = degreesToDirection(data.wind.deg);
      day.innerText = days[now.getDay()];
      date.innerText = now.getDate() + " " + monthNames[now.getMonth()];
    }

  } catch (error) {
    alert("enter valid city name")
  }

}

function degreesToDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  // Calculate the index of the direction based on degrees
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (search.value === '' || search.value === null) {
    alert('City Name Cannot Be Empty.');
  } else {
    getWeather(search.value);
  }
})

window.addEventListener("load", () => {
  const defaultCity = 'mumbai';
  getWeather(defaultCity);
});








