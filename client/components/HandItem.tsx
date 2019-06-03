import * as React from 'react';

enum State {
    NoneSelected,
    ThisSelected,
    OthersSelected
}

interface IProps {
    name: string;
    click?: (name) => void;
}

interface IState {
    selected: State;
}

export default class HandItem extends React.Component<IProps, IState> {
    constructor(props, context) {
        super(props, context);
        if (this.props.click === undefined)
            this.state = { selected: State.ThisSelected };
        else
            this.state = { selected: State.NoneSelected };
    }

    click() {
        if (this.state.selected === State.NoneSelected) {
            this.props.click(this.props.name);
            this.setState({ selected: State.ThisSelected });
        }
    }

    resetSelected() {
        this.setState({ selected: State.NoneSelected });
    }

    othersSelected() {
        this.setState({ selected: State.OthersSelected });
    }

    render() {
        let style = { height: '150px', width: '150px', margin: '10px' };
        if (this.state.selected === State.NoneSelected)
            style['cursor'] = 'pointer';
        else if (this.state.selected === State.OthersSelected)
            style['opacity'] = 0.2;

        return (
            <img style={style} src={'image/' + this.props.name + '.svg'}
                onClick={this.click.bind(this)} />
        );
    }
}
