import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import AdminLayout from "@/components/organisms/AdminLayout";
import Dashboard from "@/components/pages/Dashboard";
import PageViewer from "@/components/pages/PageViewer";
import PageEditor from "@/components/pages/PageEditor";
import SearchPage from "@/components/pages/SearchPage";
import CategoriesPage from "@/components/pages/CategoriesPage";
import SettingsPage from "@/components/pages/SettingsPage";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <AdminLayout>
<Routes>
          {/* Admin CMS Routes */}
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/pages" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/pages/new" element={<AdminLayout><PageEditor /></AdminLayout>} />
          <Route path="/admin/pages/:id" element={<AdminLayout><PageViewer /></AdminLayout>} />
          <Route path="/admin/pages/:id/edit" element={<AdminLayout><PageEditor /></AdminLayout>} />
          <Route path="/admin/search" element={<AdminLayout><SearchPage /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><CategoriesPage /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />
        </Routes>
      ) : (
        /* Public Wiki Routes */
        <Routes>
          <Route path="/" element={<PageViewer />} />
          <Route path="/page/:slug" element={<PageViewer />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PageViewer />} />
        <Route path="/page/:slug" element={<PageViewer />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;