# COVID-19 Global Dashboard

An interactive web dashboard for exploring historical COVID-19 statistics by country.

The project started as a Python-based desktop notification application and was extended into a web-based dashboard using **Python, Flask, BeautifulSoup, HTML, CSS, and JavaScript**.

## Features

* 🌍 Worldwide COVID-19 statistics overview
* 🔎 Country selection and automatic statistics loading
* 📊 Country-level statistics table
* 🔍 Search countries within the worldwide table
* 🔔 Browser desktop notifications for the selected country
* 📱 Responsive dashboard for desktop and mobile
* 🔄 REST API powered by Flask
* 🌐 Data retrieved from Worldometer

## Dashboard

The dashboard provides:

* Total COVID-19 cases
* Total deaths
* Total recovered
* Country count
* Country-specific statistics
* Worldwide country comparison

The country explorer automatically updates when a country is selected from the dropdown.

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Browser Notification API

### Backend

* Python
* Flask
* Flask-CORS
* BeautifulSoup
* Requests

### Data Source

COVID-19 statistics are retrieved from **Worldometer**.

> **Data note:** Worldometer's COVID-19 tracker stopped updating on April 13, 2024. Therefore, this project should be considered a dashboard for historical COVID-19 data rather than a source of live COVID-19 statistics.

## Project Structure

```text
covid-19-dashboard/
│
├── backend/
│   ├── app.py
│   ├── scraper.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## API Endpoints

The Flask backend provides the following endpoints:

| Endpoint                     | Description                       |
| ---------------------------- | --------------------------------- |
| `/`                          | Dashboard homepage                |
| `/api/worldwide`             | Worldwide COVID-19 summary        |
| `/api/countries`             | List of available countries       |
| `/api/countries/data`        | Statistics for all countries      |
| `/api/country?country=India` | Statistics for a selected country |

### Example

```text
/api/country?country=India
```

Returns country-level information including:

```json
{
    "country": "India",
    "total_cases": "...",
    "new_cases": "...",
    "total_deaths": "...",
    "new_deaths": "...",
    "total_recovered": "...",
    "new_recovered": "...",
    "active_cases": "...",
    "serious_critical": "..."
}
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/shivmodi21/covid-19-dashboard.git
cd covid-19-dashboard
```

### 2. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Start the Flask server

```bash
python app.py
```

The application will be available at:

```text
http://127.0.0.1:5000
```

## Notifications

The dashboard uses the browser's **Notification API** to display desktop notifications for the selected country.

When the user selects a country and enables notifications, the dashboard can display its current loaded statistics as a desktop notification.

Browser notification permissions must be enabled for the dashboard's domain.

## Architecture

```text
                    Worldometer
                         │
                         ▼
                  Python Scraper
                         │
                         ▼
                      Flask
                         │
                    REST API
                         │
                         ▼
               HTML / CSS / JavaScript
                         │
                         ▼
                Interactive Dashboard
```

## Future Improvements

Potential future improvements include:

* Historical COVID-19 trend charts
* Sortable statistics table
* Additional Worldometer statistics
* Country comparison
* Automatic background monitoring
* Notifications when new data is detected
* Improved caching to reduce requests to the data source
* Deployment with a production WSGI server

## Background

This project originally began as a simple Python COVID-19 notifier that retrieved country statistics and displayed desktop notifications.

It was later expanded into an interactive web application to demonstrate:

* Web scraping
* REST API development
* Flask backend development
* Frontend/backend integration
* JavaScript-based dynamic UI updates
* Browser notifications
* Full-stack project deployment

## Author

**Shiv Modi**

GitHub: https://github.com/shivmodi21
