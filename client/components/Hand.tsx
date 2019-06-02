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

export default class Hand extends React.Component<{}, State> {
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
        this.decreaseTime = window.setInterval(() => {
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
        let result;
        if (this.state.winner === '') {
            result = (
                <div>
                    <h2>Computer</h2>
                    <svg width='500' height='10'><line x1='0' y1='0' x2='500' y2='0' strokeWidth='3' stroke='black'/></svg>
                    <h2>Player</h2>
                    <div>Choose your hand</div>
                </div>
            );
            player1 = (
                <div>
                    <svg width='210' height='210'>
                        <circle cx='100' cy='100' r='95'
                            strokeWidth='5' stroke='red' fill='white'/>
                        <text x='50%' y='40%' textAnchor='middle' fill='red' fontSize='3em'>{this.state.time}</text>
                        <text x='50%' y='60%' textAnchor='middle' fill='red' fontSize='3em'>Timer</text>
                    </svg>
                </div>);
        }
        else {
            let resultText;
            if (this.state.winner === 'Player2')
                resultText = 'YOU WIN!';
            else if (this.state.winner === 'Player1')
                resultText = 'YOU LOSE!';
            else
                resultText = this.state.winner;
            result = (
                <div>
                    <span style={{fontSize: '40pt'}}>{resultText}</span><p/>
                    <button onClick={this.tryAgain.bind(this)} type='button'
                        style={{marginLeft: '10px', marginRight: '10px'}} className='btn btn-primary'>Try again</button>
                    <Link type='button' className='btn btn-primary' to='/'
                        style={{marginLeft: '10px', marginRight: '10px'}}>
                        Change Mode
                    </Link>
                </div>
            );
            player1 = (
                <HandItem key='player1' name={this.state.player1Hand}
                    selected={this.state.player1Hand}
                    click={() => {}}/>
            );
        }
        return (
            <div className='hand-main'>
                <div className='vertical-center-container' style={{margin: '10px', height: '220px'}}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {player1}
                        </div>
                    </div>
                </div>
                <div className='vertical-center-container' style={{height: '150px'}}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {result}
                        </div>
                    </div>
                </div>
                <div id='hand-list'>
                    {this.state.list.map(h =>
                        <HandItem key={h} name={h}
                            selected={this.state.player2Hand}
                            click={this.clickHand.bind(this)}/>
                    )}
                </div>
            </div>
        );
    }
}
