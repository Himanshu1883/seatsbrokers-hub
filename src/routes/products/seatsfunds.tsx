import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/products/seatsfunds")({
  beforeLoad: () => {
    throw redirect({ to: "/products/seatspay", replace: true });
  },
  component: () => null,
});
