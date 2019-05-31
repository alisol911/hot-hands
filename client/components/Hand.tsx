import * as React from 'react';

import { getHands } from '../api/hand';

interface State {
    list: Array<string>;
}

export default class Home extends React.Component<void, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {list: []};
        let self = this;
        getHands().then((result: any) => {
            self.setState({list: result.result});
        });
    }

    render() {
        return (
            <div className='hand-main'>
                <h1 className='color-test'>Hot Hands!</h1>
                {this.state.list.map(h =>
                    <img src={'image/' + h + '.svg'}
                        key={h}/>
                )}
            </div>
        );
    }
}
