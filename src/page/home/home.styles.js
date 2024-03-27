import styled from "styled-components";


export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

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

export const OverlayText = styled.div`
  position: absolute;
  display: inline;
  top: 20%;
  left: 17%;
  text-align: center;

  h1 {
    font-size: 4.5rem;
    letter-spacing: 3px;
    font-weight: bold;
    color: white;
  }

  p {
    font-size: 1.5rem;
    color: white;
    letter-spacing: 3px;
    font-weight: bold;
    margin-top: 150px;
  }

  button {
    background-color: #fff;
    color: #000;
    boder-radius: 10px;
  }
  
  @media (max-width: 768px) {
    top: 30%;
    left: 1%;
    h1 {
      font-size: 1.7rem;
    }
    p {
      margin-top: 200px;
      font-size: 1rem;
    }
  }
`;