import * as React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';

import HandItem from './HandItem';
import Timer from './Timer';
import { judge } from '../api/hand';

interface IProps {
    testMode?: boolean;
}

interface IState {
    list: Array<string>;
    player1Hand: string;
    player2Hand: string;
    winner: string;
    showResult: boolean;
}

export default abstract class GameAbstractBase extends React.Component<IProps, IState> {
    private timer: React.RefObject<Timer>;
    constructor(props, context) {
        super(props, context);
        this.state = {
            list: [],
            player1Hand: 'Nothing', player2Hand: 'Nothing',
            winner: '',
            showResult: false
        };
        this.timer = React.createRef();
    }

    componentDidMount() {
        this.initialize();
    }

    initialize() {
        this.timer.current.initialize();
    }

    tryAgain() {
        this.setState({
            player1Hand: 'Nothing',
            player2Hand: 'Nothing',
            winner: '',
            showResult: false
        }, () => this.initialize());
    }

    doJudge() {
        if (this.state.winner === '') {
            judge({ hand1: this.state.player1Hand, hand2: this.state.player2Hand }).then((result: any) => {
                this.setState({ winner: result.result, showResult: true });
                this.timer.current.reset();
            });
        }
    }

    renderComputerPlayer(name: string, value: string) {
        if (this.state.winner === '')
            return (<div>
                <svg width='165' height='165'>
                    <circle cx='80' cy='80' r='75'
                        strokeWidth='5' stroke='green' fill='white' />
                </svg>
            </div>);
        else
            return (
                <HandItem key={name} name={value} />
            );
    }

    renderPlayer1Header() { return (<div />); }
    renderPlayer1Content() { return (<div />); }
    renderPlayer2Header() { return (<div />); }
    renderPlayer2Content() { return (<div />); }
    getWinnerText() { return '';}
    render() {
        let result = (<div/>);
        if (this.state.winner !== '') {
            let linkToHome = (
                <Link type='button' className='btn btn-primary' to='/'
                    style={{ marginLeft: '10px', marginRight: '10px' }}>
                    Change Mode
                </Link>
            );
            if (this.props.testMode)
                linkToHome = (
                    <BrowserRouter>
                        {linkToHome}
                    </BrowserRouter>
                );
            result = (
                <Modal open={this.state.showResult}
                    onClose={this.tryAgain.bind(this)}
                    classNames={{
                        overlay: 'custom-overlay'
                    }}
                    center>
                    <span id='game-result' style={{ fontSize: '40pt' }}>{this.getWinnerText()}</span><p />
                    <button onClick={this.tryAgain.bind(this)} type='button'
                        style={{ marginLeft: '10px', marginRight: '10px' }} className='btn btn-primary'>Try again</button>
                    {linkToHome}
                </Modal>
            );
        }
        return (
            <div className='hand-main'>
                {result}
                <div className='vertical-center-container' style={{ margin: '10px', height: '160px' }}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {this.renderPlayer1Content()}
                        </div>
                    </div>
                </div>
                <div className='vertical-center-container' style={{ height: '150px' }}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {this.renderPlayer1Header()}
                            <svg width='500' height='10'><line x1='0' y1='0' x2='500' y2='0' strokeWidth='3' stroke='black' /></svg>
                            <Timer initialTime={5} ref={this.timer}
                                finished={this.doJudge.bind(this)} />
                            <svg width='500' height='10'><line x1='0' y1='0' x2='500' y2='0' strokeWidth='3' stroke='black' /></svg>
                            {this.renderPlayer2Header()}
                        </div>
                    </div>
                </div>
                <div className='vertical-center-container' style={{ margin: '10px', height: '160px' }}>
                    <div className='vertical-center-cell'>
                        <div className='vertical-center-box'>
                            {this.renderPlayer2Content()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
