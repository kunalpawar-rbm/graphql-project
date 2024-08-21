import React from 'react';
import Heading from './Heading';

// Shape of individual core
interface Core {
  asds_attempts: number;
  asds_landings: number;
  block: number;
  status: string;
}

// Shape of Result
interface GetCoresQueryResult {
  cores: Core[] | undefined;
}

// CoreInfoTable component
const CoreInfoTableContainer: React.FC<GetCoresQueryResult> = ({ cores }) => {
  return (
    <div className='flex-col'>
      <div className='flex items-center justify-center px-2 py-2'>
        <Heading heading={"Data"} />
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-sky-500 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Core-Status</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">ASDS Attempts</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">ASDS Landings</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Core-Block</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 font-sans">
          {cores?.map((core, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap italic font-semibold text-gray-800">{core.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{core.asds_attempts}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{core.asds_landings}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${core.block ? '' : 'text-red-600'}`}>
                {core.block ? core.block : "NA"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default CoreInfoTableContainer;
