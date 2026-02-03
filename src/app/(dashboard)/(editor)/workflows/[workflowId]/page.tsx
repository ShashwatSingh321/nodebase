import { Editor, EditorError, EditorLoading } from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header"; // Added this import
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowId } = await params;
  
  // Make sure to await your prefetch if it's an async operation
  await prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          {/* Header sits outside the main content area */}
          <EditorHeader workflowId={workflowId} />
          
          {/* Main wrapper for layout control */}
          <main className="flex-1 flex flex-col h-full">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;