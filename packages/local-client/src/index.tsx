import ReactDOM from 'react-dom';
import CellList from './components/cellList';
import { store } from './state';
import { Provider } from 'react-redux';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
)