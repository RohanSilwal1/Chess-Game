import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center ">
      <div className="pt-8 max-w-4xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center ">
            <img
              className="text-white md:max-w-96 max-w-70"
              src={"chess.jpeg"}
              alt="Chess board image"
            />
          </div>
          <div className="pt-16">
            <div className="  flex  justify-center ">
              <h1 className="text-white pb-6 text-5xl font-bold  leading-14 text-center selection:text-blue-500 selection:bg-black">
                Play Chess Online on the #1 Site!
              </h1>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  navigate("/game");
                }}
                className="text-white text-2xl font-bold text-center bg-green-500 px-25 py-4 rounded-xl hover:shadow-md hover:shadow-gray-400 hover:ring"
              >
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
