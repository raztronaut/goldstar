'use client';

import { useState } from 'react';
import { Person, SortBy, SortOrder } from '@/types';

interface StarTableProps {
  people: Person[];
  onAddStar: (personId: string, reason?: string) => void;
  onRemoveStar: (personId: string, reason?: string) => void;
  onRemovePerson: (personId: string) => void;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSort: (sortBy: SortBy) => void;
}

export function StarTable({
  people,
  onAddStar,
  onRemoveStar,
  onRemovePerson,
  sortBy,
  sortOrder,
  onSort,
}: StarTableProps) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [actionType, setActionType] = useState<'add' | 'remove'>('add');

  const handleStarAction = (personId: string, action: 'add' | 'remove') => {
    setSelectedPerson(personId);
    setActionType(action);
    setShowReasonModal(true);
  };

  const confirmAction = () => {
    if (!selectedPerson) return;

    if (actionType === 'add') {
      onAddStar(selectedPerson, reason.trim() || undefined);
    } else {
      onRemoveStar(selectedPerson, reason.trim() || undefined);
    }

    setShowReasonModal(false);
    setSelectedPerson(null);
    setReason('');
  };

  const getSortIcon = (column: SortBy) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (count: number) => {
    return '⭐'.repeat(Math.min(count, 10)) + (count > 10 ? ` +${count - 10}` : '');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <span className="text-sm">{getSortIcon('name')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => onSort('stars')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stars</span>
                  <span className="text-sm">{getSortIcon('stars')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => onSort('dateAdded')}
              >
                <div className="flex items-center space-x-1">
                  <span>Added</span>
                  <span className="text-sm">{getSortIcon('dateAdded')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => onSort('lastStarDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Star</span>
                  <span className="text-sm">{getSortIcon('lastStarDate')}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
            {people.map((person, index) => (
              <tr 
                key={person.id}
                className={`hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                  index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {person.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{renderStars(person.stars)}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {person.stars}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(person.dateAdded)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(person.lastStarDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleStarAction(person.id, 'add')}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      + Star
                    </button>
                    <button
                      onClick={() => handleStarAction(person.id, 'remove')}
                      disabled={person.stars <= 0}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                    >
                      - Star
                    </button>
                    <button
                      onClick={() => onRemovePerson(person.id)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {people.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600">
              <div className="text-4xl mb-4">⭐</div>
              <p className="text-lg font-medium">No people added yet</p>
              <p className="text-sm">Add someone to start tracking gold stars!</p>
            </div>
          </div>
        )}
      </div>

      {/* Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {actionType === 'add' ? 'Add Gold Star' : 'Remove Gold Star'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {selectedPerson && people.find(p => p.id === selectedPerson)?.name}
            </p>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason (optional)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="What did they do to earn/lose this star?"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReasonModal(false);
                  setSelectedPerson(null);
                  setReason('');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  actionType === 'add'
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                }`}
              >
                {actionType === 'add' ? 'Add Star' : 'Remove Star'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
