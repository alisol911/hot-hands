import { getValue, setValue } from './api';

export function getHands() {
    return getValue('/api/hand/types');
}

export function throwHand() {
    return getValue('/api/hand/throw');
}

export function judge(value) {
    return setValue('/api/hand/judge', value);
}
