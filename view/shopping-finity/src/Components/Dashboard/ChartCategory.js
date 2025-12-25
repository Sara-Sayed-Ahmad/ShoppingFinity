import React from "react";
import Chart from "react-apexcharts";
import Col from "react-bootstrap/Col";
import { HiOutlineDotsVertical } from "react-icons/hi";
import '../../style/navbar.css';

const ChartCategory = () => {
  const data = {
    series: [
      {
        name: "Sales",
        data: [763, 588, 689],
      },
    ],
    options: {
      chart: {
        height: 201,
        type: "bar",
      },

      fill: {
        colors: ["#0096FF"],
        //  type: "gradient",
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
      toolbar: {
        show: false
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: ["Women", "Man", "Kids"],
      },
    },
  };
  return (
    <Col xs={10} md={6} lg={7} className="padd-chart-category" style={{ height: '330px' }}>
      <div className="cards Chart-Category pb-1">
        <div className="d-flex">
          <h4 className="mb-0">Sales</h4>
        </div>
        <span className="paragraph-sa">Numbers of sales for each category</span>
        <Chart 
          options={data.options} 
          series={data.series} 
          type={data.options.chart.type} 
          width="295px"
          height={data.options.chart.height} 
          toolbar={data.options.toolbar}
        />
      </div>
    </Col>
  );
};

export default ChartCategory;