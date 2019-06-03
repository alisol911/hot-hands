import * as React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import HandItem from './HandItem';
import Timer from './Timer';
import { getHands, throwHand, judge } from '../api/hand';

interface IState {
    list: Array<string>;
    player1Hand: string;
    player2Hand: string;
    winner: string;
}

export default class Hand extends React.Component<{}, IState> {
    private timer: React.RefObject<Timer>;
    private handItems: object;
    constructor(props, context) {
        super(props, context);
        this.state = {
            list: [],
            player1Hand: 'Nothing', player2Hand: 'Nothing',
            winner: ''
        };
        this.timer = React.createRef();
        this.handItems = {};
    }

    componentDidMount() {
        let self = this;
        getHands().then((result: any) => {
            self.setState({ list: result.result });
        });
        this.initialize();
    }

    initialize() {
        let self = this;
        throwHand().then((result: any) => {
            self.setState({ player1Hand: result.result });
        });
        this.timer.current.initialize();
    }

    tryAgain() {
        this.setState({
            player1Hand: 'Nothing',
            player2Hand: 'Nothing', winner: ''
        }, () => this.initialize());
        for (let k in this.handItems) {
            (this.handItems[k] as HandItem).resetSelected();
        }

    }

    doJudge() {
        if (this.state.winner === '') {
            for (let k in this.handItems) {
                if (k !== this.state.player2Hand)
                    (this.handItems[k] as HandItem).othersSelected();
            }
            judge({ hand1: this.state.player1Hand, hand2: this.state.player2Hand }).then((result: any) => {
                this.setState({ winner: result.result });
            });
            this.timer.current.reset();
        }
    }

    clickHand(name) {
        if (this.state.player2Hand === 'Nothing') {
            let self = this;
            this.setState({ player2Hand: name }, () => self.doJudge());
        }
    }

    render() {
        let player1;
        let result;
        if (this.state.winner === '') {
            result = (
                <div>
                    <h2>Computer</h2>
                    <svg width='500' height='10'><line x1='0' y1='0' x2='500' y2='0' strokeWidth='3' stroke='black' /></svg>
                    <h2>Player</h2>
                    <div>Choose your hand</div>
                </div>
            );
            player1 = (<Timer initialTime={5} ref={this.timer}
                finished={this.doJudge.bind(this)} />);
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
                    <span id='game-result' style={{ fontSize: '40pt' }}>{resultText}</span><p />
                    <button onClick={this.tryAgain.bind(this)} type='button'
                        style={{ marginLeft: '10px', marginRight: '10px' }} className='btn btn-primary'>Try again</button>
                    <BrowserRouter>
                        <Link type='button' className='btn btn-primary' to='/'
                            style={{ marginLeft: '10px', marginRight: '10px' }}>
                            Change Mode
                        </Link>
                    </BrowserRouter>
                </div>
            );
            player1 = (
                <HandItem key='player1' name={this.state.player1Hand}/>
            );
        }
        return (
            <div className='hand-main'>
                <div className='vertical-center-container' style={{ margin: '10px', height: '220px' }}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {player1}
                        </div>
                    </div>
                </div>
                <div className='vertical-center-container' style={{ height: '150px' }}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {result}
                        </div>
                    </div>
                </div>
                <div id='hand-list'>
                    {this.state.list.map(h =>
                        <HandItem key={h} name={h}
                            click={this.clickHand.bind(this)}
                            ref={(instance) => { this.handItems[h] = instance; }} />
                    , this)}
                </div>
            </div>
        );
    }
}
