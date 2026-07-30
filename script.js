const welcomeBanner = document.getElementById('welcomeBanner');
const imageEl = document.getElementById('image');
const weather = document.getElementById('weather');

const petnames = [
    "baby",
    "dear",
    "babe",
];

const now = new Date();
const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / (1000 * 60 * 60 * 24));
const index = dayNumber % petnames.length;
const petname = petnames[index];

welcomeBanner.innerHTML = `
    <h1>Good morning ${petname}!</h1>
`;

const imageSources = [
    "images/saraAndIBeach.jpeg",
    "images/saraAndIMoving.jpeg",
    "images/saraAndIPark.jpeg",
    "images/saraAndISunset.jpeg"
];

const imageIndex = dayNumber % imageSources.length;
const image = imageSources[imageIndex];

imageEl.innerHTML = `
    <img src="./${image}" alt="pic-of-us" height="auto" width="100%">
`

async function getWeather() {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=31.769&longitude=35.2163&current=temperature_2m,is_day&timezone=auto");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        currentTemp = Math.trunc(data.current.temperature_2m);
        weather.innerHTML = `
        <h2>The weather today is <br/> ${currentTemp} degrees celsius!</h2>
    `
        if (data.current.is_day === 1) {
            welcomeBanner.innerHTML = `
                 <h1>Good morning ${petname}!</h1>
             `;
        } else {
             welcomeBanner.innerHTML = `
                 <h1>Good night ${petname}!</h1>
             `;
        }


    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

getWeather();