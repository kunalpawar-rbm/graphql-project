import React from 'react';
import { useQuery, gql } from '@apollo/client';
import HistoryInfoTable from './HistoryInfoTable';
import HistoryEventLineChart from './HistoryEventLineChart';

// Define the GraphQL query
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

// Shape of Result - should match the GraphQL query response
interface GetHistoriesQueryResult {
    histories: History[];
}

const HistoryMainPage: React.FC = () => {
    // Using useQuery hook with TypeScript generics
    const { loading, error, data } = useQuery<GetHistoriesQueryResult>(GET_HISTORIES_DETAILS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let low = 3000, high = -1;
    const eventFreqMap: { [key: string]: number } = {};

    (data?.histories)?.forEach(element => {
        const currDate = element.event_date_utc.substring(0, 4);

        if (eventFreqMap[currDate] === undefined) {
            eventFreqMap[currDate] = 1;
        } else {
            ++eventFreqMap[currDate];
        }

        if (low > parseInt(currDate)) {
            low = parseInt(currDate);
        }

        if (high < parseInt(currDate)) {
            high = parseInt(currDate);
        }
    });

    for (let i = low; i <= high; i++) {
        let str: string = i.toString();
        if (eventFreqMap[str] === undefined) {
            eventFreqMap[str] = 0;
        }
    }

    return (
        <div>
            <div>
                <HistoryEventLineChart eventYearMap={eventFreqMap} />
            </div>
            <div className="overflow-x-auto mt-4">
                <div className="min-w-full">
                    <HistoryInfoTable histories={data?.histories} />
                </div>
            </div>
        </div>
    );
};

export default HistoryMainPage;
