import react from "react";
import "./Nav.css"
import {useEffect, useState} from "react"



function Nav(){
    const[show,handleShow]=useState(false)

    useEffect(()=>{
        window.addEventListener("scroll", () =>{
            if(window.scrollY>100){
                handleShow(true);

            }else{
                handleShow(false);
            }
        })
        return()=>{
            window.removeEventListener("scroll")
        }
    }, []);



    return(
        <div class={`nav ${show && "nav__black"}`}>
            <img src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg"
            alt="Netflix Logo"
            className="nav__logo"
            />
        </div>
    )
}
export default Nav