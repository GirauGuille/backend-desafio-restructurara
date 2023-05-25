import React from "react";
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={"img/ELECTROGIRAU.jpg"} alt={"logo electrogirau"}/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
{/*                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/Home"}>Home</NavLink>
                        </li>
                            <NavLink className="nav-link" to={"/Contactenos"}>Contactenos</NavLink>
                        </ul>
                        <div className="d-flex justify-content-end align-items-center">
                        </div>
                    </div> */}
                </div>
            </nav>
        </div>
    )
}

export default NavBar;