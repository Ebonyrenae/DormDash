import { RouterProvider } from 'react-router-dom';
import { router } from './src/app/routes'; // Use ./src if App.tsx is in root
import './src/styles/globals.css';        // Use ./src if App.tsx is in root

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;