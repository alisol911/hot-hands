import * as React from 'react';
import { Link, Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import Hand from './Hand';

interface IAppProps extends React.Props<any> {

}

export class App extends React.Component<IAppProps, any> {

    constructor(props, context){
        super(props, context)
        Notification.requestPermission();
    }
    render() {
        const { children } = this.props;
        const isLoggedIn = true;

        return (
            <div>
                <nav className='navbar navbar-light'>
                    <ul className='nav navbar-nav'>
                        <li><Link to='/'>Homes</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={Hand}/>
                </Switch>
            </div>
        );
    }
}

export class RoutedApp extends React.Component<IAppProps, any> {

    constructor(props, context){
        super(props, context)
        Notification.requestPermission();
    }
    render() {
        const { children } = this.props;
        const isLoggedIn = true;

        return (
            <div className={'main'}>
                <Switch>
                    <Route exact path='/' component={Hand} />
                </Switch>
            </div>
        );
    }
}