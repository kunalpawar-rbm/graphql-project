import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ShipsInfoTable from './ShipsInfoTable';
import ShipsPieChart from './ShipStatusPieChart';
import ShipTypesBarChart from './ShipTypesBarChart';

// Define the GraphQL query
const GET_SHIPS_DETAILS = gql`
  query GetShipsDetails {
    ships {
      name
      type
      active
      year_built
    }
  }
`;

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

const ShipMainPage: React.FC = () => {
    // Using useQuery hook with TypeScript generics
    const { loading, error, data } = useQuery<GetShipsQueryResult>(GET_SHIPS_DETAILS);

    const shipTypes: { [key: string]: number } = {
        "Tug": 0,
        "Barge": 0,
        "Cargo": 0,
        "High Speed Craft": 0
    };

    const shipStatus: { [key: string]: number } = {
        "activeCount": 0,
        "inActiveCount": 0
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    (data?.ships)?.forEach(element => {
        if (element.type) ++shipTypes[element.type];
        (element.active) ? ++shipStatus["activeCount"] : ++shipStatus["inActiveCount"];
    });

    return (
        <div>
            <div className='flex'>
                <div className="flex-1 p-2 flex items-center justify-center">
                    <ShipsPieChart statusMap={shipStatus} />
                </div>
                <div className="flex-1 p-2">
                    <ShipTypesBarChart types={shipTypes} />
                </div>
            </div>
            <div>
                <ShipsInfoTable ships={data?.ships} />
            </div>
        </div>
    )
};

export default ShipMainPage;
