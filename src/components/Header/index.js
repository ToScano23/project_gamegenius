import React from "react";
import "./styles.css";

function Header() { 
 return ( 
 <div> 
    <header> 
        <nav className="header"> 
            <a className="header" href=" http://localhost:3000/" > 
            <img src="/assets/images/banner192_center.png" alt="banner" className="banner"/>
            </a>
        </nav>
    </header>
    <h4>Defina o que está buscando e encontre algo para jogar:</h4>
 </div>
 )
} 
export default Header;