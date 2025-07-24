import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  className 
}) => {
  return (
    <Card className={cn("p-8 text-center max-w-md mx-auto", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="w-6 h-6 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button onClick={onRetry} className="mt-4">
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;