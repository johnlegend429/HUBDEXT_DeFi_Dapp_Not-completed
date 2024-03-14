import React from "react";
import { withDI } from "../../hooks/withDI";
import getLastPresalesQuery from "../../queries/getAllPresales";
import { SubgraphService } from "../../services/subgraph";
import Slider, { SliderData } from "../partials/Slider";

interface State {
  presales: SliderData[] | null;
}

class PromotedInSlider extends React.Component<any, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      presales: null,
    };
  }

  componentWillMount() {
    const subgraph: SubgraphService = this.props.subgraphImpl;
    subgraph
      .runQuery(getLastPresalesQuery, {
        limit: 100,
        offset: 0,
        orderBy: "startDate",
        orderDirection: "asc",
      })
      .then(async (data: { sales: any[] }) => {
        const ipfs = this.props.ipfsImpl;

        let i = 0;
        let fileCount = data.sales.length;
        let finalData: any[] = [];
        for (let entity of data.sales) {
          // eslint-disable-next-line no-loop-func
          ipfs.getJsonFile(entity.projectInfo).then((data: { featured_related_projects: boolean | null }) => {
            i = i + 1;
            if (data.featured_related_projects === true) {
              finalData.push(entity);
            }
            if (fileCount === i) {
              this.setState({ presales: finalData });
            }
          });
        }
      });
  }

  render() {
    if (this.state.presales == null) {
      // Note: <h2> was causing a React error 'The node to be removed is not a child of this node'
      return 'Loading...';
    }

    let presales: any = [];

    this.state.presales.map(async (presale: SliderData) => {
      presales.push(
        <Slider
          key={presale.id}
          buyPrice={presale.buyPrice!}
          minAllocation={presale.minAllocation!}
          maxAllocation={presale.maxAllocation!}
          hardcap={presale.hardcap!}
          id={presale.id}
          token={presale.token}
          startDate={presale.startDate}
          projectInfo={presale.projectInfo}
        />
      );
    });

    return presales;
  }
}

export default withDI(PromotedInSlider);
