import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Backdoor() {
  const [backdoorValue, setBackdoorValue] = useState(true);

  useEffect(() => {
    async function fetchBackdoorValue() {
      try {
        let { data } = await axios.get("https://hussien-server.vercel.app/");
        console.log('Fetched Data:', data);
        setBackdoorValue(data.Backdoor); // تأكد من وجود الحقل "Backdoor"
      } catch (error) {
        console.error('Error loading products', error);
      }
    }

    fetchBackdoorValue();
  }, []);

  const toggleValue = async () => {
    try {
      const response = await axios.put("https://hussien-server.vercel.app/edit");
      console.log('Updated Data:', response.data);
      setBackdoorValue(response.data.Backdoor); // تحديث القيمة من الاستجابة
    } catch (error) {
      console.error('Error toggling value', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg w-64 mx-auto mt-10">
      <h1 className="text-lg font-semibold text-gray-200 mb-4">Current Value: {String(backdoorValue)}</h1>
      
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={backdoorValue}
          onChange={toggleValue}
        />
        <div className="w-12 h-7 bg-gray-600 rounded-full relative transition-colors duration-300 ease-in-out peer-checked:bg-blue-600">
          <div className={`absolute top-0.5 left-0.5 h-6 w-6 bg-gray-200 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${backdoorValue ? 'translate-x-5' : ''}`}>
          </div>
        </div>
        <span className="ml-3 text-sm font-medium text-gray-300">Toggle Status</span>
      </label>
    </div>
  );
}
