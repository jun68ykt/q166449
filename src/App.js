// App.js

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Page, Tab, Tabbar, Button} from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.css';

// HomePage タブ
const HomePage = (props) => (
    <Page>
        <Button onClick={props.omikuji}>Click !</Button>
    </Page>
);
HomePage.propTypes = {
    omikuji: PropTypes.func,
};

// SettingsPage タブ
const SettingsPage = (props) => (
    <Page>
        {props.scores.map((score) => (
            <div key={score.created_at}>{score.fortune}</div>
        ))}
    </Page>
);
SettingsPage.propTypes = {
    scores: PropTypes.arrayOf(
        PropTypes.shape({
            created_at: PropTypes.instanceOf(Date),
            fortune: PropTypes.string,
        })
    ),
};

// 親コンポーネント
class App extends Component {
    state = {scores: []};
    scoreItems = [];

    // タブの描画
    renderTabs = () => {
        return [
            {
                content: <HomePage key="Home" omikuji={this.handleOnClick} />,
                tab: <Tab key="Home" label="Home" icon="md-home" />,
            },
            {
                content: <SettingsPage key="settings" scores={this.state.scores} />,
                tab: <Tab key="settings" label="Settings" icon="md-settings" />,
            },
        ];
    };

    // HomePage タブのボタンクリックでイベント発火
    handleOnClick = () => {
        const fortunes = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];
        let num = Math.floor(Math.random() * fortunes.length);
        this.scoreItems.unshift({
            fortune: fortunes[num],
            created_at: new Date(),
        });
        this.setState({scores: this.scoreItems.slice()});
    };

    render() {
        return <Tabbar renderTabs={this.renderTabs} />;
    }
}

export default App;
