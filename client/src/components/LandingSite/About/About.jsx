import hostelImage from "../../../assets/image.png";

function About() {
  return (
    <>
      <div className="w-full py-20 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-bold text-white text-5xl mb-4">
              Swami Vivekanandha Boys Hostel
            </h1>
            <p className="text-gray-300 text-lg">
              K S Rangasamy College of Technology
            </p>
          </div>

          {/* Image and Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={hostelImage}
                alt="Swami Vivekanandha Boys Hostel"
                className="rounded-lg shadow-2xl w-full max-w-md object-cover"
              />
            </div>

            {/* Content */}
            <div className="text-white space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-3 text-blue-400">
                  Welcome to Swami Vivekanandha Boys Hostel
                </h2>
                <p className="text-gray-200 leading-relaxed">
                  Swami Vivekanandha Boys Hostel is a premier residential facility at K S Rangasamy College of Technology, 
                  dedicated to providing a comfortable, safe, and nurturing environment for male students pursuing their academic goals.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-400">Our Mission</h3>
                <p className="text-gray-200 leading-relaxed">
                  To provide an excellent living environment that fosters personal growth, academic excellence, and 
                  holistic development of our residents.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-400">Facilities</h3>
                <ul className="text-gray-200 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Comfortable and spacious rooms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> 24/7 Security and CCTV Surveillance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> High-speed Internet connectivity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Well-equipped dining hall with nutritious meals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Study and recreation areas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Laundry and housekeeping services
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-400">Location</h3>
                <p className="text-gray-200">
                  Located on the campus of K S Rangasamy College of Technology, providing convenient access to 
                  all academic and extracurricular facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export { About };
