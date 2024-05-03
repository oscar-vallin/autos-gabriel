import styled from "styled-components";


export const HomeContainer = styled.header`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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

  h4 {
    position: relative;
    color: white;
    letter-spacing: 3px;
    top: 50px;
    font-weight: 700;
  }

  p {
    position: relative;
    font-size: 1.5rem;
    bottom: 30px;
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