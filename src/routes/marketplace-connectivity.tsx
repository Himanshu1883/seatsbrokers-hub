import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace-connectivity")({
  beforeLoad: () => {
    throw redirect({ to: "/products/seatsmarket", replace: true });
  },
  component: () => null,
});
