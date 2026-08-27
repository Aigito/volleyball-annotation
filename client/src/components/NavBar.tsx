import { Link } from "react-router";

export default function NavBar() {
  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <ul className="nav-list">
          <li>
            <Link to="/videos">My Videos</Link>
          </li>
          <li>
            <Link to="/annotations">My Annotations</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
