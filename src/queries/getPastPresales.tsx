import { gql } from "graphql-request";

const getPastPresalesQuery = gql`
  query getPastPresales(
    $limit: Int!
    $offset: Int!
    $orderBy: Sale_orderBy
    $orderDirection: OrderDirection
    $currentDate: Int!
  ) {
    sales(
      first: $limit
      skip: $offset
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { endDate_lt: $currentDate }
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

export default getPastPresalesQuery;
