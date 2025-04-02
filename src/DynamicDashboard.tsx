import * as React from "react";
import { useState } from "react";
import ConnectionPopup from "./components/ConnectionPopup";
import PlotContainer from "./components/PlotContainer";

const DynamicDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectionStatus = (status: string) => {
    if (status === "Database Connected Successfully") {
      setIsConnected(true);
    }
  };

  return (
    <div className="dashboard-container">
      {isConnected ? (
        <PlotContainer />
      ) : (
        isModalOpen && (
          <ConnectionPopup
            setIsModalOpen={setIsModalOpen}
            setConnectionStatus={handleConnectionStatus}
          />
        )
      )}
    </div>
  );
};

export default DynamicDashboard;
