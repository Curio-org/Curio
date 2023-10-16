import React, { useState } from "react";
// import { Header, Image } from 'semantic-ui-react'
import Curiologo from '../assets/images/Csmall.png'
import './header.css';
import { Link ,BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const HeaderCurio = () => {
  //Used to toggle the hamburger menu
  const [triggerMenu, setTriggerMenu] = useState(false);

  return (
    <>

      <div className='curio__header'>
          {/* Wrapping the Link components within the Router component */}
      <Router>
         {/* Logo linking to the homepage */}
        <Link to='/'>
        <div className='gradient__text'>
          <h1>
            <img src={Curiologo} alt='Curio' className='curio__icon' />
            <span>URIO</span>
          </h1>
          <p className="curio__tag">
            <b>Your Video Translator :)</b>
          </p>
        </div>
        </Link>

        <div className="curio__sign">
          <p>About</p>
          <p>Sign In</p>
          <button type="button">Sign Up</button>
        </div>
        </Router>
      </div>
      {/*Added a mobile version
     Screen width is < 768px above is disabled and below is triggered
     Added hamburger menu and generic options for the menu
     */}
      { }
      <div className='curio__header-m'>
         {/* Wrapping the Link components within the Router component */}
         <Router>
          {/* Logo linking to the homepage */}
          <Link to='/'>
        <div className=' gradient__text  gradient__text-m'>
          <h1>
            <img src={Curiologo} alt='Curio' className='curio__icon' />
            <span>URIO</span>
          </h1>
          <p className="curio__tag">
            <b>Your Video Translator :)</b>
          </p>
        </div>
        </Link>

        <button onClick={() => { setTriggerMenu(!triggerMenu) }} className='hamburger-m' type="button">
          {/*
          This is the hamburger line icon
          First one is when it's off
          Second one is when it's on
          */}
          <div
            className={triggerMenu === false ? "hamburger-m" : "display-none"}
          >
            <div className="hamburger-lines-m"></div>
            <div className="hamburger-lines-m"></div>
            <div className="hamburger-lines-m"></div>
          </div>
          <div
            className={triggerMenu === true ? "hamburger-m" : "display-none"}
          >
            <div className="lines-rotated-left-m"></div>

            <div className="lines-rotated-right-m"></div>
          </div>
        </button>

      </Router>
      </div>
      {/*
    The menu of the hamburger 
    If trigger is true, display it, if not don't*/}
      <div
        className={
          triggerMenu === true ? "hamburger-menu-active" : "display-none"
        }
      >
        <div className="hamburger-menu-context">
          <b>Sign Up</b>
        </div>
        <div className="hamburger-menu-context">
          <b>Sign In</b>
        </div>
        <div className="hamburger-menu-context">
          <b>About</b>
        </div>
      </div>
    </>
  );
};

export default HeaderCurio;
