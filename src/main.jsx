import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../reset.css';
import { Provider } from 'react-redux';
import store from './redux/config/storeConfig.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
