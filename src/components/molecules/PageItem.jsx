import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { format } from "date-fns";

const PageItem = ({ 
  page, 
  level = 0, 
  isActive = false,
  hasChildren = false,
  isExpanded = false,
  onToggle
}) => {
  const indentClass = level > 0 ? `ml-${level * 4}` : "";
  
  return (
    <div className="group">
      <div
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
          isActive && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium",
          indentClass
        )}
      >
        {hasChildren && (
          <button
            onClick={onToggle}
            className="mr-1 p-0.5 hover:bg-gray-200 rounded transition-colors"
          >
            <ApperIcon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              className="w-3 h-3 text-gray-400" 
            />
          </button>
        )}
        
        <ApperIcon 
          name="FileText" 
          className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" 
        />
        
        <Link
          to={`/page/${page.Id}`}
          className="flex-1 truncate hover:text-primary transition-colors"
        >
          {page.title}
        </Link>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge 
            variant={page.status === "published" ? "published" : "draft"} 
            size="sm"
          >
            {page.status}
          </Badge>
          <span className="text-xs text-gray-400">
            {format(new Date(page.updatedAt), "MMM d")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageItem;