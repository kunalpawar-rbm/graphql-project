import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CoreInfoTableContainer from './CoreInfoTable';
import CorePieChart from './CoreStausPieChart';

// Define GraphQL query
const GET_CORES_DETAILS = gql`
  query GetCoresDetails {
    cores {
      asds_attempts
      asds_landings
      block
      status
    }
  }
`;

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

const CoreMainPage: React.FC = () => {
    // Using useQuery hook with TypeScript generics
    const { loading, error, data } = useQuery<GetCoresQueryResult>(GET_CORES_DETAILS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const coreStatus: { [key: string]: number } = {
        "lost": 0,
        "expended": 0,
        "inactive": 0,
        "active": 0
    };

    (data?.cores)?.forEach(element => {
        if (element.status) ++coreStatus[element.status];
    });

    return (
        <div>
             <div className="flex-1 p-2 flex items-center justify-center">
                <CorePieChart statusMap={coreStatus} />
            </div>
            <div className="overflow-x-auto mt-4"> 
                <div className="min-w-full"> 
                    <CoreInfoTableContainer cores={data?.cores} />
                </div>
            </div>
        </div>
    );
};

export default CoreMainPage;
