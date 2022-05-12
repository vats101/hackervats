import React from 'react'
import './navbar.css';
import logo from '../images/logo.png'
import { useNavigate , Link} from 'react-router-dom';
const Navbar = (username) => {

    console.log(username);
    const navigate = useNavigate();

    return (
        <>
            <div className="Navbar">
                <img className="logo" src={logo} />
                <Link to="/mainpage" className="links" >Home</Link>
                <Link to="/about" className="links" >About</Link>
                <Link to="/sos" className="links" >SOS</Link>
                <Link to="/community" className="links" >Community</Link>
            </div>
       </>
       )
    }
        
export default Navbar