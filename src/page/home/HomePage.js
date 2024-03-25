import {
  HomeContainer, OverlayText, HomeImg
} from './home.styles';
import { Button, Col, Container, Row} from 'react-bootstrap';


export const HomePage = () => {
  return (
    <HomeContainer>
      <HomeImg
        src="https://images.unsplash.com/photo-1554843894-2eb3578feb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fENvY2hlc3xlbnwwfDB8fHwxNzExMDU3MTQwfDI&ixlib=rb-4.0.3&q=80&w=1080"
        alt='main_logo'
      />
      <OverlayText>
        <h1>Encuentra tu coche <br></br>Perfecto</h1>
        <p>
          Tenemos una amplia selección de coches  ​​para elegir
        </p>
        <Button variant="light" size="lg">
          Contáctanos
          <i className="fa fa-phone" style={{ marginLeft: '10px' }}></i>
        </Button>
      </OverlayText>
    </HomeContainer>
  )
}