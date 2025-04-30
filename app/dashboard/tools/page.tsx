"use client";

import { useState } from "react";
import Link from "next/link";
import { tools, getToolsByCategory, Tool } from "@/app/lib/tools";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function ToolsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getToolsByCategory();
  
  // Filter tools based on search query
  const filteredTools = searchQuery 
    ? tools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  // Category names for display
  const categoryNames = {
    scan: "Scanning Tools",
    analyze: "Analysis Tools",
    protect: "Protection Tools",
    monitor: "Monitoring Tools"
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 rounded-lg shadow-md p-6 text-black mb-8"
      >
        <h1 className="text-2xl font-bold">Security Tools</h1>
        <p className="mt-1">Comprehensive security toolkit to protect your digital assets</p>
        
        {/* Search bar */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-700" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-yellow-400/20 rounded-md bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* When searching, show a flat list of results */}
      {searchQuery ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-yellow-400">No tools found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      ) : (
        // When not searching, group by category
        <div className="space-y-8">
          {Object.entries(categories).map(([category, toolsInCategory]) => (
            toolsInCategory.length > 0 && (
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-semibold text-yellow-400 border-b border-yellow-400/20 pb-2">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toolsInCategory.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

interface ToolCardProps {
  tool: Tool;
  index: number;
}

function ToolCard({ tool, index }: ToolCardProps) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-black border border-yellow-400/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full bg-black/30 ${tool.color}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">{tool.name}</h3>
        <p className="text-sm text-yellow-400/70 mb-4">{tool.description}</p>
        <Link href={`/dashboard/tools/${tool.id}`} passHref>
          <Button className="w-full bg-black text-yellow-400 border border-yellow-400/50 hover:bg-yellow-900/20">
            Launch Tool
          </Button>
        </Link>
      </div>
    </motion.div>
  );
} 