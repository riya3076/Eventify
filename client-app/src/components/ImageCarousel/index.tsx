/**
 * Author: Aharnish Solanki (B00933563)
 */

import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[] | string | undefined;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (Array.isArray(images)) {
      setCurrent(current === images.length - 1 ? 0 : current + 1);
    }
  };

  const prevSlide = () => {
    if (Array.isArray(images)) {
      setCurrent(current === 0 ? images.length - 1 : current - 1);
    }
  };

  const imageList = Array.isArray(images) ? images : [images];

  if (imageList.length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center  mt-2 mb-6 ">
      {imageList.map((image, index) => (
        <div
          key={index}
          className={`${index === current ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
        >
          {index === current && (
            <img
              src={image}
              alt="Event Slide"
              className="w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ width: "1300px", height: "500px" }}
            />
          )}
        </div>
      ))}
      {Array.isArray(images) && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-gray-800 text-white p-2 rounded-full"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 bg-gray-800 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
