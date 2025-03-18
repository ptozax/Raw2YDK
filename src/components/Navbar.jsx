import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="../cardList.jsx">Cards Info</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};