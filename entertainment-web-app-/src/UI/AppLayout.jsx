import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <div className="bg-dark-blue mx-auto flex h-dvh flex-col px-4 sm:flex-row sm:justify-start sm:gap-7 sm:p-6">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
