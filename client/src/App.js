import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Index from './compenets/Index';
import Signreg from './compenets/Signreg';
import Dashboard from './compenets/admin/Dashboard';
import Profilephoto from './compenets/admin/Profilephoto';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path='/Signreg' element={<Signreg />}/>
      <Route path="/Dashboard" element={<Dashboard />}/>
      <Route path="/Profilephoto" element={<Profilephoto />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
