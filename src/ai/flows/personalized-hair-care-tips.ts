// src/ai/flows/personalized-hair-care-tips.ts
'use server';
/**
 * @fileOverview Provides personalized hair care tips based on user's measurements and routine.
 *
 * - personalizedHairCareTips - A function to generate personalized hair care tips.
 * - PersonalizedHairCareTipsInput - The input type for personalizedHairCareTips function.
 * - PersonalizedHairCareTipsOutput - The return type for personalizedHairCareTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHairCareTipsInputSchema = z.object({
  measurements: z.array(
    z.object({
      date: z.string().describe('Date of the measurement (YYYY-MM-DD).'),
      length: z.number().describe('Hair length in inches.'),
      notes: z.string().optional().describe('Optional notes for the measurement.'),
    })
  ).describe('Array of historical hair measurements.'),
  routine: z.array(
    z.object({
      task: z.string().describe('Description of the routine task.'),
      frequency: z.string().describe('Frequency of the task (e.g., Daily, Weekly).'),
      completed: z.boolean().describe('Whether the task was completed.'),
    })
  ).describe('Array of user-defined hair care routine tasks.'),
});

export type PersonalizedHairCareTipsInput = z.infer<typeof PersonalizedHairCareTipsInputSchema>;

const PersonalizedHairCareTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('Array of personalized hair care tips.'),
});

export type PersonalizedHairCareTipsOutput = z.infer<typeof PersonalizedHairCareTipsOutputSchema>;

export async function personalizedHairCareTips(input: PersonalizedHairCareTipsInput): Promise<PersonalizedHairCareTipsOutput> {
  return personalizedHairCareTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHairCareTipsPrompt',
  input: {schema: PersonalizedHairCareTipsInputSchema},
  output: {schema: PersonalizedHairCareTipsOutputSchema},
  prompt: `Given the user's hair measurements and routine, provide personalized tips to optimize their hair growth journey.

Hair Measurements:
{{#each measurements}}
  - Date: {{date}}, Length: {{length}} inches, Notes: {{notes}}
{{/each}}

Hair Care Routine:
{{#each routine}}
  - Task: {{task}}, Frequency: {{frequency}}, Completed: {{completed}}
{{/each}}

Consider the following:
* Provide specific and actionable tips.
* Tailor tips based on the user's routine and measurements.
* Suggest adjustments to the routine based on the data.
* Focus on optimizing hair growth and health.

Output the tips in an array of strings.
`, 
});

const personalizedHairCareTipsFlow = ai.defineFlow(
  {
    name: 'personalizedHairCareTipsFlow',
    inputSchema: PersonalizedHairCareTipsInputSchema,
    outputSchema: PersonalizedHairCareTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
