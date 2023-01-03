import Chart from "react-apexcharts";
import React, { useState } from 'react'

function CandelstickGraph({candelstickDataset}) {
    const [option, setoption] = useState({
        chart: {
          height: "auto",
          type: "candlestick",
          zoom:{
            enabled: false
          },
          toolbar: {
              show: false
          }
        },
        grid:{
            borderColor: "#96a5ad8c"
        },
        xaxis: {
          type: "category",
          //tickPlacement: 'between',
          axisBorder:{
            color:"#96a5ad8c"
          },
          labels:{
              style:{
                  fontSize:'9px'
              }
          }
        },
        yaxis: {
          decimalsInFloat: 0
        },
        stroke:{
            width: 2
        },
        plotOptions: {
            candlestick: {
              colors: {
                upward: '#008000',
                downward: '#ff0000'
              }
            }
        },
        tooltip: {
            theme: 'dark',
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                return (
                '<div class="arrow_box">' +
                "<span>Average: "+candelstickDataset[seriesIndex].data[dataPointIndex].y[0] +"</span><br>" +
                "<span>Floor: "+candelstickDataset[seriesIndex].data[dataPointIndex].y[2] +"</span><br>" +
                "<span>Ceiling: "+candelstickDataset[seriesIndex].data[dataPointIndex].y[1] +"</span>" +
                "</div>"
                );
            }
        }
      });

    const [series, setseries] = useState(candelstickDataset);


    if(series){
        return <Chart
            options={option}
            series={series}
            type="candlestick"
            height={(document.body.clientWidth < 577) ? 400 : 'auto'}
        />
    }
    else{
        return '';
    }
}

export default CandelstickGraph