import * as React from 'react';
import { Link, Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import SelectMode from './components/SelectMode';
import ComputerVsPlayer from './components/ComputerVsPlayer';
import ComputerVsComputer from './components/ComputerVsComputer';

interface IAppProps extends React.Props<any> {

}

export class App extends React.Component<IAppProps, any> {

    constructor(props, context){
        super(props, context)
        Notification.requestPermission();
    }
    render() {

        return (
            <div>
                <Switch>
                    <Route exact path='/' component={SelectMode}/>
                    <Route exact path='/computer-vs-player' component={ComputerVsPlayer}/>
                    <Route exact path='/computer-vs-computer' component={ComputerVsComputer}/>
                </Switch>
            </div>
        );
    }
}
