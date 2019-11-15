import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import SimpleMode from './simple-mode';
import AdvancedMode from './advanced-mode';

export default class App extends Component {
    render() {
        return(
            <Body>
                <Switch>
                    <Route exact path="/">
                        <SimpleMode />
                    </Route>

                    <Route path="/advanced">
                        <AdvancedMode/>
                    </Route>
                </Switch>
            </Body>
        )
    }
}

const Body = styled.div`
    width: 100%;
`