import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '/src/app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app'>
          <Outlet />
      </div>
    </>
  )
}

export default App