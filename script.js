
const APIKEY = "50ff98da7e71d028fcff37be1a04c94b";

const BASE_URL =
    "https://api.openweathermap.org/data/2.5/weather";

const searchbox = document.getElementById("city");
const searchbtn = document.getElementById("btn");

async function checkWeather(city = "Bhubaneswar") {

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const URL =
        `${BASE_URL}?units=metric&q=${encodeURIComponent(city)}&appid=${APIKEY}`;

    console.log("Request URL:", URL);

    try {

        const response = await fetch(URL);

        console.log("Response status:", response.status);
        const data = await response.json();

        console.log("API response:", data);

        if (!response.ok) {
            alert(`Error: ${data.message}`);
            return;
        }

        document.querySelector(".city").textContent = data.name;

        document.querySelector(".temp").textContent =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").textContent =
            data.main.humidity + "%";

        document.querySelector(".wind").textContent =
            data.wind.speed + " km/h";

    } catch (error) {

        console.error("FETCH ERROR:", error);

        alert("Unable to connect to the weather API. Check the browser console.");

    }
}



searchbtn.addEventListener("click", function () {

    const city = searchbox.value.trim();

    checkWeather(city);

});


searchbox.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const city = searchbox.value.trim();

        checkWeather(city);

    }

});


// Load default weather
checkWeather("Bhubaneswar");

