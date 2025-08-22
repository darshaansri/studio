"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf } from "lucide-react";
import { StrandPlanIcon } from "@/components/icons";

const remedies = [
  {
    title: "Onion Juice for Hair Growth",
    description: "Onion juice is rich in sulfur, which is known to boost collagen production, aiding in hair growth. Its antimicrobial properties also help keep the scalp healthy.",
    application: "Apply fresh onion juice to your scalp and leave it on for 15-30 minutes before washing it off with a mild shampoo.",
    icon: <Leaf className="w-6 h-6 text-green-600" />
  },
  {
    title: "Coconut Milk Hair Mask",
    description: "Coconut milk is packed with proteins, essential fats, and iron. It can reduce hair shedding and promote healthier growth.",
    application: "Apply coconut milk to your scalp and through your hair. Wrap with a towel and leave for 20-30 minutes, then rinse with cool water and a gentle shampoo.",
    icon: <Leaf className="w-6 h-6 text-green-600" />
  },
  {
    title: "Aloe Vera Scalp Treatment",
    description: "Aloe vera contains enzymes that can repair dead skin cells on the scalp. It also acts as a great conditioner and leaves your hair all smooth and shiny.",
    application: "Apply pure aloe vera gel directly to your scalp and hair. Let it sit for about an hour before washing off with a mild shampoo.",
    icon: <Leaf className="w-6 h-6 text-green-600" />
  },
  {
    title: "Rosemary Oil Scalp Massage",
    description: "Rosemary oil is believed to stimulate hair growth by improving circulation to the scalp. It's often compared to minoxidil for its effectiveness.",
    application: "Mix a few drops of rosemary essential oil with a carrier oil like coconut or jojoba oil. Massage it into your scalp and leave for at least 30 minutes before shampooing.",
    icon: <Leaf className="w-6 h-6 text-green-600" />
  },
  {
    title: "Preventing Split Ends",
    description: "Split ends occur when the hair shaft frays. While you can't repair them, you can prevent them with proper care and regular trims.",
    application: "Get regular trims every 6-8 weeks, avoid excessive heat styling, and use a wide-tooth comb on wet hair to minimize breakage.",
    icon: <Leaf className="w-6 h-6 text-green-600" />
  }
]

export default function RemediesPage() {
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
              <h1 className="text-3xl font-bold">Home Remedies</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 overflow-y-auto space-y-4">
            <p className="text-sm text-muted-foreground text-center">Discover natural ways to nourish your hair and promote growth. Always do a patch test before trying a new remedy.</p>
            {remedies.map((remedy, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            {remedy.icon}
                            <div>
                                <CardTitle className="text-base font-semibold">{remedy.title}</CardTitle>
                                <CardDescription className="text-xs pt-1">{remedy.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-foreground"><span className="font-semibold">How to use:</span> {remedy.application}</p>
                    </CardContent>
                </Card>
            ))}
        </main>
      </div>
    </div>
  );
}
