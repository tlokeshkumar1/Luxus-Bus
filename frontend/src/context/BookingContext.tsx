import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchData {
  from: string;
  to: string;
  date: string;
}

interface SelectedBus {
  id: string;
  name: string;
  type: string;
  duration: string;
  departure: string;
  arrival: string;
  price: number;
  rating: number;
  amenities: string[];
}

interface BookingContextType {
  searchData: SearchData | null;
  setSearchData: (data: SearchData) => void;
  selectedBus: SelectedBus | null;
  setSelectedBus: (bus: SelectedBus) => void;
  selectedSeats: number[];
  setSelectedSeats: (seats: number[]) => void;
  upgrades: {
    luxurySleeper: boolean;
    meal: boolean;
    priorityBoarding: boolean;
  };
  setUpgrades: (upgrades: any) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [selectedBus, setSelectedBus] = useState<SelectedBus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [upgrades, setUpgrades] = useState({
    luxurySleeper: false,
    meal: false,
    priorityBoarding: false,
  });

  return (
    <BookingContext.Provider
      value={{
        searchData,
        setSearchData,
        selectedBus,
        setSelectedBus,
        selectedSeats,
        setSelectedSeats,
        upgrades,
        setUpgrades,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};