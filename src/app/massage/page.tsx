"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Hand } from "lucide-react";
import { StrandPlanIcon } from "@/components/icons";

const massages = [
  {
    title: "Traditional Scalp Massage",
    description: "Using your fingertips, apply light to medium pressure on your scalp, moving in small circles. This helps to improve circulation and can relieve stress.",
    application: "Can be done on dry hair for 5-10 minutes daily. For a deeper treatment, use a carrier oil like coconut or jojoba oil.",
    icon: <Hand className="w-6 h-6 text-primary" />
  },
  {
    title: "Hot Oil Massage",
    description: "Warm oil massage can help to deeply nourish the scalp and hair, promoting strength and shine. It's particularly good for dry hair.",
    application: "Gently warm a carrier oil (like coconut, olive, or almond oil). Apply to scalp and hair, massage for 15 minutes, and leave for at least 30 minutes before washing.",
    icon: <Hand className="w-6 h-6 text-primary" />
  },
  {
    title: "Inversion Method Massage",
    description: "This technique involves hanging your head upside down to increase blood flow to the scalp while massaging.",
    application: "Sit on a chair and gently flip your hair forward. Massage your scalp with your fingertips for 4-5 minutes. Slowly return to an upright position.",
    icon: <Hand className="w-6 h-6 text-primary" />
  },
  {
    title: "Pressure Point Massage",
    description: "Based on acupressure principles, applying pressure to specific points on the head may help relieve tension and improve scalp health.",
    application: "Use your thumb or index finger to apply firm, steady pressure to points on your scalp, temples, and the base of your skull for a few seconds each.",
    icon: <Hand className="w-6 h-6 text-primary" />
  }
]

export default function MassagePage() {
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
              <h1 className="text-3xl font-bold">Hair Massage</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 overflow-y-auto space-y-4">
            <p className="text-sm text-muted-foreground text-center">Hair and scalp massages are a relaxing way to stimulate hair follicles and boost growth.</p>
            {massages.map((massage, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            {massage.icon}
                            <div>
                                <CardTitle className="text-base font-semibold">{massage.title}</CardTitle>
                                <CardDescription className="text-xs pt-1">{massage.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-foreground"><span className="font-semibold">How to do it:</span> {massage.application}</p>
                    </CardContent>
                </Card>
            ))}
        </main>
      </div>
    </div>
  );
}
