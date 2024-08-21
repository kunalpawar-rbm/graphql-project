import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CapsuleInfoTable from './CapsuleInfoTable';
import CapsulePieChart from './CapsulePieStatusChart';
import CapsuleTypesBarChart from './CapsuleTypesBarChart';

// Define the GraphQL query
const GET_CAPSULES_DETAILS = gql`
  query GetCapsulesDetails {
    capsules {
      id
      type
      reuse_count
      status
    }
  }
`;

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

// CapsuleInfoTableContainer component
const CapsuleMainPage: React.FC = () => {
  // Using useQuery hook with TypeScript generics
  const { loading, error, data } = useQuery<GetCapsulesQueryResult>(GET_CAPSULES_DETAILS);

  const capsuleStatus: { [key: string]: number } = {
    "retired": 0,
    "unknown": 0,
    "active": 0,
    "destroyed": 0,
  }

  const capsuleTypes: { [key: string]: number } = {
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  (data?.capsules)?.forEach(element => {
    // Calculating frequency of status
    if (element.status) ++capsuleStatus[element.status];

    // Calculating frequency of capsule types
    if (element.type) {
      if (capsuleTypes[element.type] == undefined) {
        capsuleTypes[element.type] = 0;
      } else {
        ++capsuleTypes[element.type];
      }
    }
  });

  return (
    <div>
      <div className="flex">
        <div className="flex-1 p-2">
          <CapsuleTypesBarChart types={capsuleTypes}/>
        </div>
        <div className="flex-1 p-2 flex items-center justify-center">
          <CapsulePieChart statusMap={capsuleStatus} />
        </div>
      </div>
      <CapsuleInfoTable capsules={data?.capsules} />
    </div>
  );
};

export default CapsuleMainPage;
