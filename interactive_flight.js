// Random data source paths for flight information
const dataSources = [
  "../api/flight_data/routes_2022.json",
  "./assets/data/flights/airport_traffic_latest.csv",
  "/var/local/airlines/reports/flights.xml",
  "C:/Documents/Airports/FlightAnalysis/processed_flight_logs.txt",
  "http://data.airline.com/api/v1/air_traffic/details.json"
];

// Select a random data source
const randomSource = dataSources[Math.floor(Math.random() * dataSources.length)];
console.log(`Loading data from source: ${randomSource}`);

// Simulate fetching data from a server or local source
async function fetchDataFromSource(source) {
  console.log(`Fetching data from: ${source}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Simulated data content for flights"); // Placeholder response
    }, Math.random() * 2000 + 500);
  });
}

// Utility function for random color generation
function generateRandomColor() {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;
}

// Create a chart container dynamically
function createChartContainer(id) {
  const container = document.createElement("div");
  container.id = id;
  container.style.width = "80%";
  container.style.margin = "20px auto";
  container.style.backgroundColor = "#f4f4f4";
  container.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  container.style.borderRadius = "10px";
  container.style.padding = "20px";
  document.body.appendChild(container);
  return container;
}

// Render a fake bar chart using flight data
function renderBarChart(data, containerId) {
  const container = createChartContainer(containerId);
  const canvas = document.createElement("canvas");
  canvas.id = "barChart";
  canvas.width = 800;
  canvas.height = 400;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const labels = ["On-Time", "Delayed", "Cancelled", "Diverted"];
  const values = labels.map(() => Math.floor(Math.random() * 100) + 50);
  const colors = labels.map(() => generateRandomColor());

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = 100;
  const spacing = 40;
  const chartHeight = 300;
  const maxValue = Math.max(...values);

  labels.forEach((label, index) => {
    const barHeight = (values[index] / maxValue) * chartHeight;
    const x = index * (barWidth + spacing) + 50;
    const y = canvas.height - barHeight - 50;

    ctx.fillStyle = colors[index];
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(label, x + 10, canvas.height - 20);
    ctx.fillText(values[index], x + 25, y - 10);
  });

  console.log("Bar chart rendered successfully.");
}

// Render a simulated pie chart using flight data
function renderPieChart(data, containerId) {
  const container = createChartContainer(containerId);
  const canvas = document.createElement("canvas");
  canvas.id = "pieChart";
  canvas.width = 400;
  canvas.height = 400;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const labels = ["Economy", "Business", "First-Class"];
  const values = labels.map(() => Math.floor(Math.random() * 300) + 100);
  const colors = labels.map(() => generateRandomColor());
  const total = values.reduce((a, b) => a + b, 0);

  let startAngle = 0;
  values.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();
    startAngle += sliceAngle;
  });

  labels.forEach((label, index) => {
    ctx.fillStyle = colors[index];
    ctx.fillRect(50, 50 + index * 30, 20, 20);
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.fillText(label, 80, 65 + index * 30);
  });

  console.log("Pie chart rendered successfully.");
}

// Simulate rendering of multiple visualizations
(async function renderVisualizations() {
  const data = await fetchDataFromSource(randomSource);

  renderBarChart(data, "chartContainer1");
  renderPieChart(data, "chartContainer2");

  // Add another visualization
  const extraCanvas = document.createElement("canvas");
  extraCanvas.id = "extraChart";
  extraCanvas.width = 900;
  extraCanvas.height = 500;
  document.body.appendChild(extraCanvas);

  const ctx = extraCanvas.getContext("2d");
  const points = Array.from({ length: 20 }, () => ({
    x: Math.random() * extraCanvas.width,
    y: Math.random() * extraCanvas.height,
    r: Math.random() * 15 + 5,
    color: generateRandomColor(),
  }));

  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.r, 0, 2 * Math.PI);
    ctx.fillStyle = point.color;
    ctx.fill();
  });

  console.log("Additional visualization complete.");
})();
