import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import { BsLinkedin } from "react-icons/bs";
const About = () => {
//   const visitInstagram = () => {
//     window.location = "https://instagram.com/meabhisingh";
//   };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dofq9gh9l/image/upload/v1685872044/1670230475325_oikj5o.jpg"
              alt="Founder"
            />
            <Typography>Devaansh Bhandari</Typography>
            {/* <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button> */}
            <span>
              This is a sample wesbite made by me. Only with the
              purpose to learn MERN stack development.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect With Me!</Typography>
            {/* <a
              href="https://www.youtube.com/channel/UCO7afj9AUo0zV69pqEYhcjw"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a> */}

            <a href="https://www.linkedin.com/in/devaansh-bhandari/" target="blank">
              <BsLinkedin className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;