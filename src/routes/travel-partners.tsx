import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/travel-partners")({
  beforeLoad: () => {
    throw redirect({ to: "/products/seatsdeal", replace: true });
  },
  component: () => null,
});
