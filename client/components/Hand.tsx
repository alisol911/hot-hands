import * as React from 'react';

import HandItem from './HandItem';
import { getHands, throwHand, judge } from '../api/hand';

interface State {
    list: Array<string>;
    time: number;
    player1Hand: string;
    player2Hand: string;
    winner: string;
}

export default class Hand extends React.Component<void, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {list: [], time: 5,
                player1Hand: 'Nothing', player2Hand: 'Nothing',
                winner: ''
            };
        let self = this;
        getHands().then((result: any) => {
            self.setState({list: result.result});
            let decreaseTime = setInterval(() => {
                if (self.state.time > 0)
                    self.setState({time: self.state.time - 1});
                else {
                    judge({hand1: self.state.player1Hand, hand2: self.state.player2Hand}).then((result: any) => {
                        self.setState({winner: result.result});
                    });
                    clearInterval(decreaseTime);
                }
            }, 1000);
        });
        throwHand().then((result: any) => {
            self.setState({player1Hand: result.result});
        });
    }

    clickHand(name) {
        if (this.state.player2Hand === 'Nothing')
            this.setState({player2Hand: name});
    }

    render() {
        return (
            <div className='hand-main'>
                <h2>{this.state.winner}</h2>
                <h3>Timer</h3>
                <h2>{this.state.time}</h2>
                <h2>Computer</h2>
                <h2>Player</h2>
                <div>Choose your hand</div>
                {this.state.list.map(h =>
                    <HandItem key={h} name={h} click={this.clickHand.bind(this)}/>
                )}
            </div>
        );
    }
}
