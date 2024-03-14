import { gql } from "graphql-request";

const getVestingSchedulesQuery = gql`
  query getVestingSchedules($token: {id:string}!) {
    vestingSchedules(where: { token: $token }) {
      id
      vesting
      token {
        id
        decimals
        name
        symbol
        totalSupply
      }
      beneficiary
      start
      cliff
      duration
      slicePeriodSeconds
      revocable
      revokedTime
      amount
    }
  }
`;

export default getVestingSchedulesQuery;
