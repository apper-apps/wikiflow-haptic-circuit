import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import BlockEditor from "@/components/organisms/BlockEditor";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { pagesService } from "@/services/api/pagesService";

const PageViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPage();
  }, [id]);

  const loadPage = async () => {
    try {
      setLoading(true);
      setError("");
      const pageData = await pagesService.getById(id);
      setPage(pageData);
    } catch (err) {
      setError(err.message || "Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="editor" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPage} />;
  }

  if (!page) {
    return <Error message="Page not found" />;
  }

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: page.title }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Breadcrumb items={breadcrumbs} className="mb-4" />
        
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge variant={page.status === "published" ? "published" : "draft"}>
                {page.status}
              </Badge>
              <span className="text-sm text-gray-500">
                {page.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {page.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Avatar
                  fallback={page.author.split(" ").map(n => n[0]).join("")}
                  size="sm"
                />
                <span>By {page.author}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span>Updated {format(new Date(page.updatedAt), "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>
          
<div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={() => navigate(`/admin/pages/${id}/edit`)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Edit" className="w-4 h-4" />
              <span>Edit</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Share" className="w-4 h-4" />
              <span>Share</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Tags */}
        {page.tags && page.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {page.tags.map(tag => (
              <Link
                key={tag}
                to={`/search?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full hover:from-primary/20 hover:to-secondary/20 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <BlockEditor
            content={page.content}
            readOnly={true}
          />
        </div>
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 pt-8 border-t border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ThumbsUp" className="w-4 h-4" />
              <span>Helpful</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="MessageCircle" className="w-4 h-4" />
              <span>Comment</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="History" className="w-4 h-4" />
              <span>Version History</span>
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            Last updated by {page.author} on {format(new Date(page.updatedAt), "MMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PageViewer;