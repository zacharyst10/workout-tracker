import React from "react";

export default function RoadPath() {
  return (
    <div className="absolute w-full overflow-hidden opacity-10 pointer-events-none">
      <svg viewBox="0 0 400 60" className="w-full">
        {/* Main road */}
        <path
          d="M0,25 C100,15 300,35 400,25"
          fill="none"
          stroke="#374151"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Road markings */}
        <path
          d="M10,25 L30,24 M50,23 L70,22 M90,21 L110,20 M130,20 L150,21 M170,22 L190,23 M210,24 L230,25 M250,26 L270,27 M290,27 L310,26 M330,25 L350,24 M370,23 L390,22"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="15 15"
        />

        {/* Milestone markers */}
        <g transform="translate(380, 25)">
          <circle cx="0" cy="0" r="8" fill="#1d4ed8" />
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#1d4ed8"
            fontSize="12"
            fontWeight="bold"
          >
            315
          </text>
        </g>

        <g transform="translate(20, 25)">
          <circle cx="0" cy="0" r="8" fill="#1d4ed8" />
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#1d4ed8"
            fontSize="12"
            fontWeight="bold"
          >
            Start
          </text>
        </g>
      </svg>
    </div>
  );
}
