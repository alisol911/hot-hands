import * as React from 'react';

interface IProps {
    selected: string;
    name: string;
    click: (name) => void;
}

export default class HandItem extends React.Component<IProps, {}> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let style = { cursor: 'pointer', margin: '10px' };
        if (this.props.selected !== 'Noting' && this.props.selected !== this.props.name)
            style['opacity'] = 0.4;
        return (
            <img style={style} src={'image/' + this.props.name + '.svg'}
                onClick={() => this.props.click(this.props.name)} />
        );
    }
}
