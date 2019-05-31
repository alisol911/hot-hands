import { getValue, setValue } from './api';

export function getHands() {
    return getValue('/api/hands');
}

export function throwHand() {
    return getValue('/api/throw');
}

export function judge(value) {
    return setValue('/api/judge', value);
}
