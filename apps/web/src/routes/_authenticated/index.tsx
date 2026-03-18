import { createFileRoute, useRouter } from "@tanstack/react-router";
import { signOut } from "@workspace/api-client";
import { Button } from "@workspace/ui/components/button";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

function HomePage() {
  const router = useRouter();
  const { user } = Route.useRouteContext();

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Closet Command</h1>
          <p>Welcome, {user.name}!</p>
          <p>Your AI-powered wardrobe assistant.</p>
          <Button
            className="mt-2"
            variant="outline"
            onClick={async () => {
              await signOut();
              router.invalidate();
            }}
          >
            Sign Out
          </Button>
        </div>
        <div className="text-muted-foreground font-mono text-xs">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
