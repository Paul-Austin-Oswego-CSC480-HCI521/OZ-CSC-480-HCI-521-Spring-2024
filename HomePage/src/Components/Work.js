import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Work = () => {

  const workInfoData = [
    {
      title: "Browse Pets",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      title: "Apply For Adoption",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      title: "Meet Your Match",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      title: "Finalize Adoption",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-headings">How It Works</h1>
  
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-infos" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;