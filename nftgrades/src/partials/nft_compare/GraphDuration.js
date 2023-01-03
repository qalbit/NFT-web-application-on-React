import React, { useEffect } from 'react'

const GraphDuration = ({
    firstNftGraphDataLoading,
    secondNftGraphDataLoading,
    graphDuration,
    setgraphDuration
}) => {
    const graphDurationChangeHandler = (e) => {
        setgraphDuration(e.target.value)
    }
    const show_option_container = (e) => {
        document.getElementById('option-container').style.display = 'block';
    }
    const hide_option_container = (e) => {
        document.getElementById('option-container').style.display = 'none';
    }

    useEffect(() => {
        hide_option_container();
    }, [graphDuration])
    

  return (
    <div className='graph-duration-container'>
        {/* <button 
            className={graphDuration == "hourly" ? 'active' : ''}
            onClick={()=>{
                setgraphDuration('hourly')
            }}>Hourly</button>
        <button 
            className={graphDuration == "weekly" ? 'active' : ''}
            onClick={()=>{
                setgraphDuration('weekly')
            }}>Weekly</button>
        <button 
            className={graphDuration == "monthly" ? 'active' : ''}
            onClick={()=>{
                setgraphDuration('monthly')
            }}>Monthly</button> */}

        {/* <select name="" id="" 
            defaultValue={'hourly'} 
            value={graphDuration}
            onChange={graphDurationChangeHandler}
        >
            <option value="Hourly">Hourly</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
        </select> */}
        <div className='graph-duration-content'>
            <span className='title'>History: </span>
            <span tabIndex={9998}
                className="graph-duration-wrapper"
                onFocus={()=>{
                    show_option_container()
                }}
                onBlur={()=>{
                    hide_option_container()
                }}
            >
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    readOnly 
                    placeholder='Select'
                    value={graphDuration}
                    
                />
                <div id='option-container'>
                    <span className='option' onClick={()=>{setgraphDuration('Hourly');hide_option_container()}}>Hourly</span>
                    <span className='option' onClick={()=>{setgraphDuration('Week');hide_option_container()}}>Week</span>
                    <span className='option' onClick={()=>{setgraphDuration('Month');hide_option_container()}}>Month</span>
                </div>

            </span>
        </div>
    </div>
  )
}

export default GraphDuration