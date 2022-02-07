import constants from './constants';
import decode from 'jwt-decode';
import globalActions from '../global/actions';

const setUserInfo = (params) => {
    return {
        type: constants.SET_USER_INFO,
        payload: params,
    };
};

const logoutUser = () => {
    return {
        type: constants.CLEAR_USER_INFO,
        payload: {},
    };
};

const signInWithAccount = (auth) => {
    return async (dispatch, getState) => {
        try {
            const resp = await AuthApi.signInWithAccount(auth);
            if (resp.status && resp.data && resp.data.token) {
                const decodeToken = decode(resp.data.token);
                dispatch(setUserInfo({ token: resp.data.token, ...decodeToken }));
                return decodeToken;
            }
            dispatch(
                globalActions.showAlertModal({
                    title: 'Error Occurs',
                    message: 'Your information is incorrect',
                    closeCallback: () => {},
                })
            );
        } catch (e) {
            return e;
        }
    };
};

const userActions = {
    setUserInfo,
    signInWithAccount,
    logoutUser,
};

export default userActions;
