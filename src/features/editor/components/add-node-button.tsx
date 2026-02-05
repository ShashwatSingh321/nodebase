"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react"; // Added useState
import { Button } from "@/components/ui/button";
import { NodeSelector } from "@/components/node-selector";

export const AddNodeButton = memo(() => {
  // State to control the visibility of the NodeSelector
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <NodeSelector 
      open={selectorOpen} 
      onOpenChange={setSelectorOpen}
    >
      <Button
        onClick={() => setSelectorOpen(true)} // Typically you want the button to trigger it open
        size="icon"
        variant="outline"
        className="bg-background"
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";