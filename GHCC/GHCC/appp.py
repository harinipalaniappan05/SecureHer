from flask import Flask, request, jsonify
import pandas as pd
from geopy.distance import geodesic

app = Flask(__name__)

# Load the unsafe zones CSV file
df_zones = pd.read_csv("C:\Users\Dell\Desktop\sih\unsafe_zones - Sheet1 (4).csv")

# Function to check if the user is inside any unsafe zone
def is_inside_unsafe_zone(user_location, df_zones):
    for idx, zone in df_zones.iterrows():
        zone_location = (zone['latitude'], zone['longitude'])
        distance = geodesic(user_location, zone_location).kilometers
        if distance <= zone['radius_km']:
            return True, zone
    return False, None

@app.route('/check_location', methods=['POST'])
def check_location():
    data = request.json
    user_location = (data['latitude'], data['longitude'])
    in_unsafe_zone, zone_info = is_inside_unsafe_zone(user_location, df_zones)

    if in_unsafe_zone:
        message = f"Warning! You are in an unsafe area: {zone_info['description']}"
    else:
        message = "You are in a safe area."

    return jsonify({"message": message})

if __name__ == '__main__':
    app.run(debug=True)