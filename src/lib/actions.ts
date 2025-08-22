'use server';

import { personalizedHairCareTips, PersonalizedHairCareTipsInput } from '@/ai/flows/personalized-hair-care-tips';
import type { Measurement, RoutineItem } from '@/lib/types';

export async function getPersonalizedAdvice(measurements: Measurement[], routine: RoutineItem[]) {
  try {
    const input: PersonalizedHairCareTipsInput = {
      measurements: measurements.map(m => ({ date: m.date, length: m.length, notes: m.notes || '' })),
      routine: routine.map(r => ({ task: r.task, frequency: r.frequency, completed: r.completed })),
    };
    const result = await personalizedHairCareTips(input);
    return { success: true, tips: result.tips };
  } catch (error) {
    console.error('Error getting personalized advice:', error);
    return { success: false, error: 'Failed to generate advice. Please try again later.' };
  }
}
