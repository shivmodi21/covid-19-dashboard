from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from scraper import (
    get_worldwide_data,
    get_country_data,
    get_global_data
)

import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FRONTEND_DIR = os.path.join(
    BASE_DIR,
    "frontend"
)

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return send_from_directory(
        FRONTEND_DIR,
        "index.html"
    )

@app.route("/<path:filename>")
def frontend_files(filename):
    return send_from_directory(
        FRONTEND_DIR,
        filename
    )

# =================================
# Worldwide Summary
# =================================

@app.route("/api/worldwide")
def worldwide():

    try:

        data = get_global_data()

        return jsonify(data)

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# =================================
# Country List
# =================================

@app.route("/api/countries")
def countries():

    try:

        data = get_worldwide_data()

        country_names = [
            country["country"]
            for country in data
        ]

        return jsonify(country_names)

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# =================================
# All Country Statistics
# =================================

@app.route("/api/countries/data")
def countries_data():

    try:

        data = get_worldwide_data()

        return jsonify(data)

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# =================================
# Selected Country
# =================================

@app.route("/api/country")
def country():

    country_name = request.args.get("country")

    if not country_name:

        return jsonify({
            "error": "Country parameter is required."
        }), 400

    try:

        data = get_country_data(country_name)

        return jsonify(data)

    except ValueError as error:

        return jsonify({
            "error": str(error)
        }), 404

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


# =================================
# Run Application
# =================================

if __name__ == "__main__":
    app.run(debug=True)