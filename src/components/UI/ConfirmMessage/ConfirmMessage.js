import React from 'react'
import Modal from '../Modal/Modal.js';
import './ConfirmMessage.css'
import instaIcon from "../../../InstagramIcon.svg"

const ConfirmMessage = (props) => {
  return (
    <Modal
      padding="16px 0 0 0"
      borderRadius="16px"
      show={props.show}
      closeModal={props.onNegativeBtnClick} >
      <div className="confirmMessage">
        <img src={instaIcon} height="40px" width="40px" alt="" />
        <h4>{props.message}</h4>
        <div className="confirmMessage__btnDiv">
          <button className="confirmMessage__posBtn" onClick={props.onPositiveBtnClick}>{props.positiveBtn}</button>
          <button className="confirmMessage__negBtn" onClick={props.onNegativeBtnClick}>{props.negativeBtn}</button>
        </div>
      </div>
    </Modal >
  )
}

export default ConfirmMessage;
