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

const FORTUNES = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];

// 親コンポーネント
class App extends Component {
    state = { scores: [], index: 0 };

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
        const num = Math.floor(Math.random() * FORTUNES.length);
        const newItem = {
            fortune: FORTUNES[num],
            created_at: new Date(),
        };
        this.setState({ scores: [ newItem, ...this.state.scores ] });
    };

    render() {
        return (
            <Tabbar
                renderTabs={this.renderTabs}
                onPreChange={({ index }) => this.setState({ index })}
                index={this.state.index}
            />);
    }
}

export default App;
