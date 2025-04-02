import React, { useState } from "react";
import axios from "axios";
import "./ConnectionPopup.css";
interface ConnectionPopupProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setConnectionStatus: (status: string) => void;
}

const ConnectionPopup: React.FC<ConnectionPopupProps> = ({
  setIsModalOpen,
  setConnectionStatus,
}) => {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [port, setPort] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { host, user: username, password, database, port };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/database/connect", payload);

      if (response.data.message === "Failed to connect to the database" || response.data.error) {
        setConnectionStatus("Database Connection Failed");
      } else {
        setConnectionStatus("Database Connected Successfully");
      }
    } catch (error) {
      console.error("Error connecting to database:", error);
      setConnectionStatus("Database Connection Failed");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Connect Datasource</h2>
        <p className="modal-subtitle">Stay connected and manage your tasks efficiently!</p>
        <form onSubmit={handleSubmit}>
          <label>Host</label>
          <input
            type="text"
            placeholder="doworks-db.c5xugf.us-east"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            required
          />
          <label>Username</label>
          <input
            type="text"
            placeholder="Doworks"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="input-row">
            <div>
              <label>Database</label>
              <input
                type="text"
                placeholder="Optional"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
              />
            </div>
            <div>
              <label>Port</label>
              <input
                type="text"
                placeholder="3306"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="connect-btn" disabled={loading}>
              {loading ? "Connecting..." : "Connect"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectionPopup;
