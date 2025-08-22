export interface Measurement {
  id: number;
  date: string; // YYYY-MM-DD
  length: number;
  notes?: string;
}

export interface RoutineItem {
  id: number;
  task: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'As needed';
  completed: boolean;
}

export interface Goal {
  id: number;
  description: string;
  target: number;
  current: number;
  deadline: string; // YYYY-MM-DD
}
