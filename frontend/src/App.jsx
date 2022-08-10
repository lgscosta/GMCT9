
import Routes from './routes'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='w-screen h-screen bg-gmct-darkBlue'>
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
