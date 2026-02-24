import { RouterProvider } from 'react-router-dom';
import { router } from './src/app/routes';
import './src/styles/globals.css';


const App = () => {
  return <RouterProvider router={router} />;

};

export default App;
