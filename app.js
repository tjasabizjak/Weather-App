// https://api.openweathermap.org/data/2.5/weather?q=germany&appid=a761fb112e668869bc3691069b6287f2&units=metric
const apiKey = "a761fb112e668869bc3691069b6287f2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("input");
const searchBtn = document.querySelector("button");

const weatherImg = document.querySelector(".weather");

async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    console.log(response);
    if (response.status === 404) {
      document.querySelector(".invalid").style.display = "block";
      document.querySelector(".weather-info").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humid").innerHTML = data.main.humidity + "%";
      document.querySelector(".windy").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main === "Clouds") {
        weatherImg.src = "images/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherImg.src = "images/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weatherImg.src = "images/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherImg.src = "images/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherImg.src = "images/mist.png";
      } else if (data.weather[0].main === "Snow") {
        weatherImg.src = "images/snow.png";
      }
      document.querySelector(".weather-info").style.display = "block";
      document.querySelector(".invalid").style.display = "none";
    }
  } catch (error) {
    console.error("SHIT, I FUCKED UP! " + error);
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
