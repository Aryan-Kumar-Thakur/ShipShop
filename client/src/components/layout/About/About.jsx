import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
const About = () => {
    const visitPortfolio = () => {
        window.open('https://personal-portfolio-six-lime.vercel.app/', '_blank');
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dztdvwi3m/image/upload/v1718478235/avatars/qw3c1bmwkuzgc2o7morg.png"
                            alt="Founder"
                        />
                        <Typography>Aryan Thakur</Typography>
                        <Button onClick={visitPortfolio} color="primary">
                            My Portfolio
                        </Button>
                        <span>
                        ShipShop is an e-commerce platform built with the MERN stack 
                        (MongoDB, Express.js, React.js, Node.js). It offers a seamless user experience
                         with a responsive interface, secure transactions, and efficient data management,
                          providing a reliable and enjoyable shopping experience.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">My Handles</Typography>
                        <a href="https://www.linkedin.com/in/aryan-kumar-thakur/" target="blank">
                            <LinkedInIcon className="instagramSvgIcon" />
                        </a>
                        <a href="https://github.com/Aryan-Kumar-Thakur" target="blank">
                            <GitHubIcon className="instagramSvgIcon" />
                        </a>
                        <a href="https://www.instagram.com/itsme_aryan14/?next=%2F" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                        <a href="https://x.com/thakur_aryan14" target="blank">
                            <TwitterIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;