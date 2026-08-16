# COVID-19 India Notifier

A Python-based desktop notification application that retrieves COVID-19 statistics for India and displays them as a desktop notification.

## Features

* Fetches COVID-19 statistics using web scraping.
* Extracts new cases and deaths using BeautifulSoup.
* Displays the information through desktop notifications.
* Includes two notification implementations:

  * `win10toast`
  * `plyer`

## How It Works

```text
Worldometer
     ↓
Python Web Scraper
     ↓
BeautifulSoup
     ↓
COVID-19 Statistics
     ↓
Desktop Notification
```

## Technologies

* Python
* BeautifulSoup
* urllib
* Web Scraping
* Win10Toast
* Plyer

## Project Structure

```text
covid-notifier/
│
├── index.html
├── css/
│   └── style.css
│
├── python/
│   ├── notifier.py
│   ├── notifier_plyer.py
│   └── requirements.txt
│
└── README.md
```

## Installation

Create and activate a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r python/requirements.txt
```

## Running the Application

For the Win10Toast implementation:

```bash
python python/notifier.py
```

For the Plyer implementation:

```bash
python python/notifier_plyer.py
```

The application retrieves the available COVID-19 statistics and displays them as a desktop notification.

## Notification Implementations

### Win10Toast

`notifier.py` uses the `win10toast` library to generate Windows desktop notifications.

### Plyer

`notifier_plyer.py` uses `plyer.notification`, providing an alternative notification implementation.

## Historical Data

The original project was developed as a COVID-19 monitoring application. The accompanying web page presents the historical COVID-19 statistics for India, as the original data source is no longer maintained as a live COVID-19 tracker.

## License

This project is intended as a personal learning and portfolio project.
