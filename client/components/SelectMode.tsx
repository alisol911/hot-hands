import * as React from 'react';
import { Link } from 'react-router-dom';

export default class SelectMode extends React.Component<{}, {}> {

    render() {
        return (
            <div className='hand-main'>
                <h1 className='color-test'>Hot Hands!</h1>
                <div>Select play mode</div>
                <div style={{ margin: '40px' }} >
                    <Link type='button' className='btn btn-primary' to='/computer-vs-player'>
                        Computer VS Player
                    </Link>
                </div>
                <div style={{ margin: '40px' }} >
                    <Link type='button' className='btn btn-primary' to='/computer-vs-computer'>
                        Computer VS Computer
                    </Link>
                </div>
            </div>
        );
    }
}
