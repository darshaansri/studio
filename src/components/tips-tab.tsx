'use client'

import React, { useState, useEffect } from 'react';
import type { Measurement, RoutineItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Pill, Scissors, Sparkles, Lightbulb, GlassWater, Heart } from 'lucide-react';
import { getPersonalizedAdvice } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

interface TipsTabProps {
  measurements: Measurement[];
  routine: RoutineItem[];
}

const staticTips = [
  {
    title: "Scalp Health",
    content: "Massage your scalp for 5-10 minutes daily to improve blood circulation and stimulate hair follicles.",
    icon: <Droplets className="w-5 h-5 text-primary" />,
    color: "primary"
  },
  {
    title: "Nutrition",
    content: "Include protein-rich foods, biotin, iron, and vitamins A, C, and E in your diet for optimal hair growth.",
    icon: <Pill className="w-5 h-5 text-green-500" />,
    color: "green-500"
  },
  {
    title: "Protective Care",
    content: "Minimize heat styling and use silk pillowcases to reduce friction and breakage.",
    icon: <Scissors className="w-5 h-5 text-accent" />,
    color: "accent"
  },
  {
    title: "Hydration",
    content: "Drink plenty of water to keep your hair and scalp hydrated from the inside out.",
    icon: <GlassWater className="w-5 h-5 text-blue-500" />,
    color: "blue-500"
  },
  {
    title: "Regular Trims",
    content: "Get regular trims every 6-8 weeks to remove split ends and prevent them from traveling up the hair shaft.",
    icon: <Scissors className="w-5 h-5 text-purple-500" />,
    color: "purple-500"
  },
  {
    title: "Stress Management",
    content: "High stress levels can contribute to hair loss. Practice relaxation techniques like yoga or meditation.",
    icon: <Heart className="w-5 h-5 text-red-500" />,
    color: "red-500"
  }
];

export default function TipsTab({ measurements, routine }: TipsTabProps) {
  const [aiTips, setAiTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    setLoading(true);
    setError(null);
    setAiTips([]);
    try {
      const result = await getPersonalizedAdvice(measurements, routine);
      if (result.success) {
        setAiTips(result.tips || []);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    } catch (e) {
      setError('Failed to fetch advice.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    handleGetAdvice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <Card className="bg-gradient-to-br from-accent/10 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-lg">
            <Sparkles className="w-5 h-5 text-accent" />
            Personalized AI Advice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && !error && aiTips.length > 0 && (
            <ul className="space-y-2 list-disc list-inside text-sm text-foreground">
              {aiTips.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          )}
          {!loading && !error && aiTips.length === 0 && !error && (
             <p className="text-sm text-muted-foreground text-center">Click the button to get your personalized tips!</p>
          )}

          <Button onClick={handleGetAdvice} disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
            {loading ? 'Generating...' : 'Refresh My Tips'}
          </Button>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="font-semibold font-headline text-lg mb-3">General Tips</h3>
        <div className="space-y-3">
          {staticTips.map((tip) => (
            <Card key={tip.title}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-${tip.color}/10`}>
                    {tip.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
