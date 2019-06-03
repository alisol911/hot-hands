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
                <svg width='210' height='210'>
                    <circle cx='100' cy='100' r='95'
                        strokeWidth='5' stroke='red' fill='white' />
                    <text x='50%' y='40%' textAnchor='middle' fill='red' fontSize='3em'>{this.state.time}</text>
                    <text x='50%' y='60%' textAnchor='middle' fill='red' fontSize='3em'>Timer</text>
                </svg>
            </div>
        );
    }
}