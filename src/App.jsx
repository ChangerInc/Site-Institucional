import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app'>
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </>
  )
}



export default App
