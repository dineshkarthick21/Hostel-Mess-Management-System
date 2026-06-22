import { useState } from "react";

const FoodMenuNavbar = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Sample menu data - can be fetched from backend
  const [menuData] = useState({
    Monday: { breakfast: "Paratha & Chai", lunch: "Dal Rice & Sabzi", dinner: "Roti & Curry" },
    Tuesday: { breakfast: "Poha & Tea", lunch: "Biryani & Raita", dinner: "Naan & Korma" },
    Wednesday: { breakfast: "Idli & Sambar", lunch: "Chole Bhature", dinner: "Roti & Aloo" },
    Thursday: { breakfast: "Dosa & Chutney", lunch: "Pulao & Curd", dinner: "Chapati & Dal" },
    Friday: { breakfast: "Bread & Eggs", lunch: "Chicken Rice & Gravy", dinner: "Roti & Paneer" },
    Saturday: { breakfast: "Upma & Tea", lunch: "Pav Bhaji", dinner: "Biryani" },
    Sunday: { breakfast: "Puri & Sabzi", lunch: "Thali Special", dinner: "Fried Rice & Egg" },
  });

  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <div className="w-full bg-neutral-950 border-b-2 border-orange-600 shadow-lg">
      {/* Header */}
      <div className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500">
        <h2 className="text-white font-bold text-lg">📍 Weekly Food Menu</h2>
      </div>

      {/* Days Navigation */}
      <div className="flex overflow-x-auto px-4 py-4 gap-3 scroll-smooth">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedDay === day
                ? "bg-orange-600 text-white shadow-lg scale-105"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700 border border-neutral-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Menu Display for Selected Day */}
      <div className="px-6 py-6">
        <h3 className="text-2xl font-bold text-orange-500 mb-6">{selectedDay}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Breakfast */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌅</span>
              <h4 className="text-white font-bold text-lg">Breakfast</h4>
            </div>
            <p className="text-white text-base font-medium">
              {menuData[selectedDay].breakfast}
            </p>
          </div>

          {/* Lunch */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍽️</span>
              <h4 className="text-white font-bold text-lg">Lunch</h4>
            </div>
            <p className="text-white text-base font-medium">
              {menuData[selectedDay].lunch}
            </p>
          </div>

          {/* Dinner */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌙</span>
              <h4 className="text-white font-bold text-lg">Dinner</h4>
            </div>
            <p className="text-white text-base font-medium">
              {menuData[selectedDay].dinner}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Grid View (Optional - Alternative View) */}
      <div className="hidden md:block px-6 pb-6">
        <button className="text-orange-500 hover:text-orange-400 text-sm font-semibold flex items-center gap-2 mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          View Full Calendar
        </button>
      </div>
    </div>
  );
};

export default FoodMenuNavbar;
