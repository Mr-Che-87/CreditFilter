import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>  {/*пробрасываем пропс store всему приложению сразу*/}
    <App />
  </Provider>
);
