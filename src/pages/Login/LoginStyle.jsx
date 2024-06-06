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

export const StButtonBox = styled.div`
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
  &:hover {
    background: #ff3553;
  }
  img {
    filter: invert(100%);
  }
`;
