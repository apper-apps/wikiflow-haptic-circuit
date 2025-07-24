import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import BlockToolbar from "@/components/molecules/BlockToolbar";

const BlockEditor = ({ 
  content = [], 
  onChange,
  readOnly = false,
  className 
}) => {
  const [blocks, setBlocks] = useState(content);
  const [activeBlock, setActiveBlock] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  
  useEffect(() => {
    setBlocks(content);
  }, [content]);
  
  useEffect(() => {
    if (onChange) {
      onChange(blocks);
    }
  }, [blocks, onChange]);
  
  const addBlock = (type, index = null) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      order: index !== null ? index : blocks.length
    };
    
    const newBlocks = [...blocks];
    if (index !== null) {
      newBlocks.splice(index, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    
    setBlocks(newBlocks);
    setActiveBlock(newBlock.id);
    setShowToolbar(false);
  };
  
  const updateBlock = (blockId, newContent) => {
    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { ...block, content: newContent }
        : block
    ));
  };
  
  const deleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };
  
  const getDefaultContent = (type) => {
    switch (type) {
      case "heading":
        return { text: "Heading", level: 1 };
      case "text":
        return { text: "" };
      case "list":
        return { items: [""], ordered: false };
      case "code":
        return { code: "", language: "javascript" };
      case "table":
        return { 
          headers: ["Column 1", "Column 2"], 
          rows: [["", ""]] 
        };
      default:
        return { text: "" };
    }
  };
  
  const renderBlock = (block) => {
    const isActive = activeBlock === block.id;
    
    switch (block.type) {
      case "heading":
        return (
          <HeadingBlock
            key={block.id}
            block={block}
            isActive={isActive}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            readOnly={readOnly}
          />
        );
      case "text":
        return (
          <TextBlock
            key={block.id}
            block={block}
            isActive={isActive}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            readOnly={readOnly}
          />
        );
      case "list":
        return (
          <ListBlock
            key={block.id}
            block={block}
            isActive={isActive}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            readOnly={readOnly}
          />
        );
      case "code":
        return (
          <CodeBlock
            key={block.id}
            block={block}
            isActive={isActive}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            readOnly={readOnly}
          />
        );
      case "table":
        return (
          <TableBlock
            key={block.id}
            block={block}
            isActive={isActive}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            readOnly={readOnly}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <AnimatePresence>
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="editor-block"
            onClick={() => !readOnly && setActiveBlock(block.id)}
          >
            {!readOnly && (
              <div className="block-handle">
                <ApperIcon name="GripVertical" className="w-4 h-4 text-gray-400" />
              </div>
            )}
            {renderBlock(block)}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {!readOnly && (
        <div className="pt-4">
          {showToolbar ? (
            <BlockToolbar
              onAddBlock={addBlock}
              className="mb-4"
            />
          ) : (
            <Button
              variant="ghost"
              onClick={() => setShowToolbar(true)}
              className="flex items-center space-x-2 text-gray-500 hover:text-primary"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Block</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Block Components
const HeadingBlock = ({ block, isActive, onUpdate, onDelete, readOnly }) => {
  const handleTextChange = (e) => {
    onUpdate(block.id, { ...block.content, text: e.target.value });
  };
  
  const HeadingComponent = `h${block.content.level}`;
  
  if (readOnly) {
    return React.createElement(
      HeadingComponent,
      { className: "text-2xl font-bold text-gray-900 mb-2" },
      block.content.text
    );
  }
  
  return (
    <div className={cn("group", isActive && "ring-2 ring-primary rounded-lg p-2")}>
      <Input
        value={block.content.text}
        onChange={handleTextChange}
        className="text-2xl font-bold border-none p-0 focus:ring-0"
        placeholder="Heading"
      />
      {isActive && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map(level => (
              <Button
                key={level}
                variant={block.content.level === level ? "primary" : "ghost"}
                size="sm"
                onClick={() => onUpdate(block.id, { ...block.content, level })}
              >
                H{level}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(block.id)}>
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const TextBlock = ({ block, isActive, onUpdate, onDelete, readOnly }) => {
  const handleTextChange = (e) => {
    onUpdate(block.id, { ...block.content, text: e.target.value });
  };
  
  if (readOnly) {
    return <p className="text-gray-700 leading-relaxed">{block.content.text}</p>;
  }
  
  return (
    <div className={cn("group", isActive && "ring-2 ring-primary rounded-lg p-2")}>
      <textarea
        value={block.content.text}
        onChange={handleTextChange}
        className="w-full border-none p-0 resize-none focus:ring-0 focus:outline-none"
        placeholder="Start typing..."
        rows={3}
      />
      {isActive && (
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" onClick={() => onDelete(block.id)}>
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const ListBlock = ({ block, isActive, onUpdate, onDelete, readOnly }) => {
  const addItem = () => {
    const newItems = [...block.content.items, ""];
    onUpdate(block.id, { ...block.content, items: newItems });
  };
  
  const updateItem = (index, value) => {
    const newItems = [...block.content.items];
    newItems[index] = value;
    onUpdate(block.id, { ...block.content, items: newItems });
  };
  
  const removeItem = (index) => {
    const newItems = block.content.items.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block.content, items: newItems });
  };
  
  if (readOnly) {
    const ListComponent = block.content.ordered ? "ol" : "ul";
    return (
      <ListComponent className={cn("space-y-1", block.content.ordered ? "list-decimal list-inside" : "list-disc list-inside")}>
        {block.content.items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ListComponent>
    );
  }
  
  return (
    <div className={cn("group", isActive && "ring-2 ring-primary rounded-lg p-2")}>
      <div className="space-y-2">
        {block.content.items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-gray-400 w-4">
              {block.content.ordered ? `${index + 1}.` : "•"}
            </span>
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 border-none p-0 focus:ring-0"
              placeholder="List item"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(index)}
              className="opacity-0 group-hover:opacity-100"
            >
              <ApperIcon name="X" className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
      
      {isActive && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={addItem}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
              Add Item
            </Button>
            <Button
              variant={block.content.ordered ? "primary" : "ghost"}
              size="sm"
              onClick={() => onUpdate(block.id, { ...block.content, ordered: !block.content.ordered })}
            >
              {block.content.ordered ? "Numbered" : "Bulleted"}
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(block.id)}>
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const CodeBlock = ({ block, isActive, onUpdate, onDelete, readOnly }) => {
  const handleCodeChange = (e) => {
    onUpdate(block.id, { ...block.content, code: e.target.value });
  };
  
  if (readOnly) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
        <pre className="text-gray-100 whitespace-pre-wrap">{block.content.code}</pre>
      </div>
    );
  }
  
  return (
    <div className={cn("group", isActive && "ring-2 ring-primary rounded-lg p-2")}>
      <div className="bg-gray-900 rounded-lg p-4">
        <textarea
          value={block.content.code}
          onChange={handleCodeChange}
          className="w-full bg-transparent text-gray-100 font-mono text-sm border-none p-0 resize-none focus:ring-0 focus:outline-none"
          placeholder="Enter code..."
          rows={6}
        />
      </div>
      
      {isActive && (
        <div className="flex justify-between items-center mt-2">
          <select
            value={block.content.language}
            onChange={(e) => onUpdate(block.id, { ...block.content, language: e.target.value })}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
          </select>
          <Button variant="ghost" size="sm" onClick={() => onDelete(block.id)}>
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const TableBlock = ({ block, isActive, onUpdate, onDelete, readOnly }) => {
  const addRow = () => {
    const newRow = new Array(block.content.headers.length).fill("");
    const newRows = [...block.content.rows, newRow];
    onUpdate(block.id, { ...block.content, rows: newRows });
  };
  
  const addColumn = () => {
    const newHeaders = [...block.content.headers, "New Column"];
    const newRows = block.content.rows.map(row => [...row, ""]);
    onUpdate(block.id, { ...block.content, headers: newHeaders, rows: newRows });
  };
  
  const updateCell = (rowIndex, colIndex, value) => {
    const newRows = [...block.content.rows];
    newRows[rowIndex][colIndex] = value;
    onUpdate(block.id, { ...block.content, rows: newRows });
  };
  
  const updateHeader = (index, value) => {
    const newHeaders = [...block.content.headers];
    newHeaders[index] = value;
    onUpdate(block.id, { ...block.content, headers: newHeaders });
  };
  
  if (readOnly) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {block.content.headers.map((header, index) => (
                <th key={index} className="px-4 py-2 text-left font-medium text-gray-900 border-b border-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.content.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  return (
    <div className={cn("group", isActive && "ring-2 ring-primary rounded-lg p-2")}>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {block.content.headers.map((header, index) => (
                <th key={index} className="px-2 py-2 border-b border-gray-200">
                  <Input
                    value={header}
                    onChange={(e) => updateHeader(index, e.target.value)}
                    className="font-medium border-none p-1 focus:ring-0"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.content.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-2 py-2">
                    <Input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="border-none p-1 focus:ring-0"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isActive && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={addRow}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
              Add Row
            </Button>
            <Button variant="ghost" size="sm" onClick={addColumn}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
              Add Column
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(block.id)}>
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlockEditor;