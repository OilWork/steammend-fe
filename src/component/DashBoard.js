import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import AnyChart from "anychart-react";
import anychart from "anychart";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function DashBoard() {

    const [inLoad, setInLoad] = useState(true)
    const [data, setData] = useState({
        "check": "check test",
        "genre_data": [
     
        ],
        "genre_label": [
          
        ],
        "playtime_data": [
     
        ],
        "playtime_label": [
        
        ],
        "publishers": {
            "data": [
            ],
            "label": [
            ]
        },
        "total_count": "",
        "total_playtime": "",
        "wordcloud_data": {
            "wordarray": [
            ]
        }
    });


    const playtimeCanvasData = {
        labels: data.playtime_label,
        datasets: [{
        label: '플레이 시간(분)',
        data: data.playtime_data,
        backgroundColor: [
            // 'rgba(85, 85, 85, 1)'
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(255, 153, 0)',
          'rgb(255, 0, 102)',
          'rgb(153, 102, 204)'
        ],
    }]
}
    const playtimeCanvasOption={
        legend: {
            display: false
          },
          scales: {
              y: {
                beginAtZero: true
              },
          },
          indexAxis:'y',
    }

    const genreCanvasData = {
        labels: data.genre_label,
        datasets: [{
        label: 'Genres',
        data: data.genre_data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]}

    const genreCanvasOption = {
        responsive: true,
            plugins: {
            title: {
                display: true,
                text: 'Chart.js Radar Chart'
            }
            }
    }

    const publisherCanvasData = {
                labels: data.publishers.label,
              datasets: [{
                  label: 'Publishers',
                  data: data.publishers.data,
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 153, 0)',
                    'rgb(255, 0, 102)',
                    'rgb(153, 102, 204)'
                    ],
                    hoverOffset: 4
              }]
    }

    useEffect(() => {
      console.log(sessionStorage.getItem("loginId"));
        async function getChart() {
          try {
            //응답 성공 
            const response = await axios.post("/api2/charts", null, {
              params: {
                id: sessionStorage.getItem("loginId")
              }
            });
            console.log(response);
            setData(response.data)
            setInLoad(false);
          } catch (error) {
            //응답 실패
            console.error(error);
          }
        }
        getChart();
        }, []);

    const tagData = data.wordcloud_data.wordarray;
    const tagChart = anychart.tagCloud(tagData);

  return (
    <>
    {inLoad ? <div className='Circular'>
    <br></br><br></br>
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
    <CircularProgress size="10rem"/>
 </Box></div> : <div class="container">
  <div class="main">
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <div class="number" id="total-playtime">{data.total_playtime}</div>
          <div class="card-name">총 플레이 시간(분)</div>
        </div>
        <div class="icon-box">
          <i class="fas fa-gamepad"></i>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="number" id="total-count">{data.total_count}</div>
          <div class="card-name">총 구매 게임건수</div>
        </div>
        <div class="icon-box">
          <i class="fas fa-credit-card"></i>
        </div>
      </div>
    </div>
    <div class="charts">
      <div class="chart">
        <h2>게임별 플레이 시간</h2>
        <Bar data={playtimeCanvasData} option={playtimeCanvasOption} />
        <canvas id="playtimeChart"></canvas>
      </div>
      <div class="chart">
        <h2>장르별 구매 비율</h2>
        <Radar data={genreCanvasData} option={genreCanvasOption}></Radar>
      </div>
      <div class="chart">
        <h2>태그 클라우드</h2>
        <div class="chart-area">
        <AnyChart width={800} height={600} instance={tagChart} />,
          <div id="wordcloud">
          </div>
        </div>
      </div>
      <div class="chart">
        <h2>게임 제작사별 구매 비율</h2>
        <canvas id="publisherChart"></canvas>
        <Doughnut data={publisherCanvasData}></Doughnut>
      </div>
    </div>
  </div>
  </div>}
     

  </>

  );
}



export default DashBoard;