import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Breadcrumb = ({ items, className }) => {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-gray-600", className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.id || index}>
          {index > 0 && (
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.title}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;