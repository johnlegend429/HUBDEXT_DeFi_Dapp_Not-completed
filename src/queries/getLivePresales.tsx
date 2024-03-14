import { gql } from "graphql-request";

const getLivePresalesQuery = gql`
  query getLivePresales(
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
      where: { startDate_lte: $currentDate, endDate_gt: $currentDate }
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

export default getLivePresalesQuery;
