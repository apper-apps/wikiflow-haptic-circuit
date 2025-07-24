import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import TagInput from "@/components/molecules/TagInput";
import BlockEditor from "@/components/organisms/BlockEditor";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { pagesService } from "@/services/api/pagesService";
import { useAutoSave } from "@/hooks/useAutoSave";

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPage = id === "new";
  
  const [page, setPage] = useState({
    title: "",
    content: [],
    parentId: null,
    status: "draft",
    author: "Current User",
    tags: [],
    category: ""
  });
  
  const [loading, setLoading] = useState(!isNewPage);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const availableTags = ["handbook", "hr", "onboarding", "development", "coding", "standards", "api", "documentation", "backend", "marketing", "sop", "procedures", "security", "policies", "it"];
  const availableCategories = ["HR", "Engineering", "Marketing", "IT", "Operations", "Finance"];

  useEffect(() => {
    if (!isNewPage) {
      loadPage();
    }
  }, [id, isNewPage]);

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

  const savePage = async (pageData = page) => {
    try {
      setSaving(true);
      let savedPage;
      
      if (isNewPage) {
        savedPage = await pagesService.create(pageData);
        navigate(`/page/${savedPage.Id}/edit`, { replace: true });
      } else {
        savedPage = await pagesService.update(id, pageData);
      }
      
      setPage(savedPage);
      return savedPage;
    } catch (err) {
      throw new Error(err.message || "Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  // Auto-save functionality
  useAutoSave(page, savePage, 3000);

  const handleSave = async () => {
    try {
      await savePage();
      toast.success("Page saved successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      
      if (isNewPage) {
        const savedPage = await savePage({ ...page, status: "published" });
        navigate(`/page/${savedPage.Id}`, { replace: true });
      } else {
        const publishedPage = await pagesService.publish(id);
        setPage(publishedPage);
        navigate(`/page/${id}`);
      }
      
      toast.success("Page published successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to publish page");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this page?")) {
      return;
    }
    
    try {
      await pagesService.delete(id);
      toast.success("Page deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to delete page");
    }
  };

  if (loading) {
    return <Loading type="editor" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPage} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <Badge variant={page.status === "published" ? "published" : "draft"}>
              {page.status}
            </Badge>
            {saving && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={handleSave} disabled={saving}>
            <ApperIcon name="Save" className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button onClick={handlePublish} disabled={saving}>
            <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
            {page.status === "published" ? "Update" : "Publish"}
          </Button>
          
          {!isNewPage && (
            <Button variant="danger" onClick={handleDelete}>
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          )}
        </div>
      </motion.div>

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Input
          value={page.title}
          onChange={(e) => setPage({ ...page, title: e.target.value })}
          placeholder="Page title..."
          className="text-3xl font-bold border-none p-0 focus:ring-0 bg-transparent"
        />
      </motion.div>

      {/* Page Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={page.category}
            onChange={(e) => setPage({ ...page, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select category...</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <TagInput
            tags={page.tags}
            onTagsChange={(tags) => setPage({ ...page, tags })}
            suggestions={availableTags}
            placeholder="Add tags..."
          />
        </div>
      </motion.div>

      {/* Content Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <BlockEditor
          content={page.content}
          onChange={(content) => setPage({ ...page, content })}
        />
      </motion.div>
    </div>
  );
};

export default PageEditor;