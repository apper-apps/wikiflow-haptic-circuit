import { useState, useEffect } from "react";
import { pagesService } from "@/services/api/pagesService";

export const usePages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadPages();
  }, []);

  const createPage = async (pageData) => {
    try {
      const newPage = await pagesService.create(pageData);
      setPages(prev => [...prev, newPage]);
      return newPage;
    } catch (err) {
      throw new Error(err.message || "Failed to create page");
    }
  };

  const updatePage = async (id, pageData) => {
    try {
      const updatedPage = await pagesService.update(id, pageData);
      setPages(prev => prev.map(p => p.Id === parseInt(id) ? updatedPage : p));
      return updatedPage;
    } catch (err) {
      throw new Error(err.message || "Failed to update page");
    }
  };

  const deletePage = async (id) => {
    try {
      await pagesService.delete(id);
      setPages(prev => prev.filter(p => p.Id !== parseInt(id)));
    } catch (err) {
      throw new Error(err.message || "Failed to delete page");
    }
  };

  const publishPage = async (id) => {
    try {
      const publishedPage = await pagesService.publish(id);
      setPages(prev => prev.map(p => p.Id === parseInt(id) ? publishedPage : p));
      return publishedPage;
    } catch (err) {
      throw new Error(err.message || "Failed to publish page");
    }
  };

  const searchPages = async (query) => {
    try {
      setLoading(true);
      setError("");
      const results = await pagesService.search(query);
      return results;
    } catch (err) {
      setError(err.message || "Failed to search pages");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    pages,
    loading,
    error,
    loadPages,
    createPage,
    updatePage,
    deletePage,
    publishPage,
    searchPages
  };
};