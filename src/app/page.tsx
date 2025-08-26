'use client';

import { useStarData } from '@/hooks/useStarData';
import { StarTable } from '@/components/star-table';
import { AddPersonForm } from '@/components/add-person-form';
import { StarStats } from '@/components/star-stats';

export default function Home() {
  const {
    people,
    actions,
    addPerson,
    removePerson,
    addStar,
    removeStar,
    sortBy,
    sortOrder,
    updateSort,
  } = useStarData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🌟 Gold Star Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track and celebrate achievements with gold stars
          </p>
        </div>

        {/* Stats */}
        <StarStats people={people} actions={actions} />

        {/* Add Person Form */}
        <div className="mb-6">
          <AddPersonForm onAddPerson={addPerson} />
        </div>

        {/* People Table */}
        <div className="mb-8">
          <StarTable
            people={people}
            onAddStar={addStar}
            onRemoveStar={removeStar}
            onRemovePerson={removePerson}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={updateSort}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Data is automatically saved to your browser&apos;s local storage</p>
        </div>
      </div>
    </main>
  );
}
