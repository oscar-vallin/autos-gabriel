import {
  HomeContainer, OverlayText, HomeImg
} from './home.styles';
import { Button } from 'react-bootstrap';
import logo2 from '../../assets/logo2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
const logo = 'https://images.unsplash.com/photo-1554843894-2eb3578feb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fENvY2hlc3xlbnwwfDB8fHwxNzExMDU3MTQwfDI&ixlib=rb-4.0.3&q=80&w=1080'


export const HomePage = () => {
  const whatsappNumber = process.env.REACT_APP_NUMBER
  return (
    <HomeContainer>
      <HomeImg
        mobileSrc={logo2}
        desktopSrc={logo}
        src={logo2}
        alt='main_logo'
      />
      <OverlayText>
        <h1>Encuentra tu vehículo <br></br>Perfecto</h1>
        <p>
          Tenemos una amplia selección de vehículos ​​para elegir
        </p>
        <Button variant="light" size="lg">
          <a style={{ textDecoration: 'none', color: '#000' }} href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">Contáctanos</a>
          <FontAwesomeIcon icon={faWhatsapp} style={{ marginLeft: '10px' }}/> 
        </Button>
      </OverlayText>
    </HomeContainer>
  )
}