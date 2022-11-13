import React from 'react'
import './Footer.css'
import Twilio from './Twilio'
import curio from'../assets/images/curio.png'

const Footer = () => {
  return (
    <>
      <div className="curio_footer">
        <div className="curio_footer-heading">
          <h1 className="gradient__text">Do you want a video to be Translated?</h1>
        </div>

        <div className="curio_footer-btn">
          <p>Request Translation</p>
        </div>
        
        <div>
          <Twilio />
        </div>

        <div className="curio_footer_links">
          <div className="curio_footer_links_logo">
            <img src={curio} alt="gpt3_logo" />
            <p>Cluster Innovation Centre, <br/>University Of Delhi. <br/> All Rights Reserved</p>
          </div>
          <div className="curio_footer_links_div">
            <h4>Links</h4>
            <p>Overall</p>
            <p>Social Media</p>
            <p>Counters</p>
            <p>Contact</p>
          </div>
          <div className="curio_footer_links_div">
            <h4>Company</h4>
            <p>Terms & Conditions </p>
            <p>Privacy Policy</p>
            <p>Contact</p>
          </div>
          <div className="curio_footer_links_div">
            <h4>Get in touch</h4>
            <p>A Street, B-Town, New Delhi</p>
            <p>012-132567</p>
            <p>info@curio.net</p>
          </div>
        </div>

        <div className="curio_footer_copyright">
          <p>@2022 CURIO. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default Footer;