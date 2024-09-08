import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Story from './components/Story.jsx';
import AllSections from './components/AllSections.jsx';
import CreateStory from './components/CreateStory.jsx';
import AddSections from './components/AddSections.jsx';
import Home from './components/Home.jsx';
import Dashboad from './components/Dashboad.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/dashboard',
        element: <Dashboad></Dashboad>,
      },
      {
        path: '/create_story',
        element: <CreateStory></CreateStory>,
      },
      {
        path: '/story/:story_id/add_section',
        element: <AddSections></AddSections>,
      },
      {
        path: '/story/:story_id',
        element: <Story></Story>,
      },
      {
        path: '/story/:story_id/sections/:section_id',
        element: <AllSections></AllSections>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
