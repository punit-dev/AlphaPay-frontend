import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "./screens/ErrorScreen";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    const confirmUpdate = confirm("New version available. Reload now?");
    if (confirmUpdate) {
      updateSW(true);
    }
  },
});

function ErrorFallback({ error, resetErrorBoundary }) {
  return <ErrorScreen error={error?.message} onRetry={resetErrorBoundary} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      fallback={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ErrorBoundary>
  </StrictMode>,
);
