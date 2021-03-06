import { Route } from 'react-router-dom';
import AreaSelectionPage from './pages/AreaSelectionPage';
import CreateAccountPage from './pages/CreateAccountPage';
import PackageSelectionPage from './pages/PackageSelectionPage';
import PaymentPage from './pages/PaymentPage';
import './App.css';
import Banner from './component/Banner';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <>
      <Banner />
      <div className='App'>
        <Route path='/' exact component={AreaSelectionPage} />
        <Route
          path='/package-selection'
          exact
          component={PackageSelectionPage}
        />
        <Route path='/create-account' exact component={CreateAccountPage} />
        <Route path='/payment' exact component={PaymentPage} />
        <Route path='/confirmation' exact component={Confirmation} />
      </div>
    </>
  );
}

export default App;
