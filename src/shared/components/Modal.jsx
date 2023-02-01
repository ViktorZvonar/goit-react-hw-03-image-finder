import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handCloseModal);
  }

  handCloseModal = event => {
    const { onClose } = this.props;
    if (event.currentTarget === event.target || event.code === 'Escape') {
      onClose();
    }
  };

  render() {
    const { handCloseModal } = this;
    const { children } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={handCloseModal}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
