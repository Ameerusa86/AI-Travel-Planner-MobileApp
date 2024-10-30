import { createContext, Dispatch, SetStateAction } from "react";

interface TripDataType {
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  traveler: { title: string } | null;
  budget: string | null;
  totalDays: number;
  totalNights: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface CreateTripContextType {
  tripData: TripDataType;
  setTripData: Dispatch<SetStateAction<TripDataType>>;
}

export const CreateTripContext = createContext<CreateTripContextType>(
  {} as CreateTripContextType
);
