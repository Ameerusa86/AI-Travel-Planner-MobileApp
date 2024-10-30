import Ionicons from "@expo/vector-icons/Ionicons";

export const selectTravelerList = [
  {
    id: 1,
    title: "Solo Adventure",
    description: "Explore on your own",
    icon: "person-outline", // Ionicons icon name for a single person
    people: "1",
  },
  {
    id: 2,
    title: "With a Friend",
    description: "Traveling with a companion",
    icon: "people-outline", // Ionicons icon name for two people
    people: "2",
  },
  {
    id: 3,
    title: "Group Getaway",
    description: "Join a group for fun and adventure",
    icon: "people-circle-outline", // Icon representing a group of people
    people: "3+",
  },
  {
    id: 4,
    title: "Family Trip",
    description: "Perfect for family vacations",
    icon: "home-outline", // Icon representing a family or home
    people: "3+",
  },
];

export const AI_PROMPT =
  "Generate a travel plan for location: {location}, covering {totalDays} day(s) and {totalNight} night(s) for {traveler} with a {budget} budget. Include flight details with price and booking URL, hotel options with name, address, price, image URL, coordinates, rating, and description, and nearby places to visit with name, details, image URL, coordinates, ticket pricing, and estimated travel time. Provide a daily itinerary with the best times to visit in JSON format.";
