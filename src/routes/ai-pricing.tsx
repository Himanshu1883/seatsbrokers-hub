import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/products/seatspulse", replace: true });
  },
  component: () => null,
});
