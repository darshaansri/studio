import type { Measurement, RoutineItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Check, History } from 'lucide-react';

interface DashboardTabProps {
  measurements: Measurement[];
  routine: RoutineItem[];
}

export default function DashboardTab({ measurements, routine }: DashboardTabProps) {
  const completedTasks = routine.filter(item => item.completed).length;
  const recentMeasurements = [...measurements].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Measurements</CardTitle>
            <History className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-primary">{measurements.length}</div>
            <p className="text-xs text-primary/80">Total entries</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/20 border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-accent-dark">Tasks Done</CardTitle>
            <Check className="h-4 w-4 text-accent-dark" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-accent-dark">{completedTasks}/{routine.length}</div>
            <p className="text-xs text-accent-dark/80">Completed today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-headline">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            Recent Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentMeasurements.length > 0 ? (
            <div className="space-y-4">
              {recentMeasurements.map((m) => (
                <div key={m.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{m.length}"</p>
                    <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic truncate max-w-[150px]">"{m.notes}"</p>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-sm text-muted-foreground text-center py-4">No measurements yet. Add one in the 'Progress' tab!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
