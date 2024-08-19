import './App.css'
import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import ListedItems from './pages/ListedItems';
import MyProfile from './pages/MyProfile';
import WrongPath from './pages/WrongPath';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listeditems" element={<ListedItems />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path='*' element={<WrongPath />} ></Route>
    </Routes>
    </>
  )
}

export default App
