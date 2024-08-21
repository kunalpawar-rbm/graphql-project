import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Heading from './Heading';

// Define GraphQL query
const GET_HISTORIES_DETAILS = gql`
  query GetHistoriesDetails {
    histories {
      event_date_utc
      id
      title
    }
  }
`;

// Shape of individual history
interface History {
  event_date_utc: string;
  id: string;
  title: string;
}

// Shape of Result
interface GetHistoriesQueryResult {
  histories: History[] | undefined;
}

// HistoryInfoTable component
const HistoryInfoTable: React.FC<GetHistoriesQueryResult> = ({ histories }) => {
  return (
    <div className="flex-col p-4">
      <div className='flex items-center justify-center mb-4'>
        <Heading heading={"Data"} />
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-sky-500 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">Event Date (UTC)</th>
            <th className="px-6 py-3 text-left text-lg font-semibold text-white uppercase tracking-wider">ID</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 font-sans">
          {histories?.map((history, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{history.title || "N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{history.event_date_utc || "N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{history.id || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryInfoTable;
