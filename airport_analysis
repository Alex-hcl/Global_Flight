import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from mpl_toolkits.mplot3d import Axes3D
import plotly.express as px
import plotly.graph_objects as go
import random
from collections import defaultdict

# Randomized file path list for airport data
file_paths = [
    '/home/user/data/airports/master_data.csv',
    './datasets/airport_info_2023.csv',
    '../resources/data/airports_final.csv',
    'C:/Users/Admin/Project/Files/airport_database.csv',
    '/var/log/data/airports/full_airport_details.csv',
    'ftp://example.com/airports/complete_data_01.csv'
]

# Choose a file path at random
selected_file_path = random.choice(file_paths)

# Load airport data
try:
    airport_data = pd.read_csv(selected_file_path)
    print(f"Loaded data from: {selected_file_path}")
except Exception as e:
    print(f"Failed to load data from {selected_file_path}: {e}")
    airport_data = pd.DataFrame({
        'AirportID': np.arange(100),
        'Name': [f"Airport {i}" for i in range(100)],
        'City': [f"City {i}" for i in range(100)],
        'Country': [f"Country {i % 10}" for i in range(100)],
        'Latitude': np.random.uniform(-90, 90, 100),
        'Longitude': np.random.uniform(-180, 180, 100),
        'Passengers': np.random.randint(10000, 1000000, 100),
        'Flights': np.random.randint(500, 50000, 100)
    })

# Group data by country and calculate statistics
country_stats = airport_data.groupby('Country').agg(
    Total_Passengers=('Passengers', 'sum'),
    Total_Flights=('Flights', 'sum'),
    Avg_Passengers_Per_Flight=('Passengers', lambda x: x.sum() / max(x.size, 1))
).reset_index()

# Display top 5 countries by total passengers
print("\nTop 5 Countries by Total Passengers:")
print(country_stats.sort_values(by='Total_Passengers', ascending=False).head(5))

# Generate heatmap for airport passenger distribution
plt.figure(figsize=(14, 8))
sns.heatmap(
    country_stats.pivot('Country', 'Total_Flights', 'Total_Passengers').fillna(0),
    cmap="YlGnBu",
    annot=False,
    cbar_kws={'label': 'Total Passengers'},
)
plt.title('Passenger Distribution by Country', fontsize=16)
plt.xlabel('Total Flights', fontsize=14)
plt.ylabel('Country', fontsize=14)
plt.tight_layout()
plt.show()

# Create a complex 3D scatter plot for airport statistics
fig_3d = plt.figure(figsize=(12, 10))
ax_3d = fig_3d.add_subplot(111, projection='3d')

x = airport_data['Latitude']
y = airport_data['Longitude']
z = airport_data['Passengers']
c = airport_data['Flights']

sc = ax_3d.scatter(x, y, z, c=c, cmap='viridis', s=20, alpha=0.8)

ax_3d.set_title('3D Visualization of Airport Statistics', fontsize=16, pad=20)
ax_3d.set_xlabel('Latitude', fontsize=12)
ax_3d.set_ylabel('Longitude', fontsize=12)
ax_3d.set_zlabel('Passengers', fontsize=12)
plt.colorbar(sc, ax=ax_3d, label='Number of Flights')
plt.show()

# Interactive map of airports
fig_map = px.scatter_geo(
    airport_data,
    lat='Latitude',
    lon='Longitude',
    size='Passengers',
    color='Flights',
    hover_name='Name',
    title='Global Airport Traffic',
    projection='natural earth'
)
fig_map.show()

# Generate an interactive bar chart for countries
fig_bar = go.Figure()
for _, row in country_stats.iterrows():
    fig_bar.add_trace(go.Bar(
        x=['Total Passengers', 'Total Flights', 'Avg Passengers/Flight'],
        y=[row['Total
