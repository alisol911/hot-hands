import { getValue } from './api';

export function getHands() {
    return getValue('/api/hands');
}
