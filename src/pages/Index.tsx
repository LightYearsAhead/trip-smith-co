import { useState } from "react";
import { TripForm } from "@/components/TripForm";
import { PackingList } from "@/components/PackingList";
import { Itinerary } from "@/components/Itinerary";
import { Button } from "@/components/ui/button";
import { Plane, ArrowLeft } from "lucide-react";
import heroImage from "@/assets/travel-hero.jpg";

interface TripDetails {
  destination: string;
  duration: number;
  startDate: string;
  activities: string[];
  notes: string;
}

const Index = () => {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [currentView, setCurrentView] = useState<"form" | "results">("form");

  const handleTripSubmit = (details: TripDetails) => {
    setTripDetails(details);
    setCurrentView("results");
  };

  const handleBackToForm = () => {
    setCurrentView("form");
    setTripDetails(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Pack Smart, Travel Better
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized packing lists and itineraries tailored to your destination and activities
            </p>
            {currentView === "form" && (
              <div className="flex items-center justify-center gap-2 text-white/80">
                <Plane className="h-5 w-5" />
                <span className="text-lg">Ready for your next adventure?</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {currentView === "form" ? (
            <TripForm onSubmit={handleTripSubmit} />
          ) : (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleBackToForm}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Plan Another Trip
                </Button>
              </div>

              {/* Results */}
              {tripDetails && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <PackingList 
                    destination={tripDetails.destination}
                    duration={tripDetails.duration}
                    activities={tripDetails.activities}
                  />
                  <Itinerary
                    destination={tripDetails.destination}
                    duration={tripDetails.duration}
                    startDate={tripDetails.startDate}
                    activities={tripDetails.activities}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-muted-foreground">
            Happy travels! Remember to check visa requirements and travel restrictions for your destination.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
