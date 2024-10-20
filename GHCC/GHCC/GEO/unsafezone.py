from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
from geopy.distance import geodesic

app = Flask(__name__)

# Load the unsafe zones CSV file
df_zones = pd.read_csv("C:/Users/Dell/Desktop/SIHGEO/static/unsafe_zones - Sheet1 (4).csv")

import folium

# Create a map centered at an average location
map_center = [df_zones['latitude'].mean(), df_zones['longitude'].mean()]
m = folium.Map(location=map_center, zoom_start=12)

# Add unsafe zones to the map
for idx, zone in df_zones.iterrows():
    folium.Circle(
        radius=zone['radius_km'] * 1000,  # Convert km to meters
        location=[zone['latitude'], zone['longitude']],
        popup=zone['description'],
        color='red',
        fill=True,
        fill_opacity=0.4
    ).add_to(m)

# Save the map
map_path = "C:/Users/Dell/Desktop/SIHGEO/static/unsafe_zones_map.html"
m.save(map_path)

print(f"Map saved at: {map_path}")

