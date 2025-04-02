import * as React from "react";
import { useState } from "react";
import ConnectionPopup from "./components/ConnectionPopup";
import PlotContainer from "./components/PlotContainer";
var DynamicDashboard = function () {
    var _a = useState(true), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = useState(false), isConnected = _b[0], setIsConnected = _b[1];
    var handleConnectionStatus = function (status) {
        if (status === "Database Connected Successfully") {
            setIsConnected(true);
        }
    };
    return (React.createElement("div", { className: "dashboard-container" }, isConnected ? (React.createElement(PlotContainer, null)) : (isModalOpen && (React.createElement(ConnectionPopup, { setIsModalOpen: setIsModalOpen, setConnectionStatus: handleConnectionStatus })))));
};
export default DynamicDashboard;
