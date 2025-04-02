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
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ScatterController, BarController, LineController, PieController, CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend, } from "chart.js";
import { Scatter, Bar, Line, Pie } from "react-chartjs-2";
ChartJS.register(ScatterController, BarController, LineController, PieController, CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend);
var PlotVisualizer = function (_a) {
    var apiUrl = _a.apiUrl, tables = _a.tables;
    var _b = useState([]), plotData = _b[0], setPlotData = _b[1];
    useEffect(function () {
        if (tables.length > 0) {
            fetchPlotData();
        }
    }, [tables]);
    var fetchPlotData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "?tables=").concat(tables.join(",")))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setPlotData(data.plotData);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching plot data:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var renderChart = function (plot) {
        var commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: plot.plot_type === "pie" || plot.plot_type === "doughnut" },
            },
        };
        var chartData = {
            labels: plot.data.x,
            datasets: [
                {
                    label: plot.plot_name || plot.plot_type,
                    data: plot.data.y,
                    backgroundColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#8BC34A", "#FF9800"
                    ],
                    borderColor: "#666",
                    borderWidth: 1,
                },
            ],
        };
        switch (plot.plot_type) {
            case "scatter":
                return React.createElement(Scatter, { data: chartData, options: commonOptions });
            case "bar":
            case "histogram":
                return React.createElement(Bar, { data: chartData, options: commonOptions });
            case "line":
                return React.createElement(Line, { data: chartData, options: commonOptions });
            case "pie":
            case "doughnut":
                return React.createElement(Pie, { data: chartData, options: commonOptions });
            default:
                return React.createElement("p", { className: "text-red-500" }, "Unsupported chart type");
        }
    };
    var chunkArray = function (array, size) {
        var chunkedArr = [];
        for (var i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };
    var plotRows = chunkArray(plotData, 3);
    return (React.createElement("div", { className: "p-4" }, plotRows.map(function (row, rowIndex) { return (React.createElement("div", { key: rowIndex, className: "flex flex-wrap mb-4" }, row.map(function (plot, plotIndex) { return (React.createElement("div", { key: plotIndex, className: "w-full md:w-1/3 p-2" },
        React.createElement("div", { className: "border p-4 rounded-lg shadow-md bg-white h-full" },
            React.createElement("h3", { className: "text-lg font-semibold mb-2 text-center" }, plot.plot_name || plot.plot_type),
            React.createElement("div", { className: "h-64" }, renderChart(plot))))); }))); })));
};
export default PlotVisualizer;
