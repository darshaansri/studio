import type { Goal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';


interface GoalsTabProps {
  goals: Goal[];
}

export default function GoalsTab({ goals }: GoalsTabProps) {
  return (
    <div className="space-y-4 animate-in fade-in-0 duration-500">
      <h3 className="font-semibold font-headline text-xl">Your Hair Goals</h3>
      {goals.length > 0 ? goals.map((goal) => {
        const progress = Math.min((goal.current / goal.target) * 100, 100);
        return (
          <Card key={goal.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <Award className="w-8 h-8 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-base font-semibold">{goal.description}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3 h-3"/>
                    Deadline: {new Date(goal.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">{goal.current}/{goal.target}</span>
              </div>
              <Progress value={progress} indicatorClassName="bg-gradient-to-r from-primary to-accent" />
            </CardContent>
          </Card>
        )
      }) : (
        <p className="text-sm text-muted-foreground text-center py-8">No goals set yet. What do you want to achieve?</p>
      )}
    </div>
  );
}

declare module "react" {
  interface ComponentProps<T> {
    indicatorClassName?: string
  }
}
