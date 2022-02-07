import React, { useState, useEffect } from 'react';
import styles from './styles.scss';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import globalActions from 'store/global/actions';

function SubmitButton({ modified, isUpdated, history: { push }, location: { pathname }, dispatch }) {
    const handleConfirm = (e) => {
    };
    return (
        <div className={styles.submitContainer}>
            {modified && isUpdated ? (
                <button type="submit" className={styles.primary} onClick={handleConfirm}>
                    Update
                </button>
            ) : (
                <button disabled type="submit" className={styles.disabled}>
                    Update
                </button>
            )}
        </div>
    );
}

SubmitButton.propTypes = {
    modified: PropTypes.bool.isRequired,
    isUpdated: PropTypes.bool.isRequired,
};

export default withConnect()(withRouter(SubmitButton));
