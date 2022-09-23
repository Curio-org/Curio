import { Navbar, Nav } from 'rsuite';
// import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import HomeIcon from '@rsuite/icons/legacy/Home';

const Mynavbar = () => (
  <Navbar>
    <Navbar.Brand href="/"><b>CURIO</b></Navbar.Brand>
    <Nav>
      <Nav.Item href="/" icon={<HomeIcon />}>Home</Nav.Item>
      <Nav.Item href="/record">Record</Nav.Item>
      <Nav.Item href="/play">Watch</Nav.Item>
      <Nav.Menu title="About">
        <Nav.Item>Company</Nav.Item>
        <Nav.Item>Team</Nav.Item>
        <Nav.Menu title="Contact">
          <Nav.Item>Via email</Nav.Item>
          <Nav.Item>Via telephone</Nav.Item>
        </Nav.Menu>
      </Nav.Menu>
    </Nav>
  </Navbar>
);

export default Mynavbar;