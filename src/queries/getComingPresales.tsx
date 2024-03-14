import { gql } from "graphql-request";

const getComingPresalesQuery = gql`
  query getComingPresales(
    $limit: Int!
    $offset: Int!
    $orderBy: Sale_orderBy
    $orderDirection: String!
    $currentDate: Int!
  ) {
    sales(
      first: $limit
      skip: $offset
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { startDate_gt: $currentDate }
    ) {
      id
      token{
        id
        decimals
        symbol
        totalSupply
        name
      }
      buyPrice
      softcap
      hardcap
      minAllocation
      maxAllocation
      startDate
      endDate
      projectInfo
      totalCollected
    }
  }
`;

export default getComingPresalesQuery;
