import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Home;
