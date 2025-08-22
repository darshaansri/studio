"use client";

import React, { useState, useMemo } from 'react';
import { Camera, TrendingUp, Target, Book, CheckCircle, Info, Leaf, Carrot } from 'lucide-react';
import type { Measurement, RoutineItem, Goal } from '@/lib/types';

import DashboardTab from '@/components/dashboard-tab';
import ProgressTab from '@/components/progress-tab';
import RoutineTab from '@/components/routine-tab';
import GoalsTab from '@/components/goals-tab';
import TipsTab from '@/components/tips-tab';
import { StrandPlanIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function StrandPlanApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [measurements, setMeasurements] = useState<Measurement[]>([
    { id: 1, date: '2024-07-01', length: 6.5, notes: 'Starting measurement' },
    { id: 2, date: '2024-08-01', length: 6.8, notes: 'Slight growth visible' }
  ]);
  
  const [routine, setRoutine] = useState<RoutineItem[]>([
    { id: 1, task: 'Scalp massage', frequency: 'Daily', completed: true },
    { id: 2, task: 'Hair mask treatment', frequency: 'Weekly', completed: false },
    { id: 3, task: 'Biotin supplement', frequency: 'Daily', completed: true },
    { id: 4, task: 'Protective styling', frequency: 'As needed', completed: false }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, description: 'Reach 10 inches by December', target: 10, current: 6.8, deadline: '2024-12-31' },
    { id: 2, description: 'Reduce breakage by 50%', target: 50, current: 20, deadline: '2024-10-31' }
  ]);

  const addMeasurement = (length: number, notes: string) => {
    const newMeasurement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      length,
      notes
    };
    const newMeasurements = [...measurements, newMeasurement].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setMeasurements(newMeasurements);
    // Update goal progress
    setGoals(goals.map(g => g.description.includes("inches") ? { ...g, current: length } : g));
  };

  const addRoutineItem = (task: string, frequency: RoutineItem['frequency']) => {
    const newItem: RoutineItem = {
      id: Date.now(),
      task,
      frequency,
      completed: false
    };
    setRoutine([...routine, newItem]);
  };

  const toggleRoutineItem = (id: number) => {
    setRoutine(routine.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteRoutineItem = (id: number) => {
    setRoutine(routine.filter(item => item.id !== id));
  };

  const { currentLength, growthRate } = useMemo(() => {
    if (measurements.length === 0) return { currentLength: 0, growthRate: '0.00' };
    const sortedMeasurements = [...measurements].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const currentLength = sortedMeasurements[sortedMeasurements.length - 1].length;
    
    let growthRate = '0.00';
    if (sortedMeasurements.length > 1) {
      const firstMeasurement = sortedMeasurements[0];
      const lastMeasurement = sortedMeasurements[sortedMeasurements.length - 1];
      const timeDiff = new Date(lastMeasurement.date).getTime() - new Date(firstMeasurement.date).getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      const monthsDiff = daysDiff / 30.44; // Average days in a month
      const lengthDiff = lastMeasurement.length - firstMeasurement.length;
      if (monthsDiff > 0) {
        growthRate = (lengthDiff / monthsDiff).toFixed(2);
      }
    }
    
    return { currentLength, growthRate };
  }, [measurements]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'progress', label: 'Progress', icon: Camera },
    { id: 'routine', label: 'Routine', icon: CheckCircle },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'tips', label: 'Tips', icon: Book },
    { id: 'remedies', label: 'Remedies', icon: Leaf },
    { id: 'foods', label: 'Foods', icon: Carrot },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab measurements={measurements} routine={routine} />;
      case 'progress':
        return <ProgressTab measurements={measurements} addMeasurement={addMeasurement} />;
      case 'routine':
        return <RoutineTab routine={routine} addRoutineItem={addRoutineItem} toggleRoutineItem={toggleRoutineItem} deleteRoutineItem={deleteRoutineItem} />;
      case 'goals':
        return <GoalsTab goals={goals} />;
      case 'tips':
        return <TipsTab measurements={measurements} routine={routine} />;
      case 'remedies':
        // This will be handled by navigation, but as a fallback:
        window.location.href = '/remedies';
        return null;
      case 'foods':
        // This will be handled by navigation, but as a fallback:
        window.location.href = '/foods';
        return null;
      default:
        return null;
    }
  };
  
  const handleTabClick = (tabId: string) => {
    if (tabId === 'remedies') {
      window.location.href = '/remedies';
    } else if (tabId === 'foods') {
      window.location.href = '/foods';
    } else {
      setActiveTab(tabId);
    }
  }


  return (
    <div className="min-h-screen bg-background font-body flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-card shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[90vh] max-h-[800px]">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground font-headline">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <StrandPlanIcon className="w-8 h-8 text-primary-foreground" />
              <h1 className="text-3xl font-bold">StrandPlan</h1>
            </div>
          </div>
          <div className="flex items-center justify-around gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{currentLength}"</div>
              <div className="text-sm opacity-80">Current Length</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{growthRate}"</div>
              <div className="text-sm opacity-80 flex items-center gap-1">
                Growth/Month
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className='font-body'>
                      <p>Avg. monthly growth since your first measurement.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 overflow-y-auto">
          {renderContent()}
        </main>

        {/* Tab Navigation */}
        <nav className="flex justify-around p-2 bg-card/80 backdrop-blur-sm border-t mt-auto">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center h-auto py-2 px-3 rounded-xl transition-all duration-300 w-1/7
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-bold' 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              <tab.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
