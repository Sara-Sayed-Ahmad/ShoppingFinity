import React from "react";

const StartRating = ({rating}) =>{
    const maxStars = 5;
    const fullStar = '★';
    const emptyStar = '☆';

    const fullStarsCount = Math.round(rating);
    const emptyStarsCount = maxStars - fullStarsCount;

    const fullStars = 
        <span style={{color: '#ffe400'}}>
            {fullStar.repeat(fullStarsCount)}
        </span>

    const emptyStars = 
        <span style={{color: '#909595'}}>
            {emptyStar.repeat(emptyStarsCount)}
        </span>

    return (
        <>
            <div>
                {fullStars}
                {emptyStars}
            </div>
        </>
    );
}

export default StartRating;