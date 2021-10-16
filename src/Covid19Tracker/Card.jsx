import React from 'react'


function Card(props) 
{
    return (
        <div className="CardStyling"> 
            {props.children}
        </div>
    )
}

export default Card
