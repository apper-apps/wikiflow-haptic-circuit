import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  title = "No content yet", 
  description = "Get started by creating your first item",
  icon = "FileText",
  actionText = "Create New",
  onAction,
  className 
}) => {
  return (
    <Card className={cn("p-12 text-center max-w-lg mx-auto", className)}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        
        {onAction && (
          <Button onClick={onAction} size="lg" className="mt-4">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionText}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Empty;