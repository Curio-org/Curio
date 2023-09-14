import React from 'react'
// import { Header, Image } from 'semantic-ui-react'
import language from '../assets/images/language.png'
import './header.css';

const HeaderCurio = () => (
  <>
    <div className='curio__header'>
      <div className='gradient__text'>
      <h1>
        <img src={language} alt='Curio' className='curio__icon'/>
        <t/> CURIO
      </h1>
        <p className='curio__tag'><b>Your Video Translator :)</b></p>
      </div>

      <div className='curio__sign'>
        <p>About</p>
        <p>Sign In</p>
        <button type='button'>Sign Up</button>

      </div>
    </div>   
  </>
)

export default HeaderCurio;