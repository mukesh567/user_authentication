
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";


const Navbar = () => {

    const token = useSelector(selectToken);
    const isLoggedIn = !!token;

    return (
        <>

            <header>
                <div className="container">

                    <div className="logo-brand">
                        <NavLink to="https://mukeshportfolios.netlify.app/" >MukeshKir</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>


                            {
                                isLoggedIn ? (<li><NavLink to="/logout">Logout</NavLink></li>) :
                                    <>
                                        <li><NavLink to="/login">Login</NavLink></li>
                                        <li><NavLink to="/register">Signup</NavLink></li>
                                    </>

                            }
                        </ul>
                    </nav>

                </div>
            </header>

        </>
    )
}

export default Navbar