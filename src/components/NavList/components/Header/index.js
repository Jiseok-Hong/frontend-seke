import React, { useEffect, useState } from 'react';
import styles from './styles.scss';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import globalActions from 'store/global/actions';
import searchActions from 'store/search/actions';
//Matertial ui import
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
//Customized navigator from material UI

function Header({ dispatch, history, searchVal }) {
    const pathname = window.location.pathname;
    const [searchValue, setSearchValue] = useState(searchVal);
    const handleLogout = (e) => {
        dispatch(
            globalActions.showConfirmModal({
                title: 'Logout',
                message: 'Are you sure you want to log out? Confirm and Log out',
                confirmText: 'Yes',
                cancelText: 'No',
                confirmCallback: () => {
                    history.push('/login');
                },
                closeCallback: () => {},
            })
        );
    };
    const handleClear = (e) => {
        setSearchValue(null);
    };
    const handleSearchBar = (e) => {
        const {
            target: { value },
        } = e;
        setSearchValue(value);
    };
    const handleSubmit = (e) => {
        event.preventDefault();
        dispatch(searchActions.searchChange(searchValue));
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.searchBar}>
                <Paper component="form" className={styles.root} onSubmit={handleSubmit}>
                    <InputBase
                        className={styles.input}
                        placeholder="Search Here"
                        inputProps={{ 'aria-label': 'Search Here' }}
                        value={searchValue === null ? '' : searchValue}
                        onChange={handleSearchBar}
                    />
                    <IconButton
                        onClick={handleClear}
                        className={styles.iconButton}
                        aria-label="clear"
                        hidden={searchValue === null || searchValue === '' ? true : false}
                        style={{ outline: 'none' }}
                    >
                        <ClearIcon />
                    </IconButton>
                    <IconButton
                        type="submit"
                        className={styles.iconButton}
                        aria-label="search"
                        style={{ outline: 'none' }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        </header>
    );
}

Header.propTypes = {
    searchVal: PropTypes.string,
};

const mapStateToProps = ({ search }) => {
    return { searchVal: search.searchValue };
};
export default withConnect(mapStateToProps)(withRouter(Header));
