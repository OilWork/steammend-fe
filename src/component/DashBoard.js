import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import AnyChart from "anychart-react";
import anychart from "anychart";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CryptoJS from 'crypto-js';


function DashBoard(prop) {

  const [inLoad, setInLoad] = useState(true);
  const [recom, setRecom] = useState([]);
  const [indexSlide, setIndexSlide] = useState(0);
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
  const playtimeCanvasOption = {
    legend: {
      display: false
    },
    scales: {
      y: {
        beginAtZero: true
      },
    },
    indexAxis: 'y',
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
    }]
  }

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
  async function getChart() {
    try {
      //응답 성공 
      const response = await axios.post("/api2/charts", null, {
        params: {
          id: JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id']
        }
      });
      console.log(response);
      setData(response.data)
      setInLoad(false);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  };
  async function getRecommend() {
    try {
      //응답 성공 
      const response = await axios.post("/api2/my-recomm", null, {
        params: {
          id: JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id']
        }
      });
      console.log(response.data);
      setRecom(response.data);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  };

  useEffect(() => {
    getRecommend();
  }, []);
  useEffect(() => {
    getChart();
  }, []);

  const plusSlides = (index) =>{
    let slideindex = indexSlide + index;
    if(slideindex==-1){
      slideindex = 4;
    }if(slideindex==5){
      slideindex = 0;
    }
    setIndexSlide(slideindex)
  }
  

  const tagData = data.wordcloud_data.wordarray;
  const tagChart = anychart.tagCloud(tagData);


  function urlLink(id) {
    window.open(`https://store.steampowered.com/app/${id}/`, '_blank');
}

  return (
    <>
    {prop.menuSeleted == 0 ?
      inLoad ? <div className='Circular'>
        <br></br><br></br>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size="10rem" />
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
      </div> : !inLoad ? <><div class="container">
      
        <div class="mySlides" style={{display : indexSlide ==0 ? "block" : 'none'}}>
        <div class="numbertext">1 / 5</div>
        <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${recom[0].appid}/header.jpg`} style={{width:'100%'}} />
      </div>
        <div class="mySlides" style={{display : indexSlide ==1 ? "block" : 'none'}}>
        <div class="numbertext">2 / 5</div>
        <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${recom[1].appid}/header.jpg`} style={{width:'100%'}} />
      </div>
        <div class="mySlides" style={{display : indexSlide ==2 ? "block" : 'none'}}>
        <div class="numbertext">3 / 5</div>
        <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${recom[2].appid}/header.jpg`} style={{width:'100%'}} />
      </div>
        <div class="mySlides" style={{display : indexSlide ==3 ? "block" : 'none'}}>
        <div class="numbertext">4 / 5</div>
        <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${recom[3].appid}/header.jpg`} style={{width:'100%'}} />
      </div>
        <div class="mySlides" style={{display : indexSlide ==4 ? "block" : 'none'}}>
        <div class="numbertext">5 / 5</div>
        <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${recom[4].appid}/header.jpg`} style={{width:'100%'}} />
      </div>
        

        <a class="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a class="next" onClick={() => plusSlides(1)}>&#10095;</a>


        <div class="row2">
          {recom[indexSlide].recommend_list.map((item, index) => (
            <div class="column2" key={index} onClick={() => urlLink(item.steam_appid)}>
            <img class="demo cursor" src={item.header_image} style={{width:'100%'}} onclick="currentSlide(1)" alt="The Woods" />
          </div>
          ))}
          
        </div>
      </div> </> : ''}


    </>

  );
}



export default DashBoard;