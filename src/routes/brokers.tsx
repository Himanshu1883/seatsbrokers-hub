import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/brokers")({
  beforeLoad: () => {
    throw redirect({ to: "/become-a-seller", replace: true });
  },
  component: () => null,
});
