import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ type = "default", className }) => {
  if (type === "sidebar") {
    return (
      <div className={cn("space-y-3 p-4", className)}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse flex-1" />
          </div>
        ))}
      </div>
    );
  }
  
  if (type === "editor") {
    return (
      <div className={cn("space-y-6 p-6", className)}>
        <div className="space-y-2">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
          <div className="flex space-x-2">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-16" />
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-20" />
          </div>
        </div>
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-4/5" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-4 p-6", className)}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-card p-4 space-y-3">
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3" />
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-4/5" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-24" />
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;