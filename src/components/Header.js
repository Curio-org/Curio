import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import curio from './images/curio.png'
import '../style/header.css';

const HeaderCurio = () => (
  <Header as='h2'  style={{
    backgroundColor: "cyan",
  }}  >
    <Image circular src={curio} width="75" height="75" /> Curio
  </Header>
)

export default HeaderCurio;