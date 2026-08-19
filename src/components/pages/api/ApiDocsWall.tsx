import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  apiDocAuth,
  apiDocEndpoints,
  type ApiDocEndpoint,
  type ApiDocField,
} from "@/content/api-hero-data";

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function fieldValue(field: ApiDocField) {
  if (field.kind === "string") return `"${field.value}"`;
  return field.value;
}

function DocsJson({ fields, live }: { fields: readonly ApiDocField[]; live: boolean }) {
  return (
    <ol className="apidoc-json" aria-hidden>
      <li>
        <span className="apidoc-ln">1</span>
        <span className="apidoc-code">
          <span className="apidoc-p">{"{"}</span>
        </span>
      </li>
      {fields.map((field, index) => (
        <li key={field.key}>
          <span className="apidoc-ln">{index + 2}</span>
          <span className="apidoc-code">
            <span className="apidoc-k">"{field.key}"</span>
            <span className="apidoc-p">: </span>
            <span className={`apidoc-v apidoc-v-${field.kind}`}>{fieldValue(field)}</span>
            {index < fields.length - 1 ? <span className="apidoc-p">,</span> : null}
            {live && index === fields.length - 1 ? <span className="apidoc-cursor" /> : null}
          </span>
        </li>
      ))}
      <li>
        <span className="apidoc-ln">{fields.length + 2}</span>
        <span className="apidoc-code">
          <span className="apidoc-p">{"}"}</span>
        </span>
      </li>
    </ol>
  );
}

function EndpointPane({ endpoint, live }: { endpoint: ApiDocEndpoint; live: boolean }) {
  return (
    <div className="apidoc-pane">
      <div className="apidoc-request">
        <span className="apidoc-method" data-method={endpoint.method}>
          {endpoint.method}
        </span>
        <code className="apidoc-path">{endpoint.path}</code>
        <span className="apidoc-keychip">
          {apiDocAuth.scheme} {apiDocAuth.key}
        </span>
      </div>

      <dl className="apidoc-params">
        {endpoint.params.map((param) => (
          <div key={param.name}>
            <dt>{param.name}</dt>
            <dd className="lc-mono">{param.value}</dd>
          </div>
        ))}
      </dl>

      <div className="apidoc-response">
        <header className="apidoc-response-head">
          <span>Response</span>
          <span className="apidoc-ok">
            <i />
            {apiDocAuth.status} OK
          </span>
        </header>
        <DocsJson fields={endpoint.fields} live={live} />
      </div>
    </div>
  );
}

export function ApiDocsWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const active = useCycle(apiDocEndpoints.length, 2800, inView);
  const endpoint = apiDocEndpoints[active] ?? apiDocEndpoints[0]!;

  return (
    <div ref={ref} className="bh-wall apidoc-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="apidoc-room">
        <header className="apidoc-head">
          <div className="apidoc-head-copy">
            <p className="apidoc-kicker">
              <BookOpen className="size-3" strokeWidth={2} />
              API docs
            </p>
            <p className="apidoc-product">{endpoint.product}</p>
          </div>
          <div className="apidoc-head-meta">
            <span className="apidoc-status">{apiDocAuth.status}</span>
            <span className="apidoc-live">
              <span className="apidoc-live-dot" aria-hidden />
              Live
            </span>
          </div>
        </header>

        <div className="apidoc-body">
          <nav className="apidoc-nav" aria-label="API endpoints">
            {apiDocEndpoints.map((item, index) => (
              <span
                key={item.id}
                className="apidoc-nav-item"
                data-active={active === index ? "true" : "false"}
                data-method={item.method}
              >
                <span className="apidoc-nav-method">{item.method}</span>
                <span className="apidoc-nav-label">{item.product.replace(" API", "")}</span>
              </span>
            ))}
          </nav>

          <EndpointPane endpoint={endpoint} live={inView} />
        </div>

        <footer className="apidoc-foot">
          <span className="lc-mono">{endpoint.latency}</span>
          <span>{apiDocAuth.contentType}</span>
          <span>signed</span>
        </footer>
      </div>

      <p className="sr-only">
        SeatsBrokers API documentation console. {endpoint.method} {endpoint.path} returns status{" "}
        {apiDocAuth.status} in {endpoint.latency} with {apiDocAuth.scheme} authentication. Active
        product {endpoint.product}.
      </p>
    </div>
  );
}
