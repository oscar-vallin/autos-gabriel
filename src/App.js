import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';
import { HomePage } from './page/home/HomePage';
import { DescriptionPage } from './page/description/DescriptionPage';
import { CarsPage } from './page/cars/CarsPage';
import { FooterPage } from './page/footer/FooterPage';
import { ContactUsPage } from './page/contactus/ContactUsPage';

function App() {
  return (
    <div>
      <HomePage />
      <div style={{ marginTop: '50px' }}/>
      <DescriptionPage />
      <div style={{ marginTop: '50px' }}/>
      <CarsPage />
      <div style={{ marginTop: '50px' }}/>
      <ContactUsPage />
      <FooterPage />
    </div>
  );
}

export default App;
