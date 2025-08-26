export interface Person {
  id: string;
  name: string;
  stars: number;
  dateAdded: Date;
  lastStarDate?: Date;
}

export interface StarAction {
  id: string;
  personId: string;
  action: 'add' | 'remove';
  timestamp: Date;
  reason?: string;
}

export type SortBy = 'name' | 'stars' | 'dateAdded' | 'lastStarDate';
export type SortOrder = 'asc' | 'desc';
