// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://70012b8a1fd0c89bd0ebdec8f045f255@o4510754323365889.ingest.de.sentry.io/4510754396504144",
  integrations: [
  // Add the Vercel AI SDK integration to sentry.server.config.ts
  Sentry.vercelAIIntegration({
    recordInputs: true,
    recordOutputs: true,
  }),
    Sentry.consoleLoggingIntegration({levels: ["log", "warn", "error"]}),
  
],

  // Tracing must be enabled for agent monitoring to work
  tracesSampleRate: 1.0,
    enableLogs: true,

  // Add data like inputs and responses to/from LLMs and tools;
  // see https://docs.sentry.io/platforms/javascript/data-management/data-collected/ for more info
  sendDefaultPii: true,
    debug: true,

});
