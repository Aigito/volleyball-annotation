import { Outlet } from "react-router";

function Home() {
  return (
    <>
      "Home Page" "Nav bar goes here"
      <Outlet />
    </>
  );
}

export default Home;
