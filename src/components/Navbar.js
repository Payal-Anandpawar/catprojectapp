import "../customcss/style.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link text-white font-weight-bold cat-app-nav"
            href="#"
          >
            My Cat App
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
