import styled from 'styled-components';

export const StLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const StTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  font-weight: 600;
  color: #3a3e41;
`;

export const StButtonBox = styled.button`
  width: 450px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
  img {
    height: 30px;
    width: 30px;
    margin-bottom: 5px;
  }
`;

export const StJoinButton = styled(StButtonBox)`
  cursor: pointer;
  color: white;
  background-color: #ff6077;
  border: none;
  &:hover {
    background: #ff3553;
  }
  img {
    filter: invert(100%);
  }
`;

export const SterrorUl = styled.ul`
  display: flex;
  gap: 6px;
  li {
    font-size: 10px;
    font-weight: 700;
    color: #ff4561;
    list-style-type: none;
    list-style: none;
  }
`;
