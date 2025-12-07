import {Outlet} from 'react-router-dom';
import Header from './Header';

export default function DashboardLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-1'>
        <aside className='w-64 border-r'>Sidebar</aside>
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
