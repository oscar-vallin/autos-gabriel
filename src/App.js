import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import { NavbarPage } from './page/navbar/NavbarPage';
import { HomePage } from './page/home/HomePage';
import { DescriptionPage } from './page/description/DescriptionPage';
import { CarsPage } from './page/cars/CarsPage';
import { FooterPage } from './page/footer/FooterPage';
import { ContactUsPage } from './page/contactus/ContactUsPage';
import { SignUpPage } from './page/auth/AuthPage';
import { RegisterCarPage } from './page/registerCar/RegisterCar';
import { LocationPage } from './page/location/Location';
import { NotFoundPage } from './page/notFoundPage/NotFoundPage';

import ProtectedRoute from './protectRoute/ProtectRoute';

const MainPage = () => {
  return (
    <div>
      <NavbarPage />
      <HomePage />
      <div style={{ marginTop: '50px' }}/>
      <DescriptionPage />
      <div style={{ marginTop: '50px' }}/>
      <CarsPage />
      <div style={{ marginTop: '30px' }}/>
      <ContactUsPage />
      <div style={{ marginTop: '30px' }}/>
      <LocationPage />
      <FooterPage />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/auth' element={<SignUpPage />}/>
        <Route  
          path='/registercar'
          element={
            <ProtectedRoute>
              <RegisterCarPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
