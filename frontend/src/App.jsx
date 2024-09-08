import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Header></Header>
      <div className='main'>
        <div className='sidebar'>
          <Sidebar></Sidebar>
        </div>
        <div className='content'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
