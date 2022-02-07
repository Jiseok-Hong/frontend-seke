import React, { PureComponent } from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class ConfirmModal extends PureComponent {
    render() {
        const { showModal, title, message, closeCallback, confirmCallback, confirmText, cancelText } = this.props;

        return (
            <Modal
                id="confirm-modal"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={closeCallback}
                className={styles.container}
            >
                <Modal.Header>
                    <Modal.Title>
                        <i className="fa fa-exclamation-circle" /> {title}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        className={styles.cancelButton}
                        variant="outline-primary"
                        onClick={closeCallback}
                        onKeyPress={closeCallback}
                        role="presentation"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        className={styles.confirmButton}
                        onClick={confirmCallback}
                        onKeyPress={confirmCallback}
                        role="presentation"
                    >
                        {confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ConfirmModal.defaultProps = {
    showModal: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    closeCallback: () => { },
    confirmCallback: () => { },
};

ConfirmModal.propTypes = {
    showModal: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    closeCallback: PropTypes.func,
    confirmCallback: PropTypes.func,
};

export default ConfirmModal;
