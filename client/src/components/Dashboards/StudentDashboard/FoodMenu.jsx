import FoodMenuNavbar from "./FoodMenuNavbar";

const FoodMenu = () => {
  return (
    <div className="w-full h-full bg-stone-900 overflow-y-auto">
      <FoodMenuNavbar />
      
      {/* Additional Info Section */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Menu Info Card */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-6 shadow-lg mb-6">
            <h3 className="text-white font-bold text-xl mb-2">📋 Weekly Menu Information</h3>
            <p className="text-white opacity-90">
              View the complete weekly food menu for your hostel mess. Select any day to see the breakfast, lunch, and dinner options available.
            </p>
          </div>

          {/* Menu Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-950 border-l-4 border-yellow-500 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌅</span>
                <h4 className="text-white font-bold text-lg">Breakfast</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Early morning meal starting from 7:00 AM to keep you energized for the day.
              </p>
            </div>

            <div className="bg-neutral-950 border-l-4 border-green-500 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🍽️</span>
                <h4 className="text-white font-bold text-lg">Lunch</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Midday meal from 12:30 PM onwards with nutritious and balanced food items.
              </p>
            </div>

            <div className="bg-neutral-950 border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌙</span>
                <h4 className="text-white font-bold text-lg">Dinner</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Evening meal from 7:30 PM onwards with light and nutritious options.
              </p>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-8 bg-neutral-950 border border-gray-700 rounded-lg p-6 shadow-md">
            <h4 className="text-orange-500 font-bold text-lg mb-4">📝 Important Notes</h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Menu items may vary based on availability and seasonal produce.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Special dietary requirements can be requested through the suggestions section.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Meal timings are strictly adhered to for quality service.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Please plan your mess off requests if you won't be available for meals.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
