const welcomeBanner = document.getElementById('welcomeBanner');
const imageEl = document.getElementById('image');
const weather = document.getElementById('weather');
const refresh = document.getElementById('refresh');

refresh.addEventListener('click', () => {
    window.location.reload();
});

const petnames = [
    "baby",
    "dear",
    "babe",
    "my love",
    "love"
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
    "images/saraAndISunset.jpeg",
    "images/20260724_190620.jpg",
    "images/20260724_190614.jpg",
    "images/20260721_180000.jpg",
    "images/20260706_225806.jpg",
    "images/20260702_223538.jpg",
    "images/20260702_223515.jpg",
    "images/20260628_155609.jpg",
    "images/20260628_155321.jpg",
    "images/20260628_150043.jpg",
    "images/20260621_203749.jpg",
    "images/20260607_195005.jpg"
];

const imageIndex = dayNumber % imageSources.length;
const image = imageSources[imageIndex];

imageEl.innerHTML = `
    <img src="./${image}" alt="pic-of-us" height="auto" width="100%" loading="lazy">
`;

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
        <h3>The weather today is <br/> ${currentTemp} degrees celsius!</h3>
    `;
    
        if (data.current.is_day === 1) {
            welcomeBanner.innerHTML = `
                 <h1>Good morning ${petname}!</h1>
             `;
        } else if (data.current.is_day === 0) {
            welcomeBanner.innerHTML = `
                 <h1>Good night ${petname}!</h1>
             `;
        } else {
            welcomeBanner.innerHTML = `
                <h1>Good day ${petname}</h1>
            `
        }


    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
};

getWeather();

// ------------------------------------------------------------
const jokeEl = document.getElementById('joke');

async function getJoke() {
    try {
        const apiKey = 'l7m0vyJzQT5W6izPZNwwAvOucbmiq88UvX8wRBGB';
        const response = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const joke = data[0].joke;

        jokeEl.innerHTML = `
            <h3>${joke}</h3>
        `;
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
};

// getJoke();

// ------------------------------------------------------------
const timeZone = document.getElementById('timezone');

const gibraltarTime = now.toLocaleTimeString("en-US", {
  timeZone: 'Europe/Gibraltar',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const newYorkTime = now.toLocaleTimeString("en-US", {
  timeZone: 'America/New_York',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const londonTime = now.toLocaleTimeString("en-US", {
  timeZone: 'Europe/London',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

timeZone.innerHTML = `
    <h3>
        GIB: ${gibraltarTime} <br/>
        NY: ${newYorkTime} <br/>
        UK: ${londonTime}
    </h3>
`;