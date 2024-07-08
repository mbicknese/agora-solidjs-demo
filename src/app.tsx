import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Agora streaming demo</Title>
          <link rel="stylesheet" href="https://unpkg.com/open-props" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/open-props/normalize.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/open-props/buttons.min.css"
          />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
