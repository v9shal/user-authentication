import React from "react";
import { Link } from "react-router-dom";

const Home=()=>{
    return(
        <div>
         <ul><li> 
            <Link to= {'./Weather'}>go to weather</Link> </li>
           <li> <Link to={'./quote'}>cat Facts here</Link></li>
          <li> <Link to={'./Movies'}>Watch here</Link></li>
            </ul> 
            <div className="name">
        Hi, this is <br />Vishal Sethi
      </div>

      <nav className="about" id="about">
        About
      </nav>
      <nav className="project" id="project">
        Projects
      </nav>
      <nav className="Contact" id="Contact">
        Contact
      </nav>

      <div id="About-Cont">
        <strong>ABOUT</strong>
        <p>Hi, this is Vishal. Welcome to my PORTFOLIO. Please hire me.</p>
      </div>

      <div id="Projects-cont">
        <strong>PROJECTS</strong>
        <div id="project-1" className="project">
          <a href="#">Link to project 1</a>
          <p>
            <ul>
              <li>
                Login authorization using React.js as frontend and Node.js as
                backend with Express.
              </li>
              <li>Used MySQL as the database to store the data.</li>
              <li>
                The user can log in using Gmail as an option, and in case they
                forgot the password, they can change it.
              </li>
              <li>Implemented the Register page for new users to register themselves.</li>
            </ul>
          </p>
        </div>

        <div id="project-2" className="project">
          <a href="#">Link to the second project</a>
          <p>
            <ul>
              <li>
                A movie streaming service allowing users to get facts and stream
                movies for free.
              </li>
              <li>
                Users can see details about the movie such as year, director,
                genre, box-office, and plot.
              </li>
              <li>
                Users can watch the trailer from YouTube and bookmark movies for
                later viewing.
              </li>
              <li>This project fetches data from an API and provides a better and cleaner UI.</li>
            </ul>
          </p>
        </div>

        <div id="project-3" className="project">
          <a href="#">Link to the 3rd project</a>
          <p>
            <ul>
              <li>
                A simple weather application where users can see the weather of
                any place around the world.
              </li>
              <li>This application fetches data from the OpenWeather API.</li>
            </ul>
          </p>
        </div>
      </div>
        </div>
    )
}
export default Home;