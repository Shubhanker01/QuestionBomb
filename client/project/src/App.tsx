import './App.css'
import AppRouter from './router/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoadingBarContainer } from "react-top-loading-bar";

function App() {

  return (
    <>
      <LoadingBarContainer >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false} />
        <AppRouter />
      </LoadingBarContainer>
    </>
  )
}

export default App
