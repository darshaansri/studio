"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Carrot } from "lucide-react";
import { StrandPlanIcon } from "@/components/icons";

const foods = [
  {
    title: "Eggs",
    description: "A great source of protein and biotin, two nutrients that are essential for hair growth. Protein is the building block of hair, and biotin helps produce keratin, a key hair protein.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Berries",
    description: "Loaded with beneficial compounds and vitamins like Vitamin C that may promote hair growth. Vitamin C has strong antioxidant properties and helps produce collagen.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Spinach",
    description: "This healthy green vegetable is loaded with beneficial nutrients like folate, iron, and vitamins A and C, all of which are important for hair growth.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Fatty Fish",
    description: "Fish like salmon, herring, and mackerel are great sources of omega-3 fatty acids, which have been linked to improved hair growth and density.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Sweet Potatoes",
    description: "A great source of beta-carotene. The body converts this compound into vitamin A, which is linked to good hair health.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Avocados",
    description: "Delicious, nutritious, and a great source of healthy fats. They are also an excellent source of vitamin E, which may promote hair growth.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  },
   {
    title: "Nuts & Seeds",
    description: "Packed with nutrients like vitamin E, B vitamins, zinc, and essential fatty acids, all of which may promote hair growth.",
    icon: <Carrot className="w-6 h-6 text-orange-500" />
  }
]

export default function FoodsPage() {
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
              <h1 className="text-3xl font-bold">Hair Growth Foods</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 overflow-y-auto space-y-4">
            <p className="text-sm text-muted-foreground text-center">Eating a nutritious diet is one of the most important factors for healthy hair. Here are some of the best foods for hair growth.</p>
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
