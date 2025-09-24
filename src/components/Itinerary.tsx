import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Coffee, Camera, Utensils } from "lucide-react";

interface ItineraryDay {
  day: number;
  date: string;
  activities: {
    time: string;
    activity: string;
    description: string;
    type: "sightseeing" | "dining" | "activity" | "rest";
  }[];
}

interface ItineraryProps {
  destination: string;
  duration: number;
  startDate: string;
  activities: string[];
}

const generateItinerary = (destination: string, duration: number, startDate: string, activities: string[]): ItineraryDay[] => {
  const start = new Date(startDate);
  const itinerary: ItineraryDay[] = [];

  for (let day = 1; day <= Math.min(duration, 7); day++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + day - 1);
    
    const dayActivities = [];

    if (day === 1) {
      // Arrival day
      dayActivities.push(
        { time: "Morning", activity: "Arrival", description: `Arrive in ${destination}`, type: "activity" as const },
        { time: "Afternoon", activity: "Check-in & Rest", description: "Settle into accommodation", type: "rest" as const },
        { time: "Evening", activity: "Welcome Dinner", description: "Try local cuisine", type: "dining" as const }
      );
    } else if (day === duration && duration <= 7) {
      // Departure day
      dayActivities.push(
        { time: "Morning", activity: "Check-out", description: "Pack and prepare for departure", type: "activity" as const },
        { time: "Afternoon", activity: "Last-minute Shopping", description: "Pick up souvenirs", type: "activity" as const },
        { time: "Evening", activity: "Departure", description: `Depart from ${destination}`, type: "activity" as const }
      );
    } else {
      // Regular exploration days
      dayActivities.push(
        { time: "Morning", activity: "Breakfast", description: "Start the day with local breakfast", type: "dining" as const }
      );

      // Add activity-based suggestions
      if (activities.includes("City Exploration")) {
        dayActivities.push(
          { time: "Morning", activity: "City Walking Tour", description: "Explore main attractions and landmarks", type: "sightseeing" as const }
        );
      }

      if (activities.includes("Museums/Culture")) {
        dayActivities.push(
          { time: "Afternoon", activity: "Museum Visit", description: "Discover local history and culture", type: "sightseeing" as const }
        );
      }

      if (activities.includes("Beach/Swimming")) {
        dayActivities.push(
          { time: "Afternoon", activity: "Beach Time", description: "Relax by the water", type: "activity" as const }
        );
      }

      if (activities.includes("Shopping")) {
        dayActivities.push(
          { time: "Afternoon", activity: "Shopping District", description: "Browse local markets and shops", type: "activity" as const }
        );
      }

      dayActivities.push(
        { time: "Evening", activity: "Dinner", description: "Experience local dining scene", type: "dining" as const }
      );

      if (activities.includes("Nightlife")) {
        dayActivities.push(
          { time: "Night", activity: "Evening Entertainment", description: "Explore local nightlife", type: "activity" as const }
        );
      }
    }

    itinerary.push({
      day,
      date: currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      activities: dayActivities
    });
  }

  if (duration > 7) {
    itinerary.push({
      day: 8,
      date: "...",
      activities: [
        { time: "All Day", activity: "Continue Exploring", description: `More adventures await in ${destination}!`, type: "activity" as const }
      ]
    });
  }

  return itinerary;
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "dining": return <Utensils className="h-4 w-4" />;
    case "sightseeing": return <Camera className="h-4 w-4" />;
    case "rest": return <Coffee className="h-4 w-4" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "dining": return "bg-accent/20 text-accent-foreground";
    case "sightseeing": return "bg-primary/20 text-primary-foreground";
    case "rest": return "bg-muted text-muted-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

export const Itinerary = ({ destination, duration, startDate, activities }: ItineraryProps) => {
  const itinerary = generateItinerary(destination, duration, startDate, activities);

  return (
    <Card className="w-full shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-primary" />
          {duration}-Day Itinerary for {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {itinerary.map((day) => (
            <div key={day.day} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {day.day}
                </div>
                <h3 className="font-semibold text-lg">Day {day.day}</h3>
                <Badge variant="outline">{day.date}</Badge>
              </div>
              
              <div className="ml-11 space-y-2">
                {day.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card border hover:shadow-sm transition-smooth"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{activity.activity}</span>
                        <Badge className={getActivityColor(activity.type)} variant="secondary">
                          {activity.time}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {duration > 7 && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                This is a sample itinerary for the first week. Your {duration}-day trip will have many more adventures!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};