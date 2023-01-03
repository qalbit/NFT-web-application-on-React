import {
  BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);



function NftRankGraph({graphData, ...props}) {
  const labels = graphData.months;
  const dataset = [];
  graphData.data.likes.forEach((element, index) => {
    dataset.push({
      label: graphData.months[index],
      data: element,
      customData: graphData.data.tooltip[index],
      backgroundColor: "rgb(255, 255, 255)",
      hoverBackgroundColor: "rgb(245 222 179)",
      stack: graphData.months[index],
    })
  });
  
  const data = {
    labels,
    datasets: dataset
  };

  // [
  //   {
  //     label: "Dataset 1",
  //     data: [2, 5, 6],
  //     customData: ['hello', 'how', 'are'],
  //     backgroundColor: "rgb(255, 255, 255)",
  //     hoverBackgroundColor: "rgb(245 222 179)",
  //     stack: "Stack 0",
  //   },
  //   {
  //     label: "Dataset 2",
  //     data: [9, 8, 3],
  //     customData: [],
  //     backgroundColor: "rgb(255, 255, 255)",
  //     hoverBackgroundColor: "rgb(245 222 179)",
  //     stack: "Stack 1",
  //   },
  //   {
  //     label: "Dataset 3",
  //     data: [4, 5, 10],
  //     customData: [],
  //     backgroundColor: "rgb(255, 255, 255)",
  //     hoverBackgroundColor: "rgb(245 222 179)",
  //     stack: "Stack 3",
  //   },
  //   {
  //     label: "Dataset 4",
  //     data: [4, 5, 10],
  //     customData: [],
  //     backgroundColor: "rgb(255, 255, 255)",
  //     hoverBackgroundColor: "rgb(245 222 179)",
  //     stack: "Stack 4",
  //   },
  //   {
  //     label: "Dataset 5",
  //     data: [4, 5, 10],
  //     customData: [],
  //     backgroundColor: "rgb(255, 255, 255)",
  //     hoverBackgroundColor: "rgb(245 222 179)",
  //     stack: "Stack 5",
  //   },
  // ]

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map(b => b.lines);
  
      const tableHead = document.createElement('thead');
  
      titleLines.forEach(title => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = 0;
  
        const th = document.createElement('th');
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);
  
        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });
  
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];
  
        // const span = document.createElement('span');
        // span.style.background = colors.backgroundColor;
        // span.style.borderColor = colors.borderColor;
        // span.style.borderWidth = '2px';
        // span.style.marginRight = '10px';
        // span.style.height = '10px';
        // span.style.width = '10px';
        // span.style.display = 'inline-block';
  
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = 0;
  
        const td = document.createElement('td');
        td.style.borderWidth = 0;
        const text = document.createElement('div');
        text.innerHTML = body[0];
        td.style.fontSize = '12px'
        // td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });
  
      const tableRoot = tooltipEl.querySelector('table');
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
      // tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
  
      const table = document.createElement('table');
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };

  
  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Tranding NFTs',
      },
      // tooltip: {
      //   callbacks: {
      //     label: function(item) {
      //       console.log(item.dataset.customData[item.dataIndex].replaceAll('<br/>', '\n'));
      //       return item.dataset.customData[item.dataIndex];
      //     },
      //   },
      // },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
        callbacks: {
          label: function(item) {
            return item.dataset.customData[item.dataIndex];
          },
        },
      }
    },
    responsive: document.body.clientWidth < 577 ? false : true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        grid: {
            display: false
        }
        },
    y: {
        title: {
            text: "TOP TRENDING IN LEADERBOARD VOTES",
            display: true,
            font:{
                size: 8
            }
        },
        ticks: {
            display: false
        },
        grid: {
            display: false
        }
      },
    },

  };
  // console.log(graphData);
    return (
        <div className="rank-block">
                <div className="bar-graph-wrapper">
                  <div className="heading">
                    <h2>
                      <span className="highlight">Reflect Rank</span> NFTs
                    </h2>
                  </div>
                  <div className="bar-graph">
                    
                  <Bar options={options} data={data} height={200}/>

                  </div>
                </div>
              </div>
    )
}

export default NftRankGraph
