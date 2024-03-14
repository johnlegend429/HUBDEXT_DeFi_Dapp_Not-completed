import { useMemo } from 'react';
import { MathService } from '../services/math';
import { WalletService } from '../services/wallet';

export default function useWallet(math: MathService) {
    return useMemo(() => new WalletService(math), [math]);
}