'use client';

import { useState } from 'react';

interface AddPersonFormProps {
  onAddPerson: (name: string) => void;
}

export function AddPersonForm({ onAddPerson }: AddPersonFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      onAddPerson(name.trim());
      setName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Add New Person
      </h2>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="person-name" className="sr-only">
            Person's name
          </label>
          <input
            type="text"
            id="person-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter person's name..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white"
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          disabled={!name.trim() || isSubmitting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add Person'}
        </button>
      </form>
      
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Add someone to your gold star tracking list
      </p>
    </div>
  );
}
