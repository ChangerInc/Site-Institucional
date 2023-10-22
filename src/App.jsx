import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Header'
import './styles/app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app'>
        <Navbar />
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </>
  )
}



export default App
