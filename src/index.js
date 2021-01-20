import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SearchProvider } from "../src/Context/SearchContext";
import { PaginationProvider } from "../src/Context/PaginationContext";

ReactDOM.render(
  <React.StrictMode>
    <PaginationProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </PaginationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
