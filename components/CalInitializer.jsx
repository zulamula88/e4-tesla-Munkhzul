"use client";

import { useEffect } from "react";

const CAL_NAMESPACE = "tesla-model-3";

export default function CalInitializer() {
  useEffect(() => {
    if (window.__teslaCalInitialized) return;

    (function initializeCal(C, A, L) {
      const queue = (api, args) => api.q.push(args);
      const document = C.document;

      C.Cal =
        C.Cal ||
        function calBootstrap() {
          const cal = C.Cal;
          const args = arguments;

          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            document.head.appendChild(document.createElement("script")).src = A;
            cal.loaded = true;
          }

          if (args[0] === L) {
            const api = function namespacedCal() {
              queue(api, arguments);
            };
            const namespace = args[1];
            api.q = api.q || [];

            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              queue(cal.ns[namespace], args);
              queue(cal, ["initNamespace", namespace]);
            } else {
              queue(cal, args);
            }
            return;
          }

          queue(cal, args);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;
    window.Cal.ns[CAL_NAMESPACE]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view"
    });
    window.__teslaCalInitialized = true;
  }, []);

  return null;
}
