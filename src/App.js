import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider, createHashRouter, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Offline } from 'react-detect-offline';
import LayOut from './Components/AllPages/LayOut';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import AuthConTextProvider from './Components/Context/AuthContext';
import LogIn from './Components/LogIn/LogIn';
import AddTask from './Components/AddingTasks/AddTask';
import CompletedTasks from './Components/CompletedTasks/CompletedTask';



const myRouter = createHashRouter([
  {
    path: '',
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <ConditionalRedirect /> 
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <LogIn /> },
      { path: '/home', element: <Home /> },
      { path: '/addTask', element: <AddTask /> },
      { path: '/completed', element: <CompletedTasks /> },
    ],
  },
]);

// ConditionalRedirect component for handling the redirection logic
function ConditionalRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    } else {
      navigate('/register');
    }
  }, [navigate]);
  return <div>Loading...</div>;
}



function App() {
  const myClient = new QueryClient();



  return (
    <>

      <QueryClientProvider client={myClient}>
        <AuthConTextProvider>
            <RouterProvider router={myRouter} />
        </AuthConTextProvider>
        
      </QueryClientProvider>

      <Offline>
        <h1 className="bg-white p-4 fs-4">you are offline</h1>

      </Offline>


    </>
  );
}

export default App;
