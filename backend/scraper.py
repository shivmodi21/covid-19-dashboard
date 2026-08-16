import requests
from bs4 import BeautifulSoup


WORLDOMETER_URL = "https://www.worldometers.info/coronavirus/"

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def get_worldometer_page():

    response = requests.get(
        WORLDOMETER_URL,
        headers=HEADERS,
        timeout=15
    )

    response.raise_for_status()

    return BeautifulSoup(response.text, "html.parser")


def get_worldwide_data():

    soup = get_worldometer_page()

    table = soup.find(
        "table",
        id="main_table_countries_today"
    )

    if not table:
        raise ValueError("Worldometer country table not found.")

    rows = table.find("tbody").find_all("tr")

    countries = []

    for row in rows:

        columns = row.find_all("td")

        if len(columns) < 10:
            continue

        # First column is the ranking number.
        rank = columns[0].get_text(strip=True)

        # Ignore regional summaries and World row.
        if not rank.isdigit():
            continue

        country_link = columns[1].find("a")

        if not country_link:
            continue

        country = country_link.get_text(strip=True)

        countries.append({
            "rank": int(rank),
            "country": country,
            "total_cases": columns[2].get_text(strip=True),
            "new_cases": columns[3].get_text(strip=True),
            "total_deaths": columns[4].get_text(strip=True),
            "new_deaths": columns[5].get_text(strip=True),
            "total_recovered": columns[6].get_text(strip=True),
            "new_recovered": columns[7].get_text(strip=True),
            "active_cases": columns[8].get_text(strip=True),
            "serious_critical": columns[9].get_text(strip=True),
        })

    return countries


def get_country_data(country_name):

    countries = get_worldwide_data()

    country_name = country_name.strip().lower()

    for country in countries:

        if country["country"].lower() == country_name:
            return country

    raise ValueError(
        f"Country '{country_name}' not found."
    )


def get_global_data():

    soup = get_worldometer_page()

    return {
        "total_cases": get_statistic(
            soup,
            "Coronavirus Cases:"
        ),
        "total_deaths": get_statistic(
            soup,
            "Deaths:"
        ),
        "total_recovered": get_statistic(
            soup,
            "Recovered:"
        )
    }


def get_statistic(soup, heading):

    heading_element = soup.find(
        string=lambda text:
        text and heading in text
    )

    if not heading_element:
        return "--"

    parent = heading_element.parent

    value = parent.find_next()

    if value:
        return value.get_text(strip=True)

    return "--"