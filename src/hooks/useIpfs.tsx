import { useMemo } from 'react';
import { IpfsService } from '../services/ipfs';

export default function useIpfs() {
    return useMemo(() => new IpfsService(), []);
}