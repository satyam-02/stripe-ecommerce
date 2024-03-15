import {Route, Routes, BrowserRouter } from 'react-router-dom';
import Success from './Success';
import Pay from './Pay';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
