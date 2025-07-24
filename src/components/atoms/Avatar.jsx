import React from "react";
import { cn } from "@/utils/cn";

const Avatar = ({ 
  src, 
  alt, 
  size = "md", 
  fallback,
  className 
}) => {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
    xl: "w-12 h-12 text-lg"
  };
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
      />
    );
  }
  
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-medium",
        sizes[size],
        className
      )}
    >
      {fallback}
    </div>
  );
};

export default Avatar;