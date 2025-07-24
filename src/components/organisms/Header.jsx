import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Breadcrumb from "@/components/molecules/Breadcrumb";

const Header = ({ 
  onMenuClick, 
  breadcrumbs = [],
  showBreadcrumbs = true,
  className 
}) => {
  const currentUser = {
    name: "John Doe",
    email: "john@company.com",
    role: "editor"
  };
  
  return (
    <header className={cn("bg-white border-b border-gray-200 px-4 lg:px-6 py-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb items={breadcrumbs} />
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Avatar
              fallback={currentUser.name.split(" ").map(n => n[0]).join("")}
              size="md"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;