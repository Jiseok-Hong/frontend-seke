import React from 'react';
import logo from '../../logo.svg';
import styles from './styles.scss';
import withConnect from '../../utils/withConnect';
import { withRouter } from 'react-router-dom';

class DebugPage extends React.PureComponent {
    render() {
        return (
            <div className={styles.App}>
                <header className={styles.AppHeader}>
                    <img src={logo} className={styles.AppLogo} alt="logo" />
                    <p>
                        Edit
                        <code>src/App.js</code>
                        and save to reload.
                    </p>
                    <a className={styles.AppLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default withConnect()(withRouter(DebugPage));
