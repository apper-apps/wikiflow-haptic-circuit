import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { pagesService } from "@/services/api/pagesService";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
    tag: searchParams.get("tag") || ""
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const availableCategories = ["HR", "Engineering", "Marketing", "IT", "Operations", "Finance"];
  const availableStatuses = ["published", "draft"];

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [pages, filters, searchQuery]);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (filters.category) params.set("category", filters.category);
    if (filters.status) params.set("status", filters.status);
    if (filters.tag) params.set("tag", filters.tag);
    setSearchParams(params);
  }, [searchQuery, filters, setSearchParams]);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await pagesService.getAll();
      setPages(data);
    } catch (err) {
      setError(err.message || "Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...pages];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query) ||
        page.tags.some(tag => tag.toLowerCase().includes(query)) ||
        page.author.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(page => page.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(page => page.status === filters.status);
    }

    // Apply tag filter
    if (filters.tag) {
      filtered = filtered.filter(page => page.tags.includes(filters.tag));
    }

    // Sort by updated date (most recent first)
    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    setFilteredPages(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setFilters({ category: "", status: "", tag: "" });
    setSearchQuery("");
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const allTags = [...new Set(pages.flatMap(page => page.tags))].sort();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPages} />;
  }

  const hasActiveFilters = searchQuery || filters.category || filters.status || filters.tag;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Search Pages
        </h1>
        <p className="text-gray-600">
          Find the information you need across all pages and documentation
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <SearchBar
          placeholder="Search pages, tags, categories..."
          onSearch={handleSearch}
          className="max-w-2xl"
        />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <ApperIcon name="X" className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {availableCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {availableStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <select
                value={filters.tag}
                onChange={(e) => updateFilter("tag", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Results ({filteredPages.length})
          </h2>
          
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="updated">Sort by Updated</option>
              <option value="created">Sort by Created</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        {filteredPages.length === 0 ? (
          <Empty
            title={hasActiveFilters ? "No results found" : "No pages yet"}
            description={hasActiveFilters ? "Try adjusting your search criteria or filters" : "Create your first page to get started"}
            icon="Search"
            actionText={hasActiveFilters ? "Clear Filters" : "Create Page"}
            onAction={hasActiveFilters ? clearFilters : () => console.log("Create page")}
          />
        ) : (
          <div className="space-y-4">
            {filteredPages.map((page, index) => (
              <motion.div
                key={page.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <ApperIcon name="FileText" className="w-4 h-4 text-gray-400" />
                        <Badge variant={page.status === "published" ? "published" : "draft"}>
                          {page.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {page.category}
                        </span>
                      </div>
                      
                      <Link
                        to={`/page/${page.Id}`}
                        className="block group"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {page.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>By {page.author}</span>
                          <span>Updated {format(new Date(page.updatedAt), "MMM d, yyyy")}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {page.tags.slice(0, 3).map(tag => (
                            <button
                              key={tag}
                              onClick={() => updateFilter("tag", tag)}
                              className="px-2 py-1 text-xs bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full hover:from-primary/20 hover:to-secondary/20 transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                          {page.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                              +{page.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link to={`/page/${page.Id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                      </Button>
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

export default SearchPage;