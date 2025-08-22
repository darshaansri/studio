"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun } from "lucide-react";
import { StrandPlanIcon } from "@/components/icons";

const foods = [
  {
    title: "Fatty Fish",
    description: "Rich in omega-3 fatty acids to keep skin thick, supple, and moisturized. They also reduce inflammation.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Avocados",
    description: "High in healthy fats and a good source of vitamin E, an important antioxidant that helps protect your skin from oxidative damage.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Walnuts",
    description: "A good source of essential fatty acids, zinc, vitamin E, and protein, all of which are nutrients your skin needs to stay healthy.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Sweet Potatoes",
    description: "An excellent source of beta carotene, which acts as a natural sunblock and may protect your skin from sun damage.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Bell Peppers",
    description: "Contain plenty of beta carotene and vitamin C — both of which are important antioxidants for your skin.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Broccoli",
    description: "A great source of vitamins, minerals, and carotenoids that are important for skin health. It also contains sulforaphane, which may help prevent skin cancer.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  },
   {
    title: "Tomatoes",
    description: "A great source of vitamin C and all of the major carotenoids, especially lycopene, which protect skin from sun damage.",
    icon: <Sun className="w-6 h-6 text-yellow-500" />
  }
]

export default function SkinPage() {
  return (
    <div className="min-h-screen bg-background font-body flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-card shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[90vh] max-h-[800px]">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground font-headline">
          <div className="flex items-center gap-4">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <StrandPlanIcon className="w-8 h-8 text-primary-foreground" />
              <h1 className="text-3xl font-bold">Glowing Skin Foods</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 overflow-y-auto space-y-4">
            <p className="text-sm text-muted-foreground text-center">What you eat can have a big impact on your skin health. Here are some of the best foods for keeping your skin healthy and glowing.</p>
            {foods.map((food, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            {food.icon}
                            <div>
                                <CardTitle className="text-base font-semibold">{food.title}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-foreground">{food.description}</p>
                    </CardContent>
                </Card>
            ))}
        </main>
      </div>
    </div>
  );
}
