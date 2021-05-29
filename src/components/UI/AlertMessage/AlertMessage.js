import React from 'react'
import Modal from '../Modal/Modal.js';
import './AlertMessage.css';
import instaIcon from "../../../InstagramIcon.svg"

const AlertMessage = (props) => {
  return (
    <Modal
      padding="16px 0 0 0"
      borderRadius="16px"
      show={props.show}
      closeModal={props.onPositiveBtnClick} >
      <div className="alertMessage">
        <img src={instaIcon} height="40px" width="40px" alt="" />
        <h4>{props.message}</h4>
        <div className="alertMessage__btnDiv">
          <button className="alertMessage__negBtn" onClick={props.onPositiveBtnClick}>{props.positiveBtn}</button>
        </div>
      </div>
    </Modal>
  )
}

export default AlertMessage;
