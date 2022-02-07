import React, { Component } from 'react';
import withConnect from 'utils/withConnect';
import { AlertModal, ConfirmModal } from 'components/Modal';
import actions from 'store/global/actions';
import ErrorModal from 'components/Modal/ErrorModal';

const ModalEnum = {
    ALERT: 1,
    CONFIRM: 2,
    ERROR: 3,
};

class ModalContainer extends Component {
    onCloseModal = (type) => {
        const { alertModal, confirmModal, dispatch } = this.props;
        switch (type) {
            case ModalEnum.ALERT:
                alertModal.closeCallback();
                dispatch(actions.dismissAlertModal());
                break;
            case ModalEnum.CONFIRM:
                confirmModal.closeCallback();
                dispatch(actions.dismissConfirmModal());
                break;
            default:
                break;
        }
    };

    onConfirmModal = () => {
        const { confirmModal, dispatch } = this.props;
        confirmModal.confirmCallback();
        dispatch(actions.dismissConfirmModal());
    };

    onComplete = (item) => {
        const { errorModal, dispatch } = this.props;
        errorModal.onComplete(item);
        dispatch(actions.dismissErrorModal());
    };

    render() {
        const { alertModal, confirmModal, errorModal, loadModal } = this.props;
        return (
            <React.Fragment>

                <AlertModal {...alertModal} closeCallback={() => this.onCloseModal(ModalEnum.ALERT)} />
                <ConfirmModal
                    {...confirmModal}
                    closeCallback={() => this.onCloseModal(ModalEnum.CONFIRM)}
                    confirmCallback={() => this.onConfirmModal()}
                />
                <ErrorModal
                // {...errorModal}
                // closeCallback={() => this.onCloseModal(ModalEnum.ERROR)}
                // onComplete={(item) => this.onComplete(item)}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.global,
});

export default withConnect(mapStateToProps)(ModalContainer);
