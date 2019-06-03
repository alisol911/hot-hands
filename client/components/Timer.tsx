import * as React from 'react';

interface IProps {
    initialTime: number;
    finished: () => void;
}
interface IState {
    time: number;
}

export default class Timer extends React.Component<IProps, IState> {
    private decreaseTime: number;

    constructor(props, context) {
        super(props, context);
        this.state = { time: this.props.initialTime };
    }

    reset() {
        clearInterval(this.decreaseTime);
        this.setState({ time: this.props.initialTime });
    }

    initialize() {
        let self = this;
        this.decreaseTime = window.setInterval(() => {
            if (self.state.time > 0)
                self.setState({ time: self.state.time - 1 });
            else {
                self.props.finished();
            }
        }, 1000);
    }
    render() {
        return (
            <div>
                <svg width='120' height='120'>
                    <circle cx='60' cy='60' r='55'
                        strokeWidth='5' stroke='red' fill='white' />
                    <text x='50%' y='40%' textAnchor='middle' fill='red'
                        fontSize='2em'>{this.state.time}</text>
                    <text x='50%' y='60%' textAnchor='middle' fill='red'
                        fontSize='2em'>Timer</text>
                </svg>
            </div>
        );
    }
}