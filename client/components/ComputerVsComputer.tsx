import * as React from 'react';

import { throwHand } from '../api/hand';
import GameAbstractBase from './GameAbstractBase';

export default class ComputerVsComputer extends GameAbstractBase {

    initialize() {
        super.initialize();
        let self = this;
        const p1 = new Promise(resolve => setTimeout(() =>
            throwHand().then((result: any) => {
                self.setState({ player1Hand: result.result }, () => resolve());
            }), Math.random() * 4000));
        const p2 = new Promise(resolve => setTimeout(() =>
            throwHand().then((result: any) => {
                self.setState({ player2Hand: result.result }, () => resolve());
            }), Math.random() * 4000));
        Promise.all([p1, p2]).then(() => self.doJudge());
    }

    renderPlayer1Header() {
        return (<h2>Computer 1</h2>);
    }

    renderPlayer1Content() {
        return super.renderComputerPlayer('player1', this.state.player1Hand);
    }

    renderPlayer2Header() {
        return (<h2>Computer 2</h2>);
    }

    renderPlayer2Content() {
        return super.renderComputerPlayer('player2', this.state.player2Hand);
    }

    getWinnerText() {
        if (this.state.winner === 'Player2')
            return 'Computer2 WIN!';
        else if (this.state.winner === 'Player1')
            return 'Computer1 WIN!';
        else
            return this.state.winner;
    }

}