"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { Measurement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

const formSchema = z.object({
  length: z.coerce.number({invalid_type_error: "Please enter a number."}).positive("Length must be a positive number."),
  notes: z.string().max(100, "Notes are too long.").optional(),
})

interface ProgressTabProps {
  measurements: Measurement[];
  addMeasurement: (length: number, notes: string) => void;
}

export default function ProgressTab({ measurements, addMeasurement }: ProgressTabProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: undefined,
      notes: "",
    },
  });
  
  const sortedMeasurements = [...measurements].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function onSubmit(values: z.infer<typeof formSchema>) {
    addMeasurement(values.length, values.notes || '');
    form.reset();
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">Add New Measurement</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length in inches</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="e.g., 7.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Post-trim" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-transform hover:scale-105">
                <Plus className="mr-2 h-4 w-4" /> Add Measurement
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold font-headline text-lg">Measurement History</h3>
        {sortedMeasurements.length > 0 ? (
          sortedMeasurements.map((m) => (
            <Card key={m.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-foreground">{m.length}"</p>
                  <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString()}</p>
                </div>
                {m.notes && <p className="text-sm text-muted-foreground italic text-right">"{m.notes}"</p>}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No history yet. Add your first measurement!</p>
        )}
      </div>
    </div>
  );
}
