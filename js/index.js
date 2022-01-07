let weather = {
  apiKey: "API goes here",
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert('Error! No weather Found');
          throw new Error('Error! No weather Found');
        }
        return response.json();
      })
      .then((data) => this.displayWeatherInfo(data));
  },
  displayWeatherInfo: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const fer = (temp * 9) / 5 + 32;
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.temperature').innerText =
      temp + ' °C / ' + fer + ' °F';
    document.querySelector('.description').innerText = description;
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.windspeed').innerText =
      'Wind speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('result');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search_bar').value);
  }
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});
document.querySelector('.search_bar').addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    weather.search();
  }
});

weather.fetchWeather('Windsor');
