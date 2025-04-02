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
import React, { useState } from "react";
import axios from "axios";
import "./ConnectionPopup.css";
var ConnectionPopup = function (_a) {
    var setIsModalOpen = _a.setIsModalOpen, setConnectionStatus = _a.setConnectionStatus;
    var _b = useState(""), host = _b[0], setHost = _b[1];
    var _c = useState(""), username = _c[0], setUsername = _c[1];
    var _d = useState(""), password = _d[0], setPassword = _d[1];
    var _e = useState(""), database = _e[0], setDatabase = _e[1];
    var _f = useState(""), port = _f[0], setPort = _f[1];
    var _g = useState(false), loading = _g[0], setLoading = _g[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    payload = { host: host, user: username, password: password, database: database, port: port };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, axios.post("http://localhost:3001/database/connect", payload)];
                case 2:
                    response = _a.sent();
                    if (response.data.message === "Failed to connect to the database" || response.data.error) {
                        setConnectionStatus("Database Connection Failed");
                    }
                    else {
                        setConnectionStatus("Database Connected Successfully");
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error connecting to database:", error_1);
                    setConnectionStatus("Database Connection Failed");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    setIsModalOpen(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "modal-overlay" },
        React.createElement("div", { className: "modal-content" },
            React.createElement("h2", { className: "modal-title" }, "Connect Datasource"),
            React.createElement("p", { className: "modal-subtitle" }, "Stay connected and manage your tasks efficiently!"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("label", null, "Host"),
                React.createElement("input", { type: "text", placeholder: "doworks-db.c5xugf.us-east", value: host, onChange: function (e) { return setHost(e.target.value); }, required: true }),
                React.createElement("label", null, "Username"),
                React.createElement("input", { type: "text", placeholder: "Doworks", value: username, onChange: function (e) { return setUsername(e.target.value); }, required: true }),
                React.createElement("label", null, "Password"),
                React.createElement("input", { type: "password", placeholder: "Password", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true }),
                React.createElement("div", { className: "input-row" },
                    React.createElement("div", null,
                        React.createElement("label", null, "Database"),
                        React.createElement("input", { type: "text", placeholder: "Optional", value: database, onChange: function (e) { return setDatabase(e.target.value); } })),
                    React.createElement("div", null,
                        React.createElement("label", null, "Port"),
                        React.createElement("input", { type: "text", placeholder: "3306", value: port, onChange: function (e) { return setPort(e.target.value); }, required: true }))),
                React.createElement("div", { className: "button-container" },
                    React.createElement("button", { type: "button", className: "cancel-btn", onClick: function () { return setIsModalOpen(false); } }, "Cancel"),
                    React.createElement("button", { type: "submit", className: "connect-btn", disabled: loading }, loading ? "Connecting..." : "Connect"))))));
};
export default ConnectionPopup;
