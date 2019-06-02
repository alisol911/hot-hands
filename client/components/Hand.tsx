import * as React from 'react';
import { Link } from 'react-router-dom';

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
    private decreaseTime: number;

    constructor(props, context) {
        super(props, context);
        this.state = {list: [], time: 5,
            player1Hand: 'Nothing', player2Hand: 'Nothing',
            winner: ''
        };
        let self = this;
        getHands().then((result: any) => {
            self.setState({list: result.result});
        });
        this.initialize();
    }

    initialize() {
        let self = this;
        throwHand().then((result: any) => {
            self.setState({player1Hand: result.result});
        });
        this.decreaseTime = setInterval(() => {
            if (self.state.time > 0)
                self.setState({time: self.state.time - 1});
            else {
                self.doJudge();
            }
        }, 1000);
    }

    tryAgain() {
        this.setState({time: 5, player1Hand: 'Nothing',
            player2Hand: 'Nothing', winner: ''}, () => this.initialize());
    }
    
    doJudge() {
        if (this.state.winner === '') {
            judge({hand1: this.state.player1Hand, hand2: this.state.player2Hand}).then((result: any) => {
                this.setState({winner: result.result});
            });
            clearInterval(this.decreaseTime);
        }
    }

    clickHand(name) {
        if (this.state.player2Hand === 'Nothing') {
            let self = this;
            this.setState({player2Hand: name}, () => self.doJudge());
        }
    }

    render() {
        let player1;
        if (this.state.winner === '')
            player1 = (
                <div>
                    <h3>Timer</h3>
                    <h2>{this.state.time}</h2>
                </div>);
        else
        player1 = (
                <div>
                    <h2>{this.state.winner}</h2>
                    <HandItem key='player1' name={this.state.player1Hand}
                        selected={this.state.player1Hand}
                        click={() => {}}/>
                    <button onClick={this.tryAgain.bind(this)}>Try again</button>
            </div>
        );
        return (
            <div className='hand-main'>
                {player1}
                <h2>Computer</h2>
                <h2>Player</h2>
                <div>Choose your hand</div>
                {this.state.list.map(h =>
                    <HandItem key={h} name={h}
                        selected={this.state.player2Hand}
                        click={this.clickHand.bind(this)}/>
                )}
            </div>
        );
    }
}
