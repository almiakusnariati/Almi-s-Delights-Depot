import React from "react";
import VideoBackground from "../components/backround";

export default function Home() {
  return (
    <div className="bg-gray-800 text-white">
      <div className="relative w-full h-full">
      <div className="inset-0 flex justify-center items-center">
                    <VideoBackground/>
                </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h5 className="text-5xl font-bold mb-2">BEST SHOE SELLER</h5>
            
          </div>
        </div>
      </div>
    </div>
  );
}
