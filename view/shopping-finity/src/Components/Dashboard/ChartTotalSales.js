import React from "react";
import Chart from "react-apexcharts";
import Col from "react-bootstrap/Col";
import { HiOutlineDotsVertical } from "react-icons/hi";
import '../../style/navbar.css';

const ChartTotalSales = () => {
  const data = {
    series: [
      {
        name: "Women",
        data: [150, 80, 30, 100, 70, 160, 100, 69, 90, 209, 260, 100],
      },
      {
        name: "Man",
        data: [30, 180, 30, 100, 70, 60, 170, 69, 90, 240, 60, 100],
      },
      {
        name: "Kids",
        data: [10, 80, 30, 60, 240, 160, 120, 69, 90, 200, 300, 80],
      },
    ],
    options: {
      chart: {
        height: 388,
        type: "area",
      },

      fill: {
        colors: ["Violet"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        // type: "datetime",
        categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
        //   "2018-09-19T00:00:00.000Z",
        //   "2018-09-19T01:30:00.000Z",
        //   "2018-09-19T02:30:00.000Z",
        //   "2018-09-19T03:30:00.000Z",
        //   "2018-09-19T04:30:00.000Z",
        //   "2018-09-19T05:30:00.000Z",
        //   "2018-09-19T06:30:00.000Z",
        ],
      },
      yaxis: {
        show: false
      },
      toolbar: {
        show: false
      }
    },
  };
  return (
    <Col xs={10} md={10} lg={10} style={{ height: '485px' }}>
      <div className="cards Chart-tSales">
        <div className="d-flex w-100 justify-content-between">
          <h4>Total Sales</h4>
          <div className="menu">
            <HiOutlineDotsVertical className="font-20"/>
          </div> 
        </div>
        <span className="">$ 12,450</span>
        <Chart 
          options={data.options} 
          series={data.series} 
          type={data.options.chart.type} 
          height={data.options.chart.height} 
          toolbar={data.options.toolbar}
        />
      </div>
    </Col>
  );
};

export default ChartTotalSales;