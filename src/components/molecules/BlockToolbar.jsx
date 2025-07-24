import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const BlockToolbar = ({ 
  onAddBlock, 
  className,
  blockTypes = [
    { type: "text", icon: "Type", label: "Text" },
    { type: "heading", icon: "Heading1", label: "Heading" },
    { type: "list", icon: "List", label: "List" },
    { type: "code", icon: "Code", label: "Code" },
    { type: "table", icon: "Table", label: "Table" }
  ]
}) => {
  return (
    <div className={cn("flex items-center space-x-2 p-2 bg-white border rounded-lg shadow-dropdown", className)}>
      {blockTypes.map((blockType) => (
        <Button
          key={blockType.type}
          variant="ghost"
          size="sm"
          onClick={() => onAddBlock(blockType.type)}
          className="flex items-center space-x-1"
        >
          <ApperIcon name={blockType.icon} className="w-4 h-4" />
          <span className="hidden sm:inline">{blockType.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default BlockToolbar;