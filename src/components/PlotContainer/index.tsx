import * as React from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ScatterController,
  BarController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter, Bar, Line, Pie } from "react-chartjs-2";
import "./PlotContainer.css";

ChartJS.register(
  ScatterController,
  BarController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const PlotContainer: React.FC = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPlots, setShowPlots] = useState(false);


  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("http://localhost:3001/upload/tables");
        if (!response.ok) throw new Error("Failed to fetch tables");

        const data = await response.json();
        setTables(data || []);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);

  const fetchPlotData = async () => {
    if (selectedTables.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/upload/table-column-datatypes?tables=${selectedTables.join(",")}`
      );
      if (!response.ok) throw new Error("Failed to fetch plot data");

      const data = await response.json();
      setPlotData(data.plotData || []);
      setShowPlots(true); 
    } catch (error) {
      console.error("Error fetching plot data:", error);
      setPlotData([]);
    }
    setLoading(false);
  };


  const handleTableSelection = (table: string) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };


  const renderChart = (plot: any) => {
    if (!plot.data || !Array.isArray(plot.data.x) || !Array.isArray(plot.data.y)) {
      return <p className="error-text">Invalid data for {plot.plot_type}</p>;
    }

    let chartData = {
      labels: plot.data.x,
      datasets: [
        {
          label: plot.plot_name || plot.plot_type,
          data: plot.data.y,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          borderColor: "#666",
          borderWidth: 1,
        },
      ],
    };

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: plot.plot_type === "pie" },
      },
    };

    switch (plot.plot_type) {
      case "scatter":
        return <Scatter data={chartData} options={commonOptions} />;
      case "histogram":
      case "bar":
        return <Bar data={chartData} options={commonOptions} />;
      case "line":
        return <Line data={chartData} options={commonOptions} />;
      case "doughnut":
      case "pie":
        return <Pie data={chartData} options={commonOptions} />;
      default:
        return <p className="error-text">Unsupported chart type</p>;
    }
  };

  return (
    <main className="main-content">

      {!showPlots ? (
        <div className="table-selection">
          <h3>Select Tables</h3>
          {tables.length === 0 ? (
            <p className="empty-message">No tables available.</p>
          ) : (
            <ul className="table-list">
              {tables.map((table) => (
                <li key={table}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTables.includes(table)}
                      onChange={() => handleTableSelection(table)}
                    />
                    {table}
                  </label>
                </li>
              ))}
            </ul>
          )}
          <div className="button-container">
            <button
              onClick={fetchPlotData}
              disabled={loading || selectedTables.length === 0}
              className={`fetch-button ${loading ? "loading" : ""}`}
            >
              {loading ? "Loading..." : "Get Plot"}
            </button>
          </div>
        </div>
      ) : (
        <div className="charts-grid">
          {plotData.length === 0 && !loading ? (
            <p className="empty-message">No data available for selected tables.</p>
          ) : (
            plotData.map((plot, index) => (
              <div key={index} className="chart-card">
                <h3 className="chart-title">{plot.plot_name || plot.plot_type}</h3>
                <div className="chart-content">{renderChart(plot)}</div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
};

export default PlotContainer;
