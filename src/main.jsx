import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '../reset.css';
import App from './App.jsx';

import { UserProvider } from './contexts/login.context.jsx';
import { ModalProvider } from './contexts/popup.context.jsx';
import store from './redux/config/storeConfig.js';
import GlobalStyle from './styles/GlobalStyles.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ModalProvider>
      <UserProvider>
        <GlobalStyle />
        <App />
      </UserProvider>
    </ModalProvider>
  </Provider>
);
