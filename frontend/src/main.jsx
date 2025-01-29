import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";
import ScrollToTop from "./ScrollToTop.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <App />
        <ToastContainer position="top-center" toastClassName="custom-toast" />
      </HashRouter>
    </Provider>
  </StrictMode>
);
