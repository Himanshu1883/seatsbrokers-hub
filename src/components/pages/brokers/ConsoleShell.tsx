import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ConsoleShellProps = {
  path: string;
  status?: string;
  icon: LucideIcon;
  children: ReactNode;
};

export function ConsoleShell({
  path,
  status = "Live",
  icon: Icon,
  children,
}: ConsoleShellProps) {
  return (
    <div className="lc-frame">
      <div className="lc-bezel">
        <div className="lc-screen">
          <span className="lc-grid" aria-hidden />
          <span className="lc-glare" aria-hidden />
          <span className="lc-scan" aria-hidden />
          <header className="two-track-chrome">
            <span className="two-track-chrome-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="two-track-chrome-path">
              <Icon className="size-3.5" strokeWidth={1.75} />
              {path}
            </span>
            <span className="two-track-chrome-badge">
              <span className="two-track-chrome-pulse" />
              {status}
            </span>
          </header>
          <div className="lc-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
