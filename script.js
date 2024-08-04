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

submit.addEventListener("click", async (event) => {
    event.preventDefault();
    const city = document.getElementById('input').value;
    if (city === "") {
        alert("Please Enter City");
        return;
    }

    try {
        console.log(`City entered: ${city}`);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        console.log(data);

        const { main: { humidity, temp, pressure }, name, weather } = data;
        const [{ main }] = weather;
        const tempC = Math.round((temp - 273.15) * 100) / 100;

        body.appendChild(result);
        const weatherIconHtml = weather_icon(main);

        result.innerHTML = `
            <div class="flex items-center gap-4 m-4 self-start">
                <h1 class="text-4xl border-b-4 border-white pb-3">${name}</h1>
                <img src="assets/temp.svg" class="h-10">
            </div>
            <p id="temp">Temperature: ${tempC}°C</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Humidity: ${humidity} %</p>
            <div class="flex items-center gap-4 mt-4">
                <p>Weather: ${main}</p>
                ${weatherIconHtml}
            </div>
        `;
    } catch (error) {
        if (error.message === "city not found") {
            alert("City not found");
        } else {
            console.error('Error fetching the weather data:', error);
            alert("Error fetching data. Try after some time");
        }
        document.getElementById('input').value = "";
    }
});
