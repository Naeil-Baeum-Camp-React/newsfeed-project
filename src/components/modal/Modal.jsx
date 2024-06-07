import styled from 'styled-components';

import xSvg from '../../asset/x-solid.svg';
import { useModal } from '../../contexts/popup.context';

function Modal({ title, description }) {
  const { closeModal } = useModal();
  return (
    <StBackdrop>
      <StModal>
        <StXIcon
          onClick={() => {
            closeModal();
          }}
          src={xSvg}
          alt="x 이모티콘"
        />
        <StTitle>{title}</StTitle>
        <StDesc>{description}</StDesc>
      </StModal>
    </StBackdrop>
  );
}

export default Modal;

const StBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StModal = styled.div`
  position: relative;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StTitle = styled.div`
  font-weight: 600;
  color: #252525;
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;
`;
const StDesc = styled.div`
  font-weight: 400;
  color: #474747;
  text-align: center;
`;
const StXIcon = styled.img`
  position: absolute;
  width: 12px;
  height: 12xp;
  cursor: pointer;
  right: 25px;
  top: 20px;
  &:hover {
    transform: scale(1.2);
  }
  transition-duration: 200ms;
`;
