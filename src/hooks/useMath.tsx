import { useMemo } from 'react';
import { MathService } from '../services/math';

export default function useMath() {
    return useMemo(() => new MathService(), []);
}