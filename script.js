let submit = document.querySelector("#submit");
let body = document.querySelector("body");
const result = document.createElement("div");
result.id = "result";
const apiKey = "a7367019d45d1b0b35248637168d0460";
const country = "IN";
const weather_icon = (value) => {
    if (value === "Clouds") {
        return `<img src="assets/clouds.svg" class="h-8 mt-4" alt="Clouds">`;
    } else if (value === "Rain") {
        return `<img src="assets/rain.svg" class="h-8 mt-4" alt="Rain">`;
    } else if (value === "Thunderstorm") {
        return `<img src="assets/thunder.svg" class="h-8 mt-4" alt="Thunderstorm">`;
    } else if (value === "Snow") {
        return `<img src="assets/snow.svg" class="h-8 mt-4" alt="Snow">`;
    } else {
        return ``;
    }
};

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const city = document.getElementById('input').value;
    if (city == "") {
        alert("Please Enter City");
    }
    else {
        console.log(`City entered: ${city}`);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const { main: { humidity, temp, pressure },name,weather } = response;
                const [{main}] = weather;
                const tempC = Math.round((temp - 273.15) * 100) / 100;
                body.appendChild(result);
                const weatherIconHtml = weather_icon(main);
                result.innerHTML = `
                <div class="flex items-center gap-4 m-4 self-start">
                <h1 class="text-4xl border-b-4 border-white pb-3">${name}</h1><img src="assets/temp.svg" class="h-10"></div>
                <p id="temp">Temperature: ${tempC}°C</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Humidity: ${humidity} %</p>
            <div class="flex items-center gap-4 mt-4">
            <p>Weather: ${main}</p>
            ${weatherIconHtml}</div>`

            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
            });
    }
})
