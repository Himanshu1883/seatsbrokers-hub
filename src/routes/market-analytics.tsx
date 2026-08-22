import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/market-analytics")({
  beforeLoad: () => {
    throw redirect({ to: "/products/seatspulse", replace: true });
  },
  component: () => null,
});
