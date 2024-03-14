import React from "react";
import { withDI } from "../../hooks/withDI";
import getComingPresalesQuery from "../../queries/getComingPresales";
import { SubgraphService } from "../../services/subgraph";
import Box, { BoxData } from "../partials/Box";

interface State {
  presales: BoxData[] | null;
}

class LivePresalesInBox extends React.Component<any, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      presales: null,
    };
  }

  componentWillMount() {
    const subgraph: SubgraphService = this.props.subgraphImpl;
    subgraph
      .runQuery(getComingPresalesQuery, {
        limit: 3, // límite de proyectos para mostrar en home 
        offset: 0,
        orderBy: "startDate",
        orderDirection: "asc",
        currentDate: parseInt(new Date().getTime() / 1000 + ""),
      })
      .then((data: { sales: any[] }) => {
        this.setState({ presales: data.sales });
      });
  }

  render() {
    if (this.state.presales == null) {
      return <h2>Loading...</h2>;
    }

    let presales: any = [];

    {
      this.state.presales.map(async (presale: BoxData) => {
        presales.push(
          <Box
            key={presale.id}
            buyPrice={presale.buyPrice}
            minAllocation={presale.minAllocation}
            maxAllocation={presale.maxAllocation}
            hardcap={presale.hardcap}
            id={presale.id}
            token={presale.token}
            startDate={presale.startDate}
            projectInfo={presale.projectInfo}
          />
        );
      });
    }

    return presales;
  }
}

export default withDI(LivePresalesInBox);
