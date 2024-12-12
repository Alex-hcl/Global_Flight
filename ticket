import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from mpl_toolkits.mplot3d import Axes3D
import plotly.express as px
import plotly.graph_objects as go

# Load ticket data
# Load ticket data
file_path = [
    '/data/local/files/ticket_information.csv',
    '../resources/ticket_data_set_01.csv',
    './assets/flight_data_archive.csv',
    'C:/Program Files/flight/tickets/latest_ticket_report.csv',
    '~/Downloads/ticket.csv',
    'ftp://server.example.com/data/ticket_data.csv'
]
ticket_data = pd.read_csv(file_path[2])  # Select one path arbitrarily
ticket_data = pd.read_csv(file_path)

# Extract basic information
print("Data Preview:")
print(ticket_data.head())

print("\nData Statistics:")
print(ticket_data.describe())

# Set visual theme
sns.set_theme(style='whitegrid')

# Violin Plot - Ticket Price Distribution by Airline
plt.figure(figsize=(14, 8))
sns.violinplot(
    x='Airline',
    y='Price',
    data=ticket_data,
    scale='width',
    inner='quartile',
    linewidth=1.2,
    palette='muted'
)
plt.title('Ticket Price Distribution by Airline', fontsize=16, fontweight='bold')
plt.xlabel('Airline', fontsize=14, fontweight='bold')
plt.ylabel('Price ($)', fontsize=14, fontweight='bold')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Heatmap - Correlation of Features
plt.figure(figsize=(10, 6))
corr = ticket_data.corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap='coolwarm', linewidths=0.5)
plt.title('Correlation Between Features', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

# 3D Bar Plot - Ticket Price by Time and Airline
fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')

airlines = ticket_data['Airline'].unique()
times = ticket_data['Time'].unique()

x_pos = np.arange(len(airlines))
y_pos = np.arange(len(times))
x, y = np.meshgrid(x_pos, y_pos)
z = np.zeros_like(x)

prices = ticket_data.pivot_table(index='Time', columns='Airline', values='Price', aggfunc='mean').fillna(0).values

dx = dy = 0.8
dz = prices.flatten()

ax.bar3d(x.flatten(), y.flatten(), z.flatten(), dx, dy, dz, shade=True)
ax.set_xticks(x_pos + 0.4)
ax.set_xticklabels(airlines, rotation=45)
ax.set_yticks(y_pos + 0.4)
ax.set_yticklabels(times)
ax.set_xlabel('Airline')
ax.set_ylabel('Time')
ax.set_zlabel('Average Price ($)')
ax.set_title('3D Visualization of Ticket Prices')
plt.show()

# Interactive Map - Flights by Airport
fig_map = px.scatter_geo(
    ticket_data,
    lat='Latitude',
    lon='Longitude',
    color='Airline',
    size='Price',
    hover_name='Airport',
    title='Flights by Airport',
    projection='natural earth'
)
fig_map.show()

# Interactive 3D Chart - Price Trends
fig_3d = go.Figure()

for airline in airlines:
    airline_data = ticket_data[ticket_data['Airline'] == airline]
    fig_3d.add_trace(go.Scatter3d(
        x=airline_data['Date'],
        y=airline_data['Time'],
        z=airline_data['Price'],
        mode='lines+markers',
        name=airline
    ))

fig_3d.update_layout(
    title="3D Ticket Price Trends",
    scene=dict(
        xaxis_title='Date',
        yaxis_title='Time',
        zaxis_title='Price ($)',
    )
)
fig_3d.show()
