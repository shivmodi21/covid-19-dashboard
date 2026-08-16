/* =================================
   Configuration
================================= */

// const API_URL = "http://127.0.0.1:5000";
const API_URL = "";


/* =================================
   DOM Elements
================================= */

// Country Explorer
const countrySelect = document.getElementById("country-select");
const countryResult = document.getElementById("country-result");
const selectedCountry = document.getElementById("selected-country");
const countryCases = document.getElementById("country-cases");
const countryDeaths = document.getElementById("country-deaths");
const countryRecovered = document.getElementById("country-recovered");


// Country Table
const countrySearch = document.getElementById("country-search");
const countryTableBody = document.getElementById("country-table-body");


// Global Overview
const worldCases = document.getElementById("world-cases");
const worldDeaths = document.getElementById("world-deaths");
const worldRecovered = document.getElementById("world-recovered");
const countryCount = document.getElementById("country-count");


// Notification
const notifyBtn = document.getElementById("notify-btn");
const notificationStatus = document.getElementById("notification-status");


/* =================================
   Application State
================================= */

let countriesData = [];
let countryNames = [];


/* =================================
   Helper Functions
================================= */

function formatNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "-"
    ) {
        return "--";
    }

    return value;
}


function showLoading(message = "Loading country statistics...") {

    countryTableBody.innerHTML = `
        <tr>
            <td colspan="4">${message}</td>
        </tr>
    `;
}


function showError(message) {

    countryTableBody.innerHTML = `
        <tr>
            <td colspan="4">${message}</td>
        </tr>
    `;
}


/* =================================
   Fetch Countries
================================= */

async function fetchCountries() {

    try {

        showLoading();

        const response = await fetch(
            `${API_URL}/api/countries/data`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch country data.");
        }

        const data = await response.json();

        countriesData = data;

        countryNames = data.map(country => country.country);

        populateCountryDropdown(countryNames);

        populateCountryTable(countriesData);

        countryCount.textContent = data.length;

    } catch (error) {

        console.error("Country fetch error:", error);

        showError(
            "Unable to load country data."
        );
    }
}

async function fetchWorldwideData() {

    try {

        const response = await fetch(
            `${API_URL}/api/worldwide`
        );

        if (!response.ok) {
            throw new Error(
                "Unable to fetch worldwide data."
            );
        }

        const data = await response.json();

        updateWorldwideDashboard(data);

    } catch (error) {

        console.error(
            "Worldwide data error:",
            error
        );

        worldCases.textContent = "--";
        worldDeaths.textContent = "--";
        worldRecovered.textContent = "--";
    }
}

function updateWorldwideDashboard(data) {

    worldCases.textContent =
        formatNumber(data.total_cases);

    worldDeaths.textContent =
        formatNumber(data.total_deaths);

    worldRecovered.textContent =
        formatNumber(data.total_recovered);

    countryCount.textContent =
        countriesData.length;
}


/* =================================
   Populate Country Dropdown
================================= */

function populateCountryDropdown(countries) {

    countrySelect.innerHTML = `
        <option value="">
            Select a country
        </option>
    `;

    countries.forEach(country => {

        const option = document.createElement("option");

        option.value = country;
        option.textContent = country;

        countrySelect.appendChild(option);
    });
}


/* =================================
   Fetch Selected Country
================================= */

async function fetchCountryData(country) {

    if (!country) {
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/api/country?country=${encodeURIComponent(country)}`
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Unable to fetch country data."
            );
        }


        updateCountryDashboard(data);


    } catch (error) {

        console.error("Country data error:", error);

        selectedCountry.textContent = "Error";

        countryCases.textContent = "--";
        countryDeaths.textContent = "--";
        countryRecovered.textContent = "--";


    }
}


/* =================================
   Update Country Dashboard
================================= */

function updateCountryDashboard(data) {

    selectedCountry.textContent =
        data.country || "--";

    countryCases.textContent =
        formatNumber(data.total_cases);

    countryDeaths.textContent =
        formatNumber(data.total_deaths);

    countryRecovered.textContent =
        formatNumber(data.total_recovered);
}


/* =================================
   Country Table
================================= */

function populateCountryTable(countries) {

    if (!countries || countries.length === 0) {

        showError("No country data available.");

        return;
    }

    countryTableBody.innerHTML = "";

    const visibleCountries = countries.slice(0, 5);

    visibleCountries.forEach(country => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${country.country}</td>
            <td>${formatNumber(country.total_cases)}</td>
            <td>${formatNumber(country.total_deaths)}</td>
            <td>${formatNumber(country.total_recovered)}</td>
        `;

        countryTableBody.appendChild(row);
    });


    // Show "..." when more countries are available
    if (countries.length > 5) {

        const row = document.createElement("tr");

        row.classList.add("more-countries");

        row.innerHTML = `
            <td colspan="4">...</td>
        `;

        countryTableBody.appendChild(row);
    }
}


/* =================================
   Search Country Table
================================= */

countrySearch.addEventListener(
    "input",
    function () {

        const searchTerm =
            countrySearch.value
                .trim()
                .toLowerCase();

        const filteredCountries =
            countriesData.filter(country =>
                country.country
                    .toLowerCase()
                    .includes(searchTerm)
            );

        populateCountryTable(filteredCountries);
    }
);


/* =================================
   Dropdown Change
================================= */

countrySelect.addEventListener(
    "change",
    function () {

        const country =
            countrySelect.value;


        if (country) {
            fetchCountryData(country);
        }
    }
);


/* =================================
   Notification
================================= */

notifyBtn.addEventListener("click", async function () {

    // Make sure a country has been selected
    const country = selectedCountry.textContent.trim();

    if (!country || country === "--") {

        notificationStatus.textContent =
            "Please select a country first.";

        return;
    }


    // Check browser support
    if (!("Notification" in window)) {

        notificationStatus.textContent =
            "Desktop notifications are not supported by this browser.";

        return;
    }


    // Ask for permission if necessary
    if (Notification.permission === "default") {

        const permission =
            await Notification.requestPermission();

        if (permission !== "granted") {

            notificationStatus.textContent =
                "Notification permission was not granted.";

            return;
        }
    }


    // Permission denied
    if (Notification.permission === "denied") {

        notificationStatus.textContent =
            "Notifications are blocked. Please enable them in browser settings.";

        return;
    }


    // Permission granted
    if (Notification.permission === "granted") {

        const cases = countryCases.textContent;
        const deaths = countryDeaths.textContent;
        const recovered = countryRecovered.textContent;


        new Notification(
            `COVID-19 Update — ${country}`,
            {
                body:
                    `Cases: ${cases}\n` +
                    `Deaths: ${deaths}\n` +
                    `Recovered: ${recovered}`
            }
        );


        notificationStatus.textContent =
            `Notification sent for ${country}.`;
    }

});


/* =================================
   Initialize Dashboard
================================= */

fetchCountries();
fetchWorldwideData();