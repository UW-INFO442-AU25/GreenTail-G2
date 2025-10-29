import React, { useState } from 'react';

const YouTubeVideo = ({ videoId, title = "GreenTail Quiz Introduction", startTime = 6 }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading video...</p>
            </div>
          </div>
        )}
        
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=0&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          className="w-full h-80 md:h-96"
        ></iframe>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">
          Essential guide for new pet parents - learn about pet nutrition and feeding basics
        </p>
      </div>
    </div>
  );
};

export default YouTubeVideo;
