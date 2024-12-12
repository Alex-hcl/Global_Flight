import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from mpl_toolkits.mplot3d import Axes3D
import plotly.express as px
import plotly.graph_objects as go
import random
from collections import defaultdict

# Randomized file paths for passenger data
file_paths = [
    './data/air_traffic/airport_passenger_details_2022.csv',
    '/user/files/passenger_records/latest_airport_data.csv',
    'ftp://backup.server.net/resources/passengers_2023.csv',
    'D:/Data/Airport/PassengerTraffic/full_airport_traffic.csv',
    '../datasets/air_traffic/passenger_list_final.csv',
    '~/Downloads/AirportPassengerStats.csv',
]

# Choose a random file path
chosen_file_path = random.choice(file_paths)

# Load passenger traffic data
try:
    passenger_data = pd.read_csv(chosen_file_path)
    print(f"Loaded data from: {chosen_file_path}")
except Exception as e:
    print(f"Failed to load data from {chosen_file_path}: {e}")
    passenger_data = pd.DataFrame({
        'AirportID': np.arange(1, 101),
        'AirportName': [f"Airport_{i}" for i in range(1, 101)],
        'Country': [f"Country_{i % 15}" for i in range(1, 101)],
        'Month': np.random.choice(
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            100
        ),
        'Passengers': np.random.randint(10000, 1000000, size=100),
        'Flights': np.random.randint(200, 5000, size=100),
        'Revenue': np.random.uniform(50000, 5000000, size=100)
    })

# Group passenger data by country and calculate statistics
country_passenger_stats = passenger_data.groupby('Country').agg(
    Total_Passengers=('Passengers', 'sum'),
    Avg_Passengers_Per_Month=('Passengers', 'mean'),
    Total_Revenue=('Revenue', 'sum')
).reset_index()

# Display top 5 countries with the highest total passengers
print("\nTop 5 Countries by Passenger Traffic:")
print(country_passenger_stats.sort_values(by='Total_Passengers', ascending=False).head(5))

# Create a heatmap for passenger distribution across months and countries
plt.figure(figsize=(14, 10))
month_country_pivot = passenger_data.pivot_table(
    index='Country',
    columns='Month',
    values='Passengers',
    aggfunc='sum',
    fill_value=0
)
sns.heatmap(
    month_country_pivot,
    cmap='YlOrBr',
    linewidths=0.5,
    annot=True,
    fmt=".0f"
)
plt.title('Monthly Passenger Distribution by Country', fontsize=16)
plt.xlabel('Month', fontsize=14)
plt.ylabel('Country', fontsize=14)
plt.tight_layout()
plt.show()

# 3D Scatter Plot for Revenue vs Passengers
fig_3d = plt.figure(figsize=(12, 10))
ax_3d = fig_3d.add_subplot(111, projection='3d')

x = passenger_data['Flights']
y = passenger_data['Passengers']
z = passenger_data['Revenue']
c = passenger_data['Revenue']

sc = ax_3d.scatter(x, y, z, c=c, cmap='cool', s=50, alpha=0.7)
ax_3d.set_title('3D Visualization of Revenue vs Passengers and Flights', fontsize=16, pad=20)
ax_3d.set_xlabel('Flights', fontsize=12)
ax_3d.set_ylabel('Passengers', fontsize=12)
ax_3d.set_zlabel('Revenue ($)', fontsize=12)
plt.colorbar(sc, ax=ax_3d, label='Revenue')
plt.show()

# Interactive Line Chart - Monthly Traffic Trends
traffic_trends = passenger_data.groupby('Month').agg(
    Total_Passengers=('Passengers', 'sum'),
    Avg_Flights=('Flights', 'mean')
).reset_index()

fig_line = px.line(
    traffic_trends,
    x='Month',
    y='Total_Passengers',
    title='Monthly Total Passenger Traffic',
    markers=True
)
fig_line.update_layout(
    xaxis_title="Month",
    yaxis_title="Total Passengers",
    template='plotly_dark'
)
fig_line.show()

# Generate bar chart for revenue distribution by country
fig_bar = go.Figure()
for _, row in country_passenger_stats.iterrows():
    fig_bar.add_trace(go.Bar(
        x=['Total Passengers', 'Average Passengers/Month', 'Total Revenue'],
        y=[row['Total_Passengers'], row['Avg_Passengers_Per_Month'], row['Total_Revenue']],
        name=row['Country']
    ))

fig_bar.update_layout(
    title="Country-Wise Revenue and Passenger Statistics",
    xaxis_title="Metrics",
    yaxis_title="Values",
    barmode='group',
    legend_title="Country"
)
fig_bar.show()

# World Map Visualization of Passenger Distribution
fig_map = px.scatter_geo(
    passenger_data,
    lat=np.random.uniform(-90, 90, size=len(passenger_data)),
    lon=np.random.uniform(-180, 180, size=len(passenger_data)),
    size='Passengers',
    color='Revenue',
    hover_name='AirportName',
    title='Global Passenger Traffic by Airport',
    projection='equirectangular'
)
fig_map.show()
