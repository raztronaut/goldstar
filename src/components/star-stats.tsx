'use client';

import { Person, StarAction } from '@/types';

interface StarStatsProps {
  people: Person[];
  actions: StarAction[];
}

export function StarStats({ people, actions }: StarStatsProps) {
  const totalPeople = people.length;
  const totalStars = people.reduce((sum, person) => sum + person.stars, 0);
  const averageStars = totalPeople > 0 ? (totalStars / totalPeople).toFixed(1) : '0';
  
  const topPerformer = people.reduce((top, person) => 
    person.stars > (top?.stars || 0) ? person : top, null as Person | null
  );

  const recentActions = actions
    .filter(action => {
      const today = new Date();
      const actionDate = new Date(action.timestamp);
      const diffTime = Math.abs(today.getTime() - actionDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7; // Last 7 days
    })
    .length;

  const stats = [
    {
      label: 'Total People',
      value: totalPeople,
      icon: '👥',
      color: 'blue',
    },
    {
      label: 'Total Stars',
      value: totalStars,
      icon: '⭐',
      color: 'yellow',
    },
    {
      label: 'Average Stars',
      value: averageStars,
      icon: '📊',
      color: 'green',
    },
    {
      label: 'Actions This Week',
      value: recentActions,
      icon: '📈',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center">
            <div className={`flex-shrink-0 p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {topPerformer && (
        <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🏆 Top Performer
              </h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {topPerformer.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {topPerformer.stars} gold star{topPerformer.stars !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-6xl">
              {'⭐'.repeat(Math.min(topPerformer.stars, 3))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
