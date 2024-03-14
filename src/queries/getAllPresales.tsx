import { gql } from "graphql-request";

const getLastPresalesQuery = gql`
  query getAllPresales(
    $limit: Int!
    $offset: Int!
    $orderBy: Sale_orderBy
    $orderDirection: OrderDirection
  ) {
    sales(
      first: $limit
      skip: $offset
      orderBy: $orderBy
      orderDirection: $orderDirection
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

export default getLastPresalesQuery;
