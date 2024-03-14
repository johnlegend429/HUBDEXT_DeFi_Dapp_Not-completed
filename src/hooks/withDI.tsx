import { Params, useParams } from 'react-router-dom';
import { IpfsService } from '../services/ipfs';
import { MathService } from '../services/math';
import { SubgraphService } from '../services/subgraph';
import { WalletService } from '../services/wallet';
import useIpfs from './useIpfs';
import useMath from './useMath';
import useSubgraph from './useSubgraph';
import useWallet from './useWallet';

export type DIContainer = {
    ipfsImpl: IpfsService;
    walletImpl: WalletService;
    mathImpl: MathService;
    subgraphImpl: SubgraphService;
    routerParams: Params;
}

export const withDI = (Component: any) => {
  return (props: any) => {
    const ipfs = useIpfs();
    const math = useMath();
    const wallet = useWallet(math);
    const subgraph = useSubgraph();
    const params = useParams();

    return <Component 
        ipfsImpl={ipfs} 
        walletImpl={wallet}
        mathImpl={math}
        subgraphImpl={subgraph}
        routerParams={params}
        {...props} 
    />;
  };
};