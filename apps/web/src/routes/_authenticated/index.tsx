import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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
      <div className="flex max-w-md min-w-0 flex-col gap-6 text-sm leading-loose">
        <div>
          <h1 className="text-2xl font-bold">Closet</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <div className="flex gap-3">
          <Button render={<Link to="/wardrobe" />}>My Wardrobe</Button>
          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              router.invalidate();
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
