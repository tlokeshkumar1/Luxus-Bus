import React from 'react';
import { useBooking } from '../context/BookingContext';

interface SeatLayoutProps {
  busType: string;
  selectedDeck: 'lower' | 'upper';
}

interface Seat {
  id: number;
  status: 'available' | 'booked' | 'ladies' | 'selected' | 'availableLadies';
  position: { row: number; col: number };
}

export const SeatLayout: React.FC<SeatLayoutProps> = ({ busType, selectedDeck }) => {
  const { selectedSeats, setSelectedSeats } = useBooking();

  // Generate seat layout exactly like the image - 36 seats in specific arrangement
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    
    // Exact seat arrangement from the image
    const seatArrangement = [
      // Row 1: 36, 2, 1
      [36, null, 2, 1],
      // Row 2: 6, 5, 4, 3  
      [6, 5, 4, 3],
      // Row 3: 10, 9, 8, 7
      [10, 9, 8, 7],
      // Row 4: 14, 13, 12, 11
      [14, 13, 12, 11],
      // Row 5: 18, 17, 16, 15
      [18, 17, 16, 15],
      // Row 6: 22, 21, 20, 19
      [22, 21, 20, 19],
      // Row 7: 26, 25, 24, 23
      [26, 25, 24, 23],
      // Row 8: 30, 29, 28, 27
      [30, 29, 28, 27],
      // Row 9: 35, 34, 33, 32, 31 (back row with 5 seats)
      [35, 34, 33, 32, 31]
    ];

    // Booked seats from the image
    const bookedSeats = [36, 6, 10, 14, 9, 13];
    // Ladies seats (available for ladies only)
    const ladiesSeats = [11]; // Seat 11 appears to have special marking

    seatArrangement.forEach((row, rowIndex) => {
      row.forEach((seatNum, colIndex) => {
        if (seatNum !== null) {
          let status: 'available' | 'booked' | 'ladies' | 'selected' | 'availableLadies' = 'available';
          
          if (bookedSeats.includes(seatNum)) {
            status = 'booked';
          } else if (ladiesSeats.includes(seatNum)) {
            status = 'availableLadies';
          } else if (selectedSeats.includes(seatNum)) {
            status = 'selected';
          }

          seats.push({
            id: seatNum,
            status,
            position: { row: rowIndex, col: colIndex }
          });
        }
      });
    });

    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: number, status: string) => {
    if (status === 'booked') return;

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    
    setSelectedSeats(newSelectedSeats);
  };

  const getSeatClassName = (seat: Seat) => {
    const baseClasses = "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden";
    
    if (selectedSeats.includes(seat.id)) {
      return `${baseClasses} bg-gradient-to-br from-emerald-400 to-emerald-500 border-emerald-300 text-white shadow-lg shadow-emerald-500/40 scale-105`;
    }
    
    switch (seat.status) {
      case 'available':
        return `${baseClasses} bg-white border-gray-200 text-gray-800 hover:border-blue-400 hover:shadow-md hover:shadow-blue-400/30`;
      case 'booked':
        return `${baseClasses} bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400 text-gray-200 cursor-not-allowed opacity-80`;
      case 'availableLadies':
        return `${baseClasses} bg-white border-2 border-pink-400 text-gray-800 hover:border-pink-500 hover:shadow-md hover:shadow-pink-400/30`;
      case 'ladies':
        return `${baseClasses} bg-gradient-to-br from-pink-400 to-pink-500 border-pink-300 text-white shadow-md shadow-pink-500/30`;
      default:
        return baseClasses;
    }
  };

  // Seat arrangement layout
  const seatRows = [
    // Row 1: Driver area + seats 36, 2, 1
    { seats: [36, null, 2, 1], isDriverRow: true },
    // Regular rows
    { seats: [6, 5, 4, 3] },
    { seats: [10, 9, 8, 7] },
    { seats: [14, 13, 12, 11] },
    { seats: [18, 17, 16, 15] },
    { seats: [22, 21, 20, 19] },
    { seats: [26, 25, 24, 23] },
    { seats: [30, 29, 28, 27] },
    // Back row with 5 seats
    { seats: [35, 34, 33, 32, 31], isBackRow: true }
  ];

  return (
    <div className="space-y-6">
      {/* Refined Seat Legend */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border border-gray-200 rounded-md"></div>
            <span className="text-gray-300 text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 border border-emerald-300 rounded-md"></div>
            <span className="text-gray-300 text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-600 border border-gray-400 rounded-md"></div>
            <span className="text-gray-300 text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-500 border border-pink-300 rounded-md"></div>
            <span className="text-gray-300 text-sm">Ladies(L)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border-2 border-pink-400 rounded-md"></div>
            <span className="text-gray-300 text-sm">Available(L)</span>
          </div>
        </div>
      </div>

      {/* Refined Bus Layout */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        
        {/* Entrance */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-2 bg-gradient-to-r from-emerald-600/60 to-teal-600/60 border border-emerald-400/20 rounded-lg text-emerald-200 text-sm font-medium">
            🚪 ENTRANCE
          </div>
        </div>
        
        {/* Driver Section */}
        <div className="flex justify-end mb-8">
          <div className="relative">
            <div className="w-20 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg border border-blue-400/20">
              <div className="w-12 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-4 bg-gray-800 rounded-md"></div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-600/60 border border-blue-400/20 rounded text-blue-200 text-xs">
              DRIVER
            </div>
          </div>
        </div>

        {/* Seats Layout */}
        <div className="space-y-3 max-w-md mx-auto">
          {seatRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.isDriverRow ? (
                // Special layout for first row with driver area
                <div className="flex gap-2 items-center">
                  {row.seats.map((seatNum, colIndex) => {
                    if (seatNum === null) {
                      return <div key={colIndex} className="w-10"></div>; // Space for aisle
                    }
                    const seat = seats.find(s => s.id === seatNum);
                    if (!seat) return null;
                    
                    return (
                      <div
                        key={seat.id}
                        className={getSeatClassName(seat)}
                        onClick={() => handleSeatClick(seat.id, seat.status)}
                      >
                        <span>{seat.id}</span>
                      </div>
                    );
                  })}
                </div>
              ) : row.isBackRow ? (
                // Back row with 5 seats
                <div className="flex gap-2 justify-center">
                  {row.seats.map((seatNum) => {
                    const seat = seats.find(s => s.id === seatNum);
                    if (!seat) return null;
                    
                    return (
                      <div
                        key={seat.id}
                        className={getSeatClassName(seat)}
                        onClick={() => handleSeatClick(seat.id, seat.status)}
                      >
                        <span>{seat.id}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Regular 2+2 layout
                <div className="flex gap-8 items-center">
                  {/* Left side - 2 seats */}
                  <div className="flex gap-2">
                    {row.seats.slice(0, 2).map((seatNum) => {
                      const seat = seats.find(s => s.id === seatNum);
                      if (!seat) return null;
                      
                      return (
                        <div
                          key={seat.id}
                          className={getSeatClassName(seat)}
                          onClick={() => handleSeatClick(seat.id, seat.status)}
                        >
                          <span>{seat.id}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Aisle */}
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-400/30 to-emerald-400/30 rounded-full"></div>
                  
                  {/* Right side - 2 seats */}
                  <div className="flex gap-2">
                    {row.seats.slice(2).map((seatNum) => {
                      const seat = seats.find(s => s.id === seatNum);
                      if (!seat) return null;
                      
                      return (
                        <div
                          key={seat.id}
                          className={getSeatClassName(seat)}
                          onClick={() => handleSeatClick(seat.id, seat.status)}
                        >
                          <span>{seat.id}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-emerald-600/10 border border-emerald-400/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-emerald-300 font-medium">Selected Seats:</span>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">
                {selectedSeats.sort((a, b) => a - b).join(', ')}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-emerald-300 text-sm">
                {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};