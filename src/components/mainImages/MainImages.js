import styled from "styled-components";
import logo2 from '../../assets/logo2.jpg';
const logo = 'https://images.unsplash.com/photo-1554843894-2eb3578feb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fENvY2hlc3xlbnwwfDB8fHwxNzExMDU3MTQwfDI&ixlib=rb-4.0.3&q=80&w=1080'
export const HomeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    object-fit: fill;
  }

  @media (min-width: 768px) {
    content: url(${(props) => props.desktopSrc});
  }

  /* For mobile */
  @media (max-width: 767px) {
    content: url(${(props) => props.mobileSrc});
  }
`;
const MainImages = () => {
  return (
    <HomeImg
      mobileSrc={logo2}
      desktopSrc={logo}
      src={logo2}
      alt='main_logo'
    />
  )
};

export default MainImages