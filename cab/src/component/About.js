import {React, useEffect } from 'react';
import './About.css';
import { Container, Row, Col } from "react-bootstrap";
import c1 from '../image/image1.jpg';
import c2 from '../image/c2.jpg';
import backgroundImage from '../image/backgroundImage.jpg';
import image1 from '../image/c1.jpg';
import icon from '../image/icon.jpg';
import track from '../image/track.jpg';
import route from '../image/route.jpg';
import bg from '../image/page-title.png';

const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.image_column, .content_column, .steps, .text_section, .image_section');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return(
    <div className="container_fluid p-0">
      <div className="car_background">
        <img src={bg} alt="Background" className="bookurtaxi-banner-img" />
        <div className="bookurtaxi-overlay">
          <h1 className="bookurtaxi-title">About</h1>
          <p className="bookurtaxi-breadcrumb">
            <a href="/">Home</a> &gt; <a href="/">Pages</a> &gt; <a href="/">About</a>
          </p>
      </div>

    </div>
      <div className="row">
        
        <div className="image_column">
        <div className="image_item">
          <img src={c1} alt="" className="image1" />
        </div>
        <div className="image_item">
          <img src={c2} alt="" className="image2" />
        </div>
        </div>

        <div className="content_column">
        <h1>WELCOME TO OUR COMPANY</h1>
        <h2>Feel the difference and Relaxation!</h2>
        <p>
            We successfully cope with tasks of varying complexity, provide long-term guarantees, and regularly master new technologies.
         Our portfolio includes dozens of successfully completed projects of houses of different storeys.
        </p>
        <ul>
          <li>✔ We successfully cope with tasks of varying complexity.</li>
          <li>✔ Long-term guarantees and regularly.</li>
          <li>✔ Master new technologies.</li>
        </ul>
        <h3>Call For Taxi</h3>
        <p className="phone_number">5267-214-392</p>
      </div>
      </div>
       <div className="background_container">
            
              <img src={backgroundImage} alt="" className="background_image" />
              <div className="main_content">
                <div className="text_section">
                  <h1>OUR SERVICES</h1>
                  <h2>Our Best Services For You</h2>
                  <ul>
                    <li> 01. City Transport</li>
                    <li> 02. Online Booking</li>
                    <li> 03. Regular Transport</li>
                    <li> 04. Airport Transfer</li>
                  </ul>
                </div>
    
                <div className="image_section">
                  <img src={image1} alt="Company" className="company_image" />
                </div>
              </div>
              </div> 
      <Container className='how-it-works'>
            <div className="section_title">
              <h6>ORDER TAXI ONLINE</h6>
              <h2>How It Works</h2>
            </div>
            <Row className="steps_row">
            <Col md={4} className="steps">
              <div className="step_icon"><img className='step_img' src={icon} alt="" /></div>
              <div className="step_content">
              <h4>BOOK IN JUST 2 TABS</h4>
              <p>Skip the hassle and book your ride instantly! 
              Select location, tap to confirm, and you're ready to go!</p>
              </div>
            </Col>

             <Col md={4} className="steps">
              <div className="step_icon"><img className='step_img' src={track} alt="" /></div>
              <div className="step_content">
              <h4>TRACK YOUR DRIVER</h4>
              <p>Stay updated! Track your driver’s location on the map, 
              see arrival time with smooth pickup experience..</p>
              </div>
            </Col>

            <Col md={4} className="steps">
              <div className="step_icon"><img className='step_img' src={route} alt="" /></div>
              <div className="step_content">
              <h4>PICK & ARRIVE SAFELY</h4>
              <p>Enjoy secure and comfortable ride. 
              Our trusted drivers ensure a smooth journey every time!</p>
              </div>
            </Col>
            </Row>
      </Container>
    
    </div>
  );
};

export default About;