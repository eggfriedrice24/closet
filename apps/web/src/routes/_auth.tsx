import { HangerIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FieldDescription } from "@workspace/ui/components/field";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Outlet />
            <div className="bg-muted relative hidden flex-col items-center justify-center gap-4 md:flex">
              <HugeiconsIcon icon={HangerIcon} className="text-primary size-24" strokeWidth={1.5} />
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                  Closet
                </p>
                <p className="text-muted-foreground/60 max-w-72 text-center text-xs">
                  if your wife spends 45 minutes every morning staring at her closet, this one's for
                  you
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
