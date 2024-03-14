import { gql } from "graphql-request";

const getDataFromSaleQuery = gql`
  query getDataFromPresales(
    $limit: Int!
    $offset: Int!
    $orderBy: Sale_orderBy
    $orderDirection: OrderDirection
    $saleAddress: String!
  ) {
    sales(
      first: $limit
      skip: $offset
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { id: $saleAddress }
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

export default getDataFromSaleQuery;
