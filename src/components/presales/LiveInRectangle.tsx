import React from "react";
import { withDI } from '../../hooks/withDI';
import getLastPresalesQuery from '../../queries/getAllPresales';
import getLivePresalesQuery from "../../queries/getLivePresales";
import { SubgraphService } from "../../services/subgraph";
import Rectangle, { RectangleData } from "../partials/Rectangle";

interface State {
  presales: RectangleData[] | null;
}

class LivePresalesInRectangle extends React.Component<any, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      presales: null,
    };
  }

  componentWillMount() {
    const subgraph = new SubgraphService();
    const ipfs = this.props.ipfsImpl;
    subgraph
      .runQuery(getLivePresalesQuery, {
        limit: 100,
        offset: 0,
        orderBy: "startDate",
        orderDirection: "asc",
        currentDate: parseInt(new Date().getTime() / 1000 + ""),
      })
      .then((data: { sales: any[] }) => {
        let finalData: any = {};
        for (let sale of data.sales) {
          finalData[sale.id] = sale;
        }
        subgraph
          .runQuery(getLastPresalesQuery, {
            limit: 100,
            offset: 0,
            orderBy: "startDate",
            orderDirection: "asc",
          })
          .then(async (data: { sales: any[] }) => {

            let i = 0;
            let fileCount = data.sales.length;
            for (let entity of data.sales) {
              // eslint-disable-next-line no-loop-func
              ipfs.getJsonFile(entity.projectInfo).then((data: { featured_related_projects: boolean | null }) => {
                i = i + 1;
                if (data.featured_related_projects === true) {
                  finalData[entity.id] = entity;
                }
                if (fileCount === i) {
                  this.setState({ presales: Object.values(finalData) });
                }
              });
            }
          });

      });
  }

  render() {
    if (this.state.presales == null) {
      return;
    }

    let presales: any = [];

    {
      this.state.presales.map(async (presale: RectangleData) => {
        presales.push(
          <Rectangle
            key={presale.id}
            buyPrice={presale.buyPrice}
            minAllocation={presale.minAllocation}
            maxAllocation={presale.maxAllocation}
            hardcap={presale.hardcap}
            id={presale.id}
            token={presale.token}
            /* endDate={presale.endDate} */
            startDate={presale.startDate}
            projectInfo={presale.projectInfo}
            totalCollected={presale.totalCollected}
          />
        );
      });
    }

    return presales;
  }
}

export default withDI(LivePresalesInRectangle);
