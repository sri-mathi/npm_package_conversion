var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ScatterController, BarController, LineController, PieController, CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend, } from "chart.js";
import { Scatter, Bar, Line, Pie } from "react-chartjs-2";
import "./PlotContainer.css";
ChartJS.register(ScatterController, BarController, LineController, PieController, CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend);
var PlotContainer = function () {
    var _a = useState([]), tables = _a[0], setTables = _a[1];
    var _b = useState([]), selectedTables = _b[0], setSelectedTables = _b[1];
    var _c = useState([]), plotData = _c[0], setPlotData = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(false), showPlots = _e[0], setShowPlots = _e[1];
    useEffect(function () {
        var fetchTables = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3001/upload/tables")];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch tables");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setTables(data || []);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching tables:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchTables();
    }, []);
    var fetchPlotData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (selectedTables.length === 0)
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3001/upload/table-column-datatypes?tables=".concat(selectedTables.join(",")))];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch plot data");
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setPlotData(data.plotData || []);
                    setShowPlots(true);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error fetching plot data:", error_2);
                    setPlotData([]);
                    return [3 /*break*/, 5];
                case 5:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleTableSelection = function (table) {
        setSelectedTables(function (prev) {
            return prev.includes(table) ? prev.filter(function (t) { return t !== table; }) : __spreadArray(__spreadArray([], prev, true), [table], false);
        });
    };
    var renderChart = function (plot) {
        if (!plot.data || !Array.isArray(plot.data.x) || !Array.isArray(plot.data.y)) {
            return React.createElement("p", { className: "error-text" },
                "Invalid data for ",
                plot.plot_type);
        }
        var chartData = {
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
        var commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: plot.plot_type === "pie" },
            },
        };
        switch (plot.plot_type) {
            case "scatter":
                return React.createElement(Scatter, { data: chartData, options: commonOptions });
            case "histogram":
            case "bar":
                return React.createElement(Bar, { data: chartData, options: commonOptions });
            case "line":
                return React.createElement(Line, { data: chartData, options: commonOptions });
            case "doughnut":
            case "pie":
                return React.createElement(Pie, { data: chartData, options: commonOptions });
            default:
                return React.createElement("p", { className: "error-text" }, "Unsupported chart type");
        }
    };
    return (React.createElement("main", { className: "main-content" }, !showPlots ? (React.createElement("div", { className: "table-selection" },
        React.createElement("h3", null, "Select Tables"),
        tables.length === 0 ? (React.createElement("p", { className: "empty-message" }, "No tables available.")) : (React.createElement("ul", { className: "table-list" }, tables.map(function (table) { return (React.createElement("li", { key: table },
            React.createElement("label", null,
                React.createElement("input", { type: "checkbox", checked: selectedTables.includes(table), onChange: function () { return handleTableSelection(table); } }),
                table))); }))),
        React.createElement("div", { className: "button-container" },
            React.createElement("button", { onClick: fetchPlotData, disabled: loading || selectedTables.length === 0, className: "fetch-button ".concat(loading ? "loading" : "") }, loading ? "Loading..." : "Get Plot")))) : (React.createElement("div", { className: "charts-grid" }, plotData.length === 0 && !loading ? (React.createElement("p", { className: "empty-message" }, "No data available for selected tables.")) : (plotData.map(function (plot, index) { return (React.createElement("div", { key: index, className: "chart-card" },
        React.createElement("h3", { className: "chart-title" }, plot.plot_name || plot.plot_type),
        React.createElement("div", { className: "chart-content" }, renderChart(plot)))); }))))));
};
export default PlotContainer;
