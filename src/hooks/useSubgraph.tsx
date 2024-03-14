import { useMemo } from 'react';
import { SubgraphService } from '../services/subgraph';

export default function useSubgraph() {
    return useMemo(() => new SubgraphService(), []);
}