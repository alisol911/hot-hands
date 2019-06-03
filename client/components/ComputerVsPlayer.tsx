import * as React from 'react';

import { getHands, throwHand } from '../api/hand';
import GameAbstractBase from './GameAbstractBase';
import HandItem from './HandItem';

export default class ComputerVsPlayer extends GameAbstractBase {
    private handItems: object;

    constructor(props, context) {
        super(props, context);
        this.handItems = {};
    }

    componentDidMount() {
        let self = this;
        getHands().then((result: any) => {
            self.setState({ list: result.result });
        });
        super.componentDidMount();
    }

    initialize() {
        super.initialize();
        let self = this;
        throwHand().then((result: any) => {
            self.setState({ player1Hand: result.result });
        });
    }

    tryAgain() {
        super.tryAgain();
        for (let k in this.handItems) {
            (this.handItems[k] as HandItem).resetSelected();
        }
    }

    doJudge() {
        super.doJudge();
        for (let k in this.handItems) {
            if (k !== this.state.player2Hand)
                (this.handItems[k] as HandItem).othersSelected();
        }
    }

    renderPlayer1Header() {
        return (<h2>Computer</h2>);
    }

    renderPlayer1Content() {
        return super.renderComputerPlayer('player1', this.state.player1Hand);
    }

    renderPlayer2Header() {
        return (<h2>Player</h2>);
    }

    clickHand(name) {
        if (this.state.player2Hand === 'Nothing') {
            let self = this;
            this.setState({ player2Hand: name }, () => self.doJudge());
        }
    }

    renderPlayer2Content() {
        return (
            <div id='hand-list'>
                {this.state.list.map(h =>
                    <HandItem key={h} name={h}
                        click={this.clickHand.bind(this)}
                        ref={(instance) => { this.handItems[h] = instance; }} />
                    , this)}
            </div>
        );
    }

    getWinnerText() {
        if (this.state.winner === 'Player2')
            return 'YOU WIN!';
        else if (this.state.winner === 'Player1')
            return 'YOU LOSE!';
        else
            return this.state.winner;
    }
}