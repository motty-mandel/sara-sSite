const welcomeBanner = document.getElementById('welcomeBanner');
const imageEl = document.getElementById('image');

const petnames = [
    "baby",
    "dear",
    "babe",
];

const dayNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
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