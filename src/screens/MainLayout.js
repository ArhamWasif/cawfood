import Sidebar from '../Admin/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default MainLayout;