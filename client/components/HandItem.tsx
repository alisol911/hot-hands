import * as React from 'react';

interface Props {
    name: string;
    click: (name) => void;
}

interface State {

}

export default class HandItem extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <img style={{cursor: 'pointer'}} src={'image/' + this.props.name + '.svg'}
                onClick={() => this.props.click(this.props.name)}/>
        );
    }
}
