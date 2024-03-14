import React from "react";
import { withDI } from '../../hooks/withDI';
import getComingPresalesQuery from "../../queries/getComingPresales";
import { SubgraphService } from "../../services/subgraph";
import Row, { RowData } from "../partials/Row";

interface State {
  presales: RowData[] | null;
}

class ComingPresalesInRow extends React.Component<any, State> {
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
      return <img className="nothing" src="https://i.pinimg.com/originals/0b/8c/08/0b8c081b7b05dcc0aad6238856ea87d2.gif"
                  alt=""/>;
    }

    let presales: any = [];

    this.state.presales.map(async (presale: RowData) => {
      presales.push(
        <Row
          key={presale.id}
          id={presale.id}
          token={presale.token}
          buyPrice={presale.buyPrice}
          hardcap={presale.hardcap}
          startDate={presale.startDate}
          endDate={presale.endDate}
          type="COMING"
          projectInfo={presale.projectInfo}
          totalCollected={presale.totalCollected}
        />
      );
    });

    return presales;
  }
}

export default withDI(ComingPresalesInRow);
