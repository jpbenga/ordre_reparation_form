import React from 'react';
interface TirePressure {
  frontLeft: string;
  frontRight: string;
  rearLeft: string;
  rearRight: string;
}
interface CarChassisProps {
  values: TirePressure;
  onChange: (position: keyof TirePressure, value: string) => void;
}
export const CarChassis = ({
  values,
  onChange
}: CarChassisProps) => {
  return <div className="relative mx-auto my-8 w-full max-w-md">
      <img src="/ChatGPT_Image_27_juin_2025%2C_18_50_11.png" alt="Car chassis" className="w-full h-auto" />
      {/* Front Left */}
      <div className="absolute top-[20%] left-[15%]">
        <div className="bg-white p-1 rounded-md shadow-md">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            AVG
          </label>
          <input type="text" value={values.frontLeft} onChange={e => onChange('frontLeft', e.target.value)} className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" placeholder="8 mm" />
        </div>
      </div>
      {/* Front Right */}
      <div className="absolute top-[20%] right-[15%]">
        <div className="bg-white p-1 rounded-md shadow-md">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            AVD
          </label>
          <input type="text" value={values.frontRight} onChange={e => onChange('frontRight', e.target.value)} className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" placeholder="8 mm" />
        </div>
      </div>
      {/* Rear Left */}
      <div className="absolute bottom-[20%] left-[15%]">
        <div className="bg-white p-1 rounded-md shadow-md">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            ARG
          </label>
          <input type="text" value={values.rearLeft} onChange={e => onChange('rearLeft', e.target.value)} className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" placeholder="8 mm" />
        </div>
      </div>
      {/* Rear Right */}
      <div className="absolute bottom-[20%] right-[15%]">
        <div className="bg-white p-1 rounded-md shadow-md">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            ARD
          </label>
          <input type="text" value={values.rearRight} onChange={e => onChange('rearRight', e.target.value)} className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" placeholder="8 mm" />
        </div>
      </div>
    </div>;
};