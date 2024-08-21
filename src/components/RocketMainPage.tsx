import React from 'react';
import { useQuery, gql } from '@apollo/client';
import RocketInfoTable from './RocketInfoTable';
import RocketMassHeightBarChart from './RocketMassHeightBarChart';

// Define the GraphQL query
const GET_ROCKETS_DETAILS = gql`
  query GetRocketsDetails {
  rockets {
    name
    country
    first_flight
    cost_per_launch
    active
    mass {
      kg
    }
    success_rate_pct
    engines {
      type
    }
    height {
      meters
    }
  }
}
`;

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
  height: {
    meters: number;
  }
}

// Shape of Result
interface GetRocketsQueryResult {
  rockets: Rocket[];
}

// RocketMainPage component
const RocketMainPage: React.FC = () => {
  // Using useQuery hook with TypeScript generics
  const { loading, error, data } = useQuery<GetRocketsQueryResult>(GET_ROCKETS_DETAILS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if data and rockets are present
  if (!data || !data.rockets.length) return <p>No rockets available.</p>;

  const rocketStatus: { [key: string]: number } = {
    "activeCount": 0,
    "inActiveCount": 0
  }

  const rocketMassMap: { [key: string]: number } = {
  };

  const rocketHeightMap: { [key: string]: number } = {
  };

  const rocketSuccessRateMap: { [key: string]: number } = {
  };

  const rocketLaunchCostMap: { [key: string]: number } = {
  };

  (data?.rockets)?.forEach(element => {

    if (element?.name != undefined) {

      rocketMassMap[element.name] = (element.mass.kg / (10000)) ?? 0;

      rocketHeightMap[element.name] = element.height.meters ?? 0;

      rocketSuccessRateMap[element.name] = element.success_rate_pct ?? 0;

      rocketLaunchCostMap[element.name] = element.cost_per_launch ?? 0;

      ++rocketStatus[+element.active];
    }
  });

  return (
    <div>
      <div>
        <RocketMassHeightBarChart massMap={rocketMassMap} heightMap={rocketHeightMap} />
      </div>
      <div className="overflow-x-auto mt-4">
        <div className="min-w-full">
          <RocketInfoTable rockets={data.rockets} />
        </div>
      </div>
    </div>
  );
};

export default RocketMainPage;
