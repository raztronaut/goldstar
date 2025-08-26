'use client';

import { useState, useEffect, useCallback } from 'react';
import { Person, StarAction, SortBy, SortOrder } from '@/types';

const STORAGE_KEY = 'star-tracker-data';

interface StarData {
  people: Person[];
  actions: StarAction[];
}

export function useStarData() {
  const [data, setData] = useState<StarData>({ people: [], actions: [] });
  const [sortBy, setSortBy] = useState<SortBy>('stars');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        // Convert date strings back to Date objects
        const processedData: StarData = {
          people: parsedData.people.map((person: Person & { dateAdded: string; lastStarDate?: string }) => ({
            ...person,
            dateAdded: new Date(person.dateAdded),
            lastStarDate: person.lastStarDate ? new Date(person.lastStarDate) : undefined,
          })),
          actions: parsedData.actions.map((action: StarAction & { timestamp: string }) => ({
            ...action,
            timestamp: new Date(action.timestamp),
          })),
        };
        setData(processedData);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }, [data]);

  const addPerson = useCallback((name: string) => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name: name.trim(),
      stars: 0,
      dateAdded: new Date(),
    };

    setData(prev => ({
      ...prev,
      people: [...prev.people, newPerson],
    }));

    return newPerson.id;
  }, []);

  const removePerson = useCallback((personId: string) => {
    setData(prev => ({
      people: prev.people.filter(person => person.id !== personId),
      actions: prev.actions.filter(action => action.personId !== personId),
    }));
  }, []);

  const addStar = useCallback((personId: string, reason?: string) => {
    const action: StarAction = {
      id: crypto.randomUUID(),
      personId,
      action: 'add',
      timestamp: new Date(),
      reason,
    };

    setData(prev => ({
      people: prev.people.map(person =>
        person.id === personId
          ? { ...person, stars: person.stars + 1, lastStarDate: new Date() }
          : person
      ),
      actions: [...prev.actions, action],
    }));
  }, []);

  const removeStar = useCallback((personId: string, reason?: string) => {
    setData(prev => {
      const person = prev.people.find(p => p.id === personId);
      if (!person || person.stars <= 0) return prev;

      const action: StarAction = {
        id: crypto.randomUUID(),
        personId,
        action: 'remove',
        timestamp: new Date(),
        reason,
      };

      return {
        people: prev.people.map(p =>
          p.id === personId
            ? { ...p, stars: p.stars - 1, lastStarDate: new Date() }
            : p
        ),
        actions: [...prev.actions, action],
      };
    });
  }, []);

  const getSortedPeople = useCallback(() => {
    const sorted = [...data.people].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'stars':
          aValue = a.stars;
          bValue = b.stars;
          break;
        case 'dateAdded':
          aValue = a.dateAdded.getTime();
          bValue = b.dateAdded.getTime();
          break;
        case 'lastStarDate':
          aValue = a.lastStarDate?.getTime() || 0;
          bValue = b.lastStarDate?.getTime() || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data.people, sortBy, sortOrder]);

  const updateSort = useCallback((newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  }, [sortBy]);

  return {
    people: getSortedPeople(),
    actions: data.actions,
    addPerson,
    removePerson,
    addStar,
    removeStar,
    sortBy,
    sortOrder,
    updateSort,
  };
}
