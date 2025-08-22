"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { RoutineItem } from '@/lib/types';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"


const formSchema = z.object({
  task: z.string().min(3, "Task must be at least 3 characters.").max(50, "Task is too long."),
  frequency: z.enum(['Daily', 'Weekly', 'Monthly', 'As needed']),
})

interface RoutineTabProps {
  routine: RoutineItem[];
  addRoutineItem: (task: string, frequency: RoutineItem['frequency']) => void;
  toggleRoutineItem: (id: number) => void;
  deleteRoutineItem: (id: number) => void;
}

export default function RoutineTab({ routine, addRoutineItem, toggleRoutineItem, deleteRoutineItem }: RoutineTabProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      frequency: 'Daily',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addRoutineItem(values.task, values.frequency as RoutineItem['frequency']);
    form.reset();
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Scalp massage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-transform hover:scale-105">
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold font-headline text-lg">Your Routine</h3>
        {routine.length > 0 ? routine.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleRoutineItem(item.id)}
                  aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  className="transition-colors text-primary hover:text-accent"
                >
                  {item.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6 text-muted-foreground/50" />}
                </button>
                <div>
                  <p className={cn("font-medium", item.completed ? 'line-through text-muted-foreground' : 'text-foreground')}>
                    {item.task}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.frequency}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteRoutineItem(item.id)}
                aria-label="Delete task"
                className="text-destructive/70 hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        )) : (
          <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one to start your routine!</p>
        )}
      </div>
    </div>
  );
}
