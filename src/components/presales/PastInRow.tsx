import React from "react";
import { withDI } from '../../hooks/withDI';
import getPastPresalesQuery from "../../queries/getPastPresales";
import { SubgraphService } from "../../services/subgraph";
import RowTwo, { RowData } from "../partials/RowTwo";

interface State {
  presales: RowData[] | null;
}

class PastPresalesInRow extends React.Component<any, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      presales: null,
    };
  }

  componentWillMount() {
    const subgraph: SubgraphService = this.props.subgraphImpl;
    subgraph
      .runQuery(getPastPresalesQuery, {
        limit: 100,
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
    if (this.state.presales.length === 0) {
      return <h2>NADA!!</h2>;
    }

    let presales: any = [];

    this.state.presales.map(async (presale: RowData) => {
      presales.push(
        <RowTwo
          key={presale.id}
          id={presale.id}
          token={presale.token}
          buyPrice={presale.buyPrice}
          hardcap={presale.hardcap}
          startDate={presale.startDate}
          endDate={presale.endDate}
          type="PAST"
          className="past-presale"
          projectInfo={presale.projectInfo}
          totalCollected={presale.totalCollected}
        />
      );
    });

    return presales;
  }
}

export default withDI(PastPresalesInRow);
