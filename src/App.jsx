import Router from './shared/Router.jsx';
import styled from 'styled-components';

function App() {
  return (
    <AppWrapper>
      <SolidLine>
        <DottedLine>
          <Router />
        </DottedLine>
      </SolidLine>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;

const SolidLine = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 1150px;
    height: 750px;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
`;

const DottedLine = styled.div`
    position: absolute;
    width: 1113px;
    height: 710px;
    left: calc(50% - 1113px / 2 - 0.5px);
    top: calc(50% - 710px / 2);

    border: 1px dashed #FFFFFF;
    border-radius: 10px;
`;

export default App;
