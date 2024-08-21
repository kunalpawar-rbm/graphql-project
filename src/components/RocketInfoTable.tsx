import React from 'react';
import Heading from './Heading';

// Shape of individual rocket
interface Rocket {
  name: string;
  country: string;
  first_flight: string;
  cost_per_launch: number;
  active: boolean;
  mass: {
    kg: number;
  };
  success_rate_pct: number;
  engines: {
    type: string;
  }
}

// Shape of Result
interface GetRocketsQueryResult {
  rockets: Rocket[] | undefined;
}

// RocketInfoTable component
const RocketInfoTable: React.FC<GetRocketsQueryResult> = ({ rockets }) => {
  return (
    <div className='flex-col'>
      <div className='flex items-center justify-center px-2 py-2'>
        <Heading heading={"Data"} />
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-sky-500 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Country</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">First Flight</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Launch cost</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Mass(kg)</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Success Rate</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Engine Type</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 font-sans">
          {rockets?.map((rocket, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{rocket.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{rocket.country}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${rocket.first_flight ? '' : 'text-red-600'}`}>
                {rocket.first_flight ? rocket.first_flight : "NA"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{rocket.cost_per_launch}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${rocket.active ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}`}>
                {rocket.active ? "Active" : "Inactive"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{rocket.mass.kg}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{rocket.success_rate_pct}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{rocket.engines.type}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default RocketInfoTable;
