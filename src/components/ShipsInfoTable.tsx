import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Heading from './Heading';

// Shape of array elements 
interface Ship {
  name: string | null;
  type: string | null;
  active: boolean;
  year_built: number | null;
}

// Shape of Result
interface GetShipsQueryResult {
  ships: Ship[] | undefined;
}

const ShipsInfoTable: React.FC<GetShipsQueryResult> = ({ ships }) => {
  return (
    <div className='flex-col'>
      <div className='flex items-center justify-center px-2 py-2'>
        <Heading heading={"Data"} />
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-sky-500 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Ship-Name</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Ship-Type</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Ship-Year Built</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 font-sans">
          {ships?.map((ship, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap italic font-semibold text-gray-800">{ship.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{ship.type}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${ship.active ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}`}>
                {ship.active ? "Active" : "Inactive"}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${ship.year_built ? '' : 'text-red-600'}`}>{ship.year_built ? ship.year_built : "NA"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipsInfoTable;
