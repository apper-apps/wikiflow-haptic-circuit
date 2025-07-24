import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { pagesService } from "@/services/api/pagesService";

const CategoriesPage = () => {
  const [pages, setPages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await pagesService.getAll();
      setPages(data);
      
      // Group pages by category
      const categoryMap = {};
      data.forEach(page => {
        const category = page.category || "Uncategorized";
        if (!categoryMap[category]) {
          categoryMap[category] = {
            name: category,
            pages: [],
            totalPages: 0,
            publishedPages: 0,
            draftPages: 0
          };
        }
        categoryMap[category].pages.push(page);
        categoryMap[category].totalPages++;
        if (page.status === "published") {
          categoryMap[category].publishedPages++;
        } else {
          categoryMap[category].draftPages++;
        }
      });
      
      setCategories(Object.values(categoryMap));
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "HR": "Users",
      "Engineering": "Code",
      "Marketing": "Megaphone",
      "IT": "Server",
      "Operations": "Settings",
      "Finance": "DollarSign",
      "Uncategorized": "Folder"
    };
    return iconMap[categoryName] || "Folder";
  };

  const getCategoryColor = (categoryName) => {
    const colorMap = {
      "HR": "from-blue-500 to-blue-600",
      "Engineering": "from-green-500 to-green-600",
      "Marketing": "from-pink-500 to-pink-600",
      "IT": "from-purple-500 to-purple-600",
      "Operations": "from-orange-500 to-orange-600",
      "Finance": "from-yellow-500 to-yellow-600",
      "Uncategorized": "from-gray-500 to-gray-600"
    };
    return colorMap[categoryName] || "from-gray-500 to-gray-600";
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPages} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Categories
        </h1>
        <p className="text-gray-600">
          Browse pages organized by category
        </p>
      </motion.div>

      {categories.length === 0 ? (
        <Empty
          title="No categories yet"
          description="Create pages with categories to organize your content"
          icon="FolderOpen"
          actionText="Create Page"
          onAction={() => console.log("Create page")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(category.name)} rounded-lg flex items-center justify-center`}>
                    <ApperIcon name={getCategoryIcon(category.name)} className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold gradient-text">{category.totalPages}</p>
                    <p className="text-sm text-gray-500">pages</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Badge variant="published" size="sm">
                      {category.publishedPages}
                    </Badge>
                    <span className="text-xs text-gray-500">published</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Badge variant="draft" size="sm">
                      {category.draftPages}
                    </Badge>
                    <span className="text-xs text-gray-500">drafts</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {category.pages.slice(0, 3).map(page => (
                    <Link
                      key={page.Id}
                      to={`/page/${page.Id}`}
                      className="block text-sm text-gray-600 hover:text-primary transition-colors truncate"
                    >
                      • {page.title}
                    </Link>
                  ))}
                  {category.pages.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{category.pages.length - 3} more pages
                    </p>
                  )}
                </div>
                
                <Link
                  to={`/search?category=${encodeURIComponent(category.name)}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
                >
                  View All Pages
                  <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;