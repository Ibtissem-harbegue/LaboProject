import React from 'react'
import "./Home.css"



function Home() {
  
 return (
            <>
                 <div id="root">
                               <div className="landing-page">
                        <header className="landing-header">
                            <nav className="landing-navbar">
                                <a aria-current="page" href="/" >
                                <h1 className="lab" >Covid-Lab-App</h1>
                                 <img style={{ height:"100px"}} src={"./flamenco-pandemic.png"} alt="corona"/>
                            </a>
                            <div className="left"><a className="login-button" href="/login">Login</a></div></nav>
                        </header>
                        <section className="landing">
            <div className="section-third">
                <div className="show">
                    <div className="title">
                        <h2 className="landing-title">Book a Covid Test Online</h2>
                         <p className="landing-min">Let us help YOU. <br/>
                            In a world gripped by the effects of the <span style={{color: "red"}}>COVID-19 </span>pandemic  it has never been more important for those with both chronic and new health concerns to be able to access reliable laboratory tests from the comfort and the safety of their own home. <br/> This website enables you to order private <span style={{color: "red"}}>COVID-19 PCR</span> tests online. </p></div></div><a className="register-button" href="/register">Register</a></div>
       
    </section>
    <div className="footer">
        <h2 className="footer-message">Get in touch with us! Email us at <a href="Lab-App@go.space">Lab-App@go.space</a>
        </h2>
    </div>
    </div> <div id="back"></div></div>
   
            </>
        )
    }
    
   

export default Home
