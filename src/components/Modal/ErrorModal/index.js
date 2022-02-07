import React, { Component } from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import errorData from './error.json';

class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            message: '',
            buttons: [],
        };
    }

    componentDidUpdate(prevProps) {
        const { code } = this.props;
        if (prevProps.code !== code) {
            const error = errorData.filter((item) => item.code === code);
            if (error && error[0]) {
                this.setState({
                    title: error[0].title,
                    message: error[0].message,
                    buttons: error[0].buttons,
                });
            }
        }
    }

    render() {
        const { showModal, closeCallback, onComplete } = this.props;
        const { title, message, buttons } = this.state;

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
                    {buttons &&
                        buttons.map((item) => {
                            return (
                                <Button
                                    className={styles.confirmButton}
                                    variant="danger"
                                    onClick={() => onComplete(item)}
                                    onKeyPress={() => onComplete(item)}
                                    role="presentation"
                                    key={item.text}
                                >
                                    {item.text}
                                </Button>
                            );
                        })}
                </Modal.Footer>
            </Modal>
        );
    }
}

ErrorModal.defaultProps = {
    showModal: false,
    code: '',
    closeCallback: () => {},
    onComplete: () => {},
};

ErrorModal.propTypes = {
    showModal: PropTypes.bool,
    code: PropTypes.string,
    closeCallback: PropTypes.func,
    onComplete: PropTypes.func,
};

export default ErrorModal;
