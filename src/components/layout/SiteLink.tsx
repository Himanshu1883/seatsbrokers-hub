import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type SiteLinkProps = {
  to: string;
  hash?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & Omit<ComponentProps<"a">, "href" | "children">;

export function SiteLink({ to, hash, className, children, onClick, ...rest }: SiteLinkProps) {
  if (hash) {
    return (
      <Link
        to={to}
        hash={hash}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
