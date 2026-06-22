import { useState, useEffect } from "react";
import img1 from "../../../assets/clg-photos/17437568383410.jpg";
import img2 from "../../../assets/clg-photos/299784354_492489746319834_6048459204667609095_n.jpg";
import img3 from "../../../assets/clg-photos/Campus 1.jpg";
import img4 from "../../../assets/clg-photos/K.S.Rangasamy-College-of-Technology logo.jpg";
import img5 from "../../../assets/clg-photos/ksrcollegeoftec_cover.jpg";

function ImageCarousel() {
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // 2.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`carousel-${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export { ImageCarousel };
