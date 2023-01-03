import React from 'react';

function DotBar({bars}) {
    var color = 'grey';
    var item_fill = 0;
    if(bars > 0 && bars <= 3){
        color = 'red'
        item_fill = 1
    }
    else if(bars > 3 && bars  <= 7){
        color = 'yellow'
        item_fill = 3
    }
    else if(bars > 7 && bars <= 10){
        color = 'green'
        item_fill = 5
    }
  return (
    <div className="dot-container">
        {[1,2,3,4,5].map(function(item, index){
            if(index < item_fill){
                return <span key={index} className={color+ " dot"}></span>
            }
            else{
                return <span key={index} className="std dot"></span>
            }
        })}
    </div>
  )
}

export default DotBar