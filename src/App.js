import { Route } from 'react-router-dom';
import AreaSelectionPage from './pages/AreaSelectionPage';
import CreateAccountPage from './pages/CreateAccountPage';
import PackageSelectionPage from './pages/PackageSelectionPage';
import PaymentPage from './pages/PaymentPage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Route path='/' exact component={AreaSelectionPage} />
      <Route path='/package-selection' exact component={PackageSelectionPage} />
      <Route path='/create-account' exact component={CreateAccountPage} />
      <Route path='/payment' exact component={PaymentPage} />
    </div>
  );
}

export default App;
