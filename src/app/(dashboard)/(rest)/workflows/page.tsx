import { Suspense } from "react";
// Replace these paths with the actual locations in your project
import { ErrorBoundary } from "react-error-boundary"; 
import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows"; 

import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";

const Page = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowsContainer>
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;