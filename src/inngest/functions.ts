import { inngest } from "./client";
import prisma from "@/lib/db"; // Make sure to import prisma

export const helloWorld = inngest.createFunction(
  {id: "hello-world"},
   { event: "test/hello.world"},     
  async ({ event, step }) => {
    // Fetching the video
    await step.sleep("fetching", "5s");

    // Transcribing
    await step.sleep("trancribing", "5s");

    // Sending transcription to AI
    await step.sleep("sending-to-ai", "5s");

    await step.run("create-workflow", async () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest",
        },
      });
    });

    return { message: `Hello ${event.data.email}!` };
  }
);