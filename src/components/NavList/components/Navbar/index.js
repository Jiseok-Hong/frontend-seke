import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.scss';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import navbarActions from 'store/navbar/actions';
import { useMediaQuery } from 'react-responsive';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';

const checkNavi = (pathname) => {
    switch (pathname) {
        case '/':
            return 0;
        case '/old':
            return 1;
        default:
            return 0;
    }
};
function pathSlice(path) {
    let temp = path.split('/');
    temp = temp.slice(0, 2).join('/').toLowerCase();
    return temp;
}

function useOutsideAlerter(ref, props) {
    useEffect(() => {
        function handleClickOutside(event) {
            const { dispatch, opens } = props;
            event.stopPropagation();
            if (opens && ref.current && !ref.current.contains(event.target)) {
                dispatch(navbarActions.navbarOpenTrue());
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
}

function Navbar(props) {
    const pathnamed = pathSlice(window.location.pathname);
    let valued = checkNavi(pathnamed);
    const ismobile = useMediaQuery({ maxWidth: 768 });
    const [value, setValue] = useState(valued);
    const [path, setPath] = useState(pathnamed);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);
    const { dispatch, opens } = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const closeNav = (event) => {
        dispatch(navbarActions.navbarOpenTrue(true));
    };

    useEffect(() => {
        const path = window.location.pathname;
        setPath(pathSlice(path));
        dispatch(navbarActions.navbarOpenTrue(false));
    }, []);

    return (
        <AppBar
            className={styles.tabContainer}
            style={{
                width: opens ? '17em' : '0%',
            }}
            position="static"
            ref={wrapperRef}
        >
            <div
                className={styles.logoContainer}
                style={{
                    width: opens ? '15em' : '1em',
                }}
            >
                <IconButton className={styles.button} onClick={closeNav}>
                    {opens ? <CloseIcon style={{ fontSize: 35 }} /> : <MenuIcon style={{ fontSize: 35 }} />}
                </IconButton>
            </div>
            <Tabs
                orientation={ismobile ? 'horizontal' : 'vertical'}
                value={value}
                onChange={handleChange}
                aria-label="navigator"
                className={styles.tapWrapper}
            >
                <Tab
                    icon={<HomeOutlinedIcon />}
                    component={Link}
                    to="/"
                    style={{
                        backgroundColor: path === '/' ? '#f7971e' : '',
                        color: path === '/' ? 'white' : 'black',
                    }}
                    label="New Incremental R.F"
                    className={styles.tab}
                />

                <Tab
                    icon={<NoteOutlinedIcon />}
                    component={Link}
                    to="/old"
                    style={{
                        backgroundColor: path === '/old' ? '#f7971e' : '',
                        color: path === '/old' ? 'white' : 'black',
                    }}
                    label="Existing Incremetal R.F"
                    className={styles.tab}
                />
            </Tabs>
        </AppBar>
    );
}
const mapStateToProps = ({ navbar }) => {
    return { opens: navbar.open };
};
export default withConnect(mapStateToProps)(withRouter(Navbar));
