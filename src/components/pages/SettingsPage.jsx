import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "WikiFlow",
    siteDescription: "Internal Company Knowledge Base",
    defaultCategory: "General",
    autoSave: true,
    emailNotifications: true,
    allowComments: true
  });

  const [users] = useState([
    {
      Id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "admin",
      avatar: null,
      lastActive: "2024-01-23T10:30:00Z"
    },
    {
      Id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      role: "editor",
      avatar: null,
      lastActive: "2024-01-23T09:15:00Z"
    },
    {
      Id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "viewer",
      avatar: null,
      lastActive: "2024-01-22T16:45:00Z"
    }
  ]);

  const tabs = [
    { id: "general", label: "General", icon: "Settings" },
    { id: "users", label: "Users & Roles", icon: "Users" },
    { id: "categories", label: "Categories", icon: "FolderOpen" },
    { id: "integrations", label: "Integrations", icon: "Plug" }
  ];

  const handleSaveSettings = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "admin":
        return "error";
      case "editor":
        return "primary";
      case "viewer":
        return "secondary";
      default:
        return "default";
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              placeholder="Enter site name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <Input
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              placeholder="Enter site description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Category
            </label>
            <select
              value={settings.defaultCategory}
              onChange={(e) => setSettings({...settings, defaultCategory: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="General">General</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
            </select>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Editor Settings</h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Enable auto-save</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Email notifications for page updates</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.allowComments}
              onChange={(e) => setSettings({...settings, allowComments: e.target.checked})}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Allow comments on published pages</span>
          </label>
        </div>
      </Card>
    </div>
  );

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <Button>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>
        
        <div className="space-y-4">
          {users.map(user => (
            <div key={user.Id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar
                  fallback={user.name.split(" ").map(n => n[0]).join("")}
                  size="md"
                />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 font-medium text-gray-900">Permission</th>
                <th className="text-center py-2 px-4 font-medium text-gray-900">Viewer</th>
                <th className="text-center py-2 px-4 font-medium text-gray-900">Editor</th>
                <th className="text-center py-2 px-4 font-medium text-gray-900">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-700">View pages</td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-700">Create pages</td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="X" className="w-4 h-4 text-error mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-700">Publish pages</td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="X" className="w-4 h-4 text-error mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-700">Manage users</td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="X" className="w-4 h-4 text-error mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="X" className="w-4 h-4 text-error mx-auto" />
                </td>
                <td className="py-2 px-4 text-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-success mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCategoriesSettings = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>
      
      <div className="space-y-3">
        {["HR", "Engineering", "Marketing", "IT", "Operations", "Finance"].map(category => (
          <div key={category} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="FolderOpen" className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">{category}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ApperIcon name="Edit" className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
        
        <div className="space-y-4">
          {[
            { name: "Slack", description: "Get notifications in Slack when pages are updated", icon: "MessageCircle", connected: true },
            { name: "Microsoft Teams", description: "Share pages and collaborate in Teams", icon: "Users", connected: false },
            { name: "Google Drive", description: "Import documents from Google Drive", icon: "Upload", connected: false },
            { name: "Notion", description: "Import existing Notion pages", icon: "FileText", connected: false }
          ].map(integration => (
            <div key={integration.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name={integration.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{integration.name}</p>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
              
              <Button variant={integration.connected ? "secondary" : "primary"}>
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "users":
        return renderUsersSettings();
      case "categories":
        return renderCategoriesSettings();
      case "integrations":
        return renderIntegrationsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your WikiFlow configuration and preferences
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-64 flex-shrink-0"
        >
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          {renderTabContent()}
          
          {(activeTab === "general") && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSaveSettings}>
                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;