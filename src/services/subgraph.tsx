import { GraphQLClient } from "graphql-request";

export class SubgraphService {
  private gqlClient = new GraphQLClient(process.env.REACT_APP_SUBGRAPH_URI!);


  async runQuery(query: any, params: any): Promise<any> {
    return await this.gqlClient.request(query, params);
  }
}
