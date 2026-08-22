import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/event-intelligence")({
  beforeLoad: () => {
    throw redirect({ to: "/products/seatsintel", replace: true });
  },
  component: () => null,
});
