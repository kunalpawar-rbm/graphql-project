import React from 'react';
import Heading from './Heading';

// Shape of individual capsule
interface Capsule {
  id: number;
  type: string;
  reuse_count: number;
  status: string;
}

// Shape of Result
interface GetCapsulesQueryResult {
  capsules: Capsule[] | undefined;
}

// CapsuleInfoTable component
const CapsuleInfoTable: React.FC<GetCapsulesQueryResult> = ({ capsules }) => {
  return (
    <div className='flex-col'>
      <div className='flex items-center justify-center px-2 py-2'>
        <Heading heading={"Data"} />
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-sky-500 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Capsule-ID</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Reuse Count</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 font-sans">
          {capsules?.map((capsule, index) => (
           <tr key={index}>
           <td className="px-6 py-4 whitespace-nowrap text-gray-700">{capsule.type}</td>
           <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{capsule.id}</td>
           <td className="px-6 py-4 whitespace-nowrap text-gray-700">{capsule.reuse_count}</td>
           <td
             className={`px-6 py-4 whitespace-nowrap 
               ${capsule.status === "retired" ? 'text-orange-400' : ''}
               ${capsule.status === "unknown" ? 'text-gray-500' : ''}
               ${capsule.status === "destroyed" ? 'text-red-600' : ''}
               ${capsule.status === "active" ? 'text-green-600' : ''}
             `}
           >
             {capsule.status}
           </td>
         </tr>         
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapsuleInfoTable;
