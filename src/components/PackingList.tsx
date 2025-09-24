import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Package, Shirt, Smartphone } from "lucide-react";

interface PackingItem {
  item: string;
  category: string;
  essential: boolean;
}

interface PackingListProps {
  destination: string;
  duration: number;
  activities: string[];
}

const generatePackingList = (destination: string, duration: number, activities: string[]): PackingItem[] => {
  const baseItems: PackingItem[] = [
    // Essentials
    { item: "Passport/ID", category: "Documents", essential: true },
    { item: "Travel Insurance", category: "Documents", essential: true },
    { item: "Flight Tickets", category: "Documents", essential: true },
    { item: "Phone Charger", category: "Electronics", essential: true },
    { item: "Underwear", category: "Clothing", essential: true },
    { item: "Socks", category: "Clothing", essential: true },
    { item: "Toiletries", category: "Personal Care", essential: true },
    { item: "Medications", category: "Health", essential: true },
  ];

  const clothingItems: PackingItem[] = [
    { item: "T-shirts/Tops", category: "Clothing", essential: true },
    { item: "Pants/Jeans", category: "Clothing", essential: true },
    { item: "Pajamas", category: "Clothing", essential: false },
    { item: "Jacket/Sweater", category: "Clothing", essential: false },
  ];

  const activityBasedItems: PackingItem[] = [];

  // Activity-specific items
  if (activities.includes("Beach/Swimming")) {
    activityBasedItems.push(
      { item: "Swimwear", category: "Clothing", essential: true },
      { item: "Sunscreen", category: "Personal Care", essential: true },
      { item: "Beach Towel", category: "Accessories", essential: false },
      { item: "Sunglasses", category: "Accessories", essential: false }
    );
  }

  if (activities.includes("Hiking/Outdoor")) {
    activityBasedItems.push(
      { item: "Hiking Boots", category: "Footwear", essential: true },
      { item: "Backpack", category: "Accessories", essential: true },
      { item: "Water Bottle", category: "Accessories", essential: true },
      { item: "First Aid Kit", category: "Health", essential: false }
    );
  }

  if (activities.includes("Business/Work")) {
    activityBasedItems.push(
      { item: "Business Attire", category: "Clothing", essential: true },
      { item: "Laptop", category: "Electronics", essential: true },
      { item: "Business Cards", category: "Documents", essential: false },
      { item: "Notebook", category: "Accessories", essential: false }
    );
  }

  if (activities.includes("Fine Dining")) {
    activityBasedItems.push(
      { item: "Dress Clothes", category: "Clothing", essential: true },
      { item: "Dress Shoes", category: "Footwear", essential: true }
    );
  }

  if (activities.includes("Photography")) {
    activityBasedItems.push(
      { item: "Camera", category: "Electronics", essential: true },
      { item: "Extra Batteries", category: "Electronics", essential: false },
      { item: "Memory Cards", category: "Electronics", essential: false }
    );
  }

  // Duration-based adjustments
  const durationMultiplier = Math.ceil(duration / 7);
  const adjustedClothing = clothingItems.map(item => ({
    ...item,
    item: `${item.item} (${Math.min(duration, 7)} pieces)`
  }));

  return [...baseItems, ...adjustedClothing, ...activityBasedItems];
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Clothing": return <Shirt className="h-4 w-4" />;
    case "Electronics": return <Smartphone className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

export const PackingList = ({ destination, duration, activities }: PackingListProps) => {
  const packingItems = generatePackingList(destination, duration, activities);
  const groupedItems = packingItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  return (
    <Card className="w-full shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package className="h-5 w-5 text-accent" />
          Packing List for {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
                {getCategoryIcon(category)}
                {category}
              </h3>
              <div className="grid gap-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-smooth"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <span className={item.essential ? "font-medium" : ""}>{item.item}</span>
                    </div>
                    {item.essential && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                        Essential
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};