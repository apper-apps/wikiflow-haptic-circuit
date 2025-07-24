import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import PageViewer from "@/components/pages/PageViewer";
import PageEditor from "@/components/pages/PageEditor";
import SearchPage from "@/components/pages/SearchPage";
import CategoriesPage from "@/components/pages/CategoriesPage";
import SettingsPage from "@/components/pages/SettingsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/page/new" element={<PageEditor />} />
            <Route path="/page/:id" element={<PageViewer />} />
            <Route path="/page/:id/edit" element={<PageEditor />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
        
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