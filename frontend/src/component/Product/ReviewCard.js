import React from 'react'
import RatingStars from "react-rating-stars-component"
import profilePng from "../../images/Profile.png"

const ReviewCard = ({review}) => {

    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20:25,
        value:review.ratings,
        isHalf: true
    }

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="USer"/>
        <p>{review.name}</p>
        <RatingStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard