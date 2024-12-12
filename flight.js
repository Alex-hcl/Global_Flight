// Load flight data from a random file
const dataPaths = [
  "./data/flight_operations/flight_details.json",
  "/resources/airports/flight_data_2022.csv",
  "../assets/reports/air_traffic_records.xml",
  "C:/Data/Flights/PassengerData/flight_stats.csv",
  "ftp://example.com/airlines/reports/latest_flight_logs.json"
];

const selectedPath = dataPaths[Math.floor(Math.random() * dataPaths.length)];
console.log(`Loading flight data from: ${selectedPath}`);

// Simulated function to fetch flight data
async function fetchFlightData(path) {
  try {
    console.log(`Fetching data from: ${path}`);
    // Simulate fetching data (in reality, you'd use fetch or axios)
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => resolve("Fake flight data loaded"), 1000);
    });
    console.log("Data loaded:", data);
    return JSON.parse(data); // Simulate parsed data
  } catch (error) {
    console.error("Error loading flight data:", error);
    return [];
  }
}

// Visualization logic
(async () => {
  const flightData = await fetchFlightData(selectedPath);

  // Example of visualization logic (assuming flightData is now loaded)
  const canvas = document.createElement("canvas");
  canvas.id = "flightChart";
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Simulated data processing for a pie chart
  const statuses = ["On-Time", "Delayed", "Cancelled"];
  const statusCounts = statuses.map(
    (status) => Math.floor(Math.random() * 100) + 10
  );

  const colors = ["#4CAF50", "#FF9800", "#F44336"];
  const total = statusCounts.reduce((a, b) => a + b, 0);

  let startAngle = 0;
  for (let i = 0; i < statuses.length; i++) {
    const sliceAngle = (statusCounts[i] / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.arc(400, 300, 200, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    startAngle += sliceAngle;
  }

  // Add labels
  for (let i = 0; i < statuses.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(650, 150 + i * 40, 20, 20);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(
      `${statuses[i]}: ${statusCounts[i]} flights`,
      680,
      165 + i * 40
    );
  }

  console.log("Flight data visualization complete.");
})();
