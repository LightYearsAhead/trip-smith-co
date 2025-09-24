import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Calendar, Activity } from "lucide-react";

interface TripDetails {
  destination: string;
  duration: number;
  startDate: string;
  activities: string[];
  notes: string;
}

interface TripFormProps {
  onSubmit: (details: TripDetails) => void;
}

const activityOptions = [
  "Beach/Swimming", "Hiking/Outdoor", "Business/Work", "City Exploration", 
  "Fine Dining", "Shopping", "Museums/Culture", "Nightlife", "Photography", "Adventure Sports"
];

export const TripForm = ({ onSubmit }: TripFormProps) => {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !duration || !startDate) return;
    
    onSubmit({
      destination,
      duration: parseInt(duration),
      startDate,
      activities: selectedActivities,
      notes
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card transition-smooth hover:shadow-travel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="h-6 w-6 text-primary" />
          Plan Your Trip
        </CardTitle>
        <CardDescription>
          Tell us about your travel plans and we'll create a personalized packing list and itinerary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Destination
            </Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Tokyo, Japan"
              required
            />
          </div>

          {/* Duration and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Duration (days)
              </Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="7"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Planned Activities
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {activityOptions.map((activity) => (
                <Button
                  key={activity}
                  type="button"
                  variant={selectedActivities.includes(activity) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleActivityToggle(activity)}
                  className="justify-start text-xs"
                >
                  {activity}
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requirements, weather considerations, or specific needs?"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-ocean hover:opacity-90 shadow-travel"
            size="lg"
          >
            Generate My Travel Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};