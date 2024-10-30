const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate Travel Plan for Location: New York USA, for 1 day and 1 night for family with luxury budget with flight details, Flight Price with booking Url, Hotels options list with Hotel name, Hotel Address, Price, hotel image url, geo coordinates, rating, descriptions and places to visit nearby with placeName, Place details, place Image Url, Geo coordinates, ticket pricing, time to travel each location for 1 day and 1 night with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "trip_details": {\n    "location": "New York, NY, USA",\n    "duration": "1 day",\n    "budget": "Cheap",\n    "travel_style": "Solo Adventure"\n  },\n  "flights": {\n    "note": "Flight details are examples and should be checked for current prices and availability.  Consider nearby airports for potentially cheaper options (e.g., Newark, LaGuardia). Adjust departure city as needed.",\n    "example_flight": {\n      "from": "Your Departure City",\n      "to": "JFK (John F. Kennedy International Airport)",\n      "price": "$200 (estimated round trip)",\n      "booking_url": "https://www.kayak.com/flights",\n      "return_flight": "Same day (adjust based on your schedule)"\n    }\n  },\n  "accommodation": {\n    "note": "Since this is a day trip, accommodation is not necessary. If you need a place to freshen up or store luggage, consider a luggage storage service at a train station or airport."\n  },\n  "places_to_visit": [\n    {\n      "name": "Central Park",\n      "details": "Iconic urban park with walking paths, lakes, and green spaces.",\n      "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/CentralPark2006.jpg/1280px-CentralPark2006.jpg",\n      "coordinates": {\n        "latitude": 40.7829,\n        "longitude": -73.9654\n      },\n      "ticket_pricing": "Free",\n      "estimated_travel_time_from_airport": "Approx. 1 hour by subway"\n    },\n    {\n      "name": "Times Square",\n      "details": "Bustling commercial hub with bright lights, billboards, and Broadway theaters.",\n      "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Times_Square_Manhattan_New_York_City_2014.jpg/1024px-Times_Square_Manhattan_New_York_City_2014.jpg",\n      "coordinates": {\n        "latitude": 40.7589,\n        "longitude": -73.9851\n      },\n      "ticket_pricing": "Free (except for shows and attractions)",\n      "estimated_travel_time_from_central_park": "Approx. 30 minutes by subway"\n    },\n    {\n      "name": "National 9/11 Memorial & Museum",\n      "details": "Memorial and museum commemorating the victims of the September 11 attacks.",\n      "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/World_Trade_Center_Memorial_2012.jpg/1280px-World_Trade_Center_Memorial_2012.jpg",\n      "coordinates": {\n        "latitude": 40.7107,\n        "longitude": -74.0134\n      },\n      "ticket_pricing": "Check website for current pricing",\n      "estimated_travel_time_from_times_square": "Approx. 20 minutes by subway"\n    }\n\n  ],\n  "daily_itinerary": {\n    "day_1": [\n      {\n        "time": "Morning (After arrival at airport)",\n        "activity": "Travel to Central Park by subway",\n        "details": "Explore Central Park, enjoy a walk or a bike ride."\n      },\n      {\n        "time": "Midday",\n        "activity": "Travel to Times Square by subway",\n        "details": "Grab a quick and affordable lunch near Times Square.  Experience the atmosphere and energy of Times Square."\n      },\n      {\n        "time": "Afternoon",\n        "activity": "Travel to 9/11 Memorial & Museum by subway",\n        "details": "Visit the memorial and museum."\n      },\n      {\n        "time": "Evening",\n        "activity": "Travel back to the airport for your return flight."\n      }\n    ]\n  }\n}\n```\n\n\nThis provides a more structured and detailed plan with practical information. Remember to adjust the flight details and itinerary based on your actual arrival/departure times and personal preferences. Always check official websites for the most up-to-date information on pricing and opening hours.  Enjoy your trip! \n',
        },
      ],
    },
  ],
});

// export const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
