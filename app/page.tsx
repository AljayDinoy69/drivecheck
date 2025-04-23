import Link from "next/link";
import { Button } from "@/components/subcom/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Drive Check System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Efficiently manage and track vehicle entries for your property with our comprehensive drive check system.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg px-8">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}