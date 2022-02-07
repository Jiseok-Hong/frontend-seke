import React, { PureComponent } from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class AlertModal extends PureComponent {
    render() {
        const { showModal, title, message, closeCallback } = this.props;

        return (
            <Modal
                id="alert-modal"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={closeCallback}
                className={styles.container}
            >
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="light" onClick={closeCallback} onKeyPress={closeCallback} role="presentation">
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AlertModal.defaultProps = {
    showModal: false,
    title: '',
    message: '',
    closeCallback: () => {},
};

AlertModal.propTypes = {
    showModal: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    closeCallback: PropTypes.func,
};

export default AlertModal;
