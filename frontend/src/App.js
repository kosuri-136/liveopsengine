import './App.css';
import Signin from './components/login';
import Signup from './components/signup';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Offer from './components/OfferList';
import Home from './components/Home';
import FindOffer from './components/Findoffers';
import GetAllOffers from './components/alloffers';




function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/offer' element={<Offer />} />
        <Route path='/player' element={<FindOffer/>}/>
        <Route path='/getoffers' element={<GetAllOffers/>}/>

        {/* <Route path='/filteredoffer' element={<FilteredOffer/>}/> */}
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;