import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import PageItem from "@/components/molecules/PageItem";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import { pagesService } from "@/services/api/pagesService";

const Sidebar = ({ isOpen, onClose, className }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPages, setExpandedPages] = useState(new Set());
  const location = useLocation();
  
  useEffect(() => {
    loadPages();
  }, []);
  
  const loadPages = async () => {
    try {
      setLoading(true);
      const data = await pagesService.getAll();
      setPages(data);
    } catch (error) {
      console.error("Failed to load pages:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const togglePageExpansion = (pageId) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(pageId)) {
      newExpanded.delete(pageId);
    } else {
      newExpanded.add(pageId);
    }
    setExpandedPages(newExpanded);
  };
  
  const buildPageTree = (pages, parentId = null, level = 0) => {
    return pages
      .filter(page => page.parentId === parentId)
      .map(page => {
        const hasChildren = pages.some(p => p.parentId === page.Id);
        const isActive = location.pathname === `/page/${page.Id}`;
        const isExpanded = expandedPages.has(page.Id);
        
        return (
          <div key={page.Id}>
            <PageItem
              page={page}
              level={level}
              isActive={isActive}
              hasChildren={hasChildren}
              isExpanded={isExpanded}
              onToggle={() => togglePageExpansion(page.Id)}
            />
            {hasChildren && isExpanded && (
              <div className="ml-4">
                {buildPageTree(pages, page.Id, level + 1)}
              </div>
            )}
          </div>
        );
      });
  };
  
  const handleSearch = (query) => {
    // Implement search functionality
    console.log("Searching for:", query);
  };
  
  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">WikiFlow</span>
          </Link>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <Button size="sm" className="w-full justify-start">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <Loading type="sidebar" />
          ) : (
            <div className="p-4 space-y-1">
              <nav className="space-y-1">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                    location.pathname === "/" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                  )}
                >
                  <ApperIcon name="Home" className="w-4 h-4 mr-3" />
                  Dashboard
                </Link>
                
                <Link
                  to="/search"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                    location.pathname === "/search" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                  )}
                >
                  <ApperIcon name="Search" className="w-4 h-4 mr-3" />
                  Search
                </Link>
                
                <Link
                  to="/categories"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                    location.pathname === "/categories" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                  )}
                >
                  <ApperIcon name="FolderOpen" className="w-4 h-4 mr-3" />
                  Categories
                </Link>
                
                <Link
                  to="/settings"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                    location.pathname === "/settings" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                  )}
                >
                  <ApperIcon name="Settings" className="w-4 h-4 mr-3" />
                  Settings
                </Link>
              </nav>
              
              <div className="pt-4">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Pages
                </h3>
                <div className="space-y-1">
                  {buildPageTree(pages)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3" onClick={onClose}>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">WikiFlow</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <Button size="sm" className="w-full justify-start" onClick={onClose}>
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                New Page
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <Loading type="sidebar" />
              ) : (
                <div className="p-4 space-y-1">
                  <nav className="space-y-1">
                    <Link
                      to="/"
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                        location.pathname === "/" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                      )}
                    >
                      <ApperIcon name="Home" className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/search"
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                        location.pathname === "/search" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                      )}
                    >
                      <ApperIcon name="Search" className="w-4 h-4 mr-3" />
                      Search
                    </Link>
                    
                    <Link
                      to="/categories"
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                        location.pathname === "/categories" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                      )}
                    >
                      <ApperIcon name="FolderOpen" className="w-4 h-4 mr-3" />
                      Categories
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5",
                        location.pathname === "/settings" && "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                      )}
                    >
                      <ApperIcon name="Settings" className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </nav>
                  
                  <div className="pt-4">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Pages
                    </h3>
                    <div className="space-y-1">
                      {buildPageTree(pages)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;