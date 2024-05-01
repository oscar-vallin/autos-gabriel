import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import logo from '../../assets/logoLast _1.png';

const NavbarStyled = styled(Navbar)`
  background-color: transparent;
  position: absolute;
  width: 100%;
  display: flex;
  oveflow: hidden;
  z-index: 1000;

  h2 {
    color: #fff;
    margin-left: 20px;
  }

  a {
    text-decoration: none;
    cursor: default;
  }

  @media (min-width: 767px) {
    h2 {
      color:  #fff;
    }
    
  }

  div {
    .nav-link {
      color: #000 !important;
      &:hover {
        color: #0b99d1 !important;
        }
      }
  }

`;

export const NavbarPage = () => {
  return (
    <NavbarStyled>
      <Navbar.Brand>
         <Link to="/auth">
          {/* <img 
            src={logo}
            alt='logo'
            width='300'
          /> */}
          <h2>Global Automotriz</h2>
         </Link>
        </Navbar.Brand>
      {/* <Nav  className="mr-auto" style={{ marginLeft: '10px' }}>
        <Nav.Link>
          Ingresar
        </Nav.Link>
      </Nav> */}
    </NavbarStyled>
  )
};