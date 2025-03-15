"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type FarmType = "Indoor" | "Outdoor" | "Greenhouse" | "Vertical";

type AddFarmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (farmData: {
    name: string;
    location: string;
    type: FarmType;
    description: string;
    area: string;
    plants: string[];
  }) => void;
};

export default function AddFarmModal({ isOpen, onClose, onSubmit }: AddFarmModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Indoor" as FarmType,
    description: "",
    area: "",
    plants: [] as string[],
  });
  
  const [plantInput, setPlantInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlant = () => {
    if (plantInput.trim()) {
      setFormData(prev => ({
        ...prev,
        plants: [...prev.plants, plantInput.trim()]
      }));
      setPlantInput("");
    }
  };

  const handleRemovePlant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      plants: prev.plants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      location: "",
      type: "Indoor" as FarmType,
      description: "",
      area: "",
      plants: [],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 relative">
              {/* Custom scrollbar container */}
              <div className="scrollbar-container overflow-y-auto max-h-[90vh]">
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Farm</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Farm Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="Enter farm name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Farm Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      >
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Greenhouse">Greenhouse</option>
                        <option value="Vertical">Vertical</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Area (sq.ft)
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="e.g. 120 sq.ft"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      placeholder="Describe your farm setup..."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Plants
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={plantInput}
                        onChange={(e) => setPlantInput(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="Add a plant (e.g., Tomatoes)"
                      />
                      <button
                        type="button"
                        onClick={handleAddPlant}
                        className="px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
                      >
                        Add
                      </button>
                    </div>
                    
                    {formData.plants.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.plants.map((plant, index) => (
                          <div key={index} className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center gap-1 transition-all hover:shadow-sm">
                            <span className="text-green-800 dark:text-green-300">{plant}</span>
                            <button
                              type="button"
                              onClick={() => handleRemovePlant(index)}
                              className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm flex-1"
                    >
                      Add Farm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Add custom scrollbar styles */}
          <style jsx global>{`
            .scrollbar-container::-webkit-scrollbar {
              width: 8px;
            }
            
            .scrollbar-container::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.05);
              border-radius: 10px;
            }
            
            .scrollbar-container::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.2);
              border-radius: 10px;
            }
            
            .scrollbar-container::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.3);
            }
            
            /* For Firefox */
            .scrollbar-container {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
            }
            
            @media (prefers-color-scheme: dark) {
              .scrollbar-container::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
              }
              
              .scrollbar-container::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
              }
              
              .scrollbar-container::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
              
              .scrollbar-container {
                scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
} 