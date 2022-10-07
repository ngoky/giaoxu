import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>check behavior</h2>
      <Outlet />
    </div>
  );
};
export default Home;
