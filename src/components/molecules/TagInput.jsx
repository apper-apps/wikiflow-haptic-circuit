import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";

const TagInput = ({ 
  tags = [], 
  onTagsChange, 
  suggestions = [],
  placeholder = "Add tags...",
  className 
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );
  
  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(inputValue.trim());
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent min-h-[2.5rem]">
        {tags.map((tag) => (
          <Badge key={tag} variant="primary" className="flex items-center space-x-1">
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 hover:bg-white/20 rounded-full p-0.5"
            >
              <ApperIcon name="X" className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] border-none p-0 focus:ring-0"
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-dropdown max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleAddTag(suggestion)}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;