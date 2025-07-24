import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { pagesService } from "@/services/api/pagesService";

const Dashboard = () => {
  const [recentPages, setRecentPages] = useState([]);
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    categoriesCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      const pages = await pagesService.getAll();
      
      // Sort by updated date and take first 6
      const sortedPages = pages
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6);
      
      setRecentPages(sortedPages);
      
      // Calculate stats
      const categories = [...new Set(pages.map(p => p.category).filter(Boolean))];
      setStats({
        totalPages: pages.length,
        publishedPages: pages.filter(p => p.status === "published").length,
        draftPages: pages.filter(p => p.status === "draft").length,
        categoriesCount: categories.length
      });
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Welcome to WikiFlow
        </h1>
        <p className="text-gray-600">
          Manage your company's knowledge base with ease
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Pages</p>
                <p className="text-2xl font-bold gradient-text">{stats.totalPages}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="FileText" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Published</p>
                <p className="text-2xl font-bold text-success">{stats.publishedPages}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-success to-green-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Drafts</p>
                <p className="text-2xl font-bold text-warning">{stats.draftPages}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-warning to-yellow-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Edit" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Categories</p>
                <p className="text-2xl font-bold text-info">{stats.categoriesCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-info to-blue-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="FolderOpen" className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="flex items-center space-x-2">
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>New Page</span>
            </Button>
            <Button variant="secondary" className="flex items-center space-x-2">
              <ApperIcon name="Search" className="w-4 h-4" />
              <span>Search Pages</span>
            </Button>
            <Button variant="secondary" className="flex items-center space-x-2">
              <ApperIcon name="FolderOpen" className="w-4 h-4" />
              <span>Browse Categories</span>
            </Button>
            <Button variant="secondary" className="flex items-center space-x-2">
              <ApperIcon name="Upload" className="w-4 h-4" />
              <span>Import Content</span>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Recent Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Pages</h2>
          <Link
            to="/search"
            className="text-primary hover:text-secondary transition-colors text-sm font-medium"
          >
            View All Pages →
          </Link>
        </div>

        {recentPages.length === 0 ? (
          <Empty
            title="No pages yet"
            description="Create your first page to get started with your knowledge base"
            icon="FileText"
            actionText="Create Page"
            onAction={() => console.log("Create page")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPages.map((page, index) => (
              <motion.div
                key={page.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card hover className="p-6 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="FileText" className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <Badge variant={page.status === "published" ? "published" : "draft"}>
                        {page.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(page.updatedAt), "MMM d")}
                    </span>
                  </div>
                  
                  <Link
                    to={`/page/${page.Id}`}
                    className="block group"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {page.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {page.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {page.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {page.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{page.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;