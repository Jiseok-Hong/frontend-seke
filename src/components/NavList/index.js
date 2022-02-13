import React from 'react';
import styles from './styles.scss';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import Navbar from 'components/NavList/components/Navbar';
import Header from 'components/NavList/components/Header';
import PropTypes from 'prop-types';
//UI material import

function NavList({ children, opens }) {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.main}>
                {opens ? <div className={styles.cover}></div> : ''}
                <Header />
                {children}
            </div>
        </div>
    );
}

const mapStateToProps = ({ navbar }) => {
    return { opens: navbar.open };
};
export default withConnect(mapStateToProps)(withRouter(NavList));
