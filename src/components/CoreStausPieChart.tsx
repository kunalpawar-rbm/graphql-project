import React from 'react';
import Chart from 'react-apexcharts';
import Heading from './Heading';

// Define types for the chart options
interface ChartOptions {
  series: number[];
  chart: {
    width: number;
    type: 'pie';
  };
  labels: string[];
  responsive: {
    breakpoint: number;
    options: {
      chart: {
        width: number;
      };
      legend: {
        position: 'bottom';
      };
    };
  }[];
}

interface map {
  statusMap: { [key: string]: number },
}

const CorePieChart: React.FC<map> = ({ statusMap }) => {
  // Define the options with type annotation
  const options: ChartOptions = {
    series: [statusMap["lost"], statusMap["expended"], statusMap["inactive"], statusMap["active"]],
    chart: {
      width: 500,
      type: 'pie',
    },
    labels: ['lost', 'expended', 'inactive', 'active'],
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  // The series data is extracted from options
  const series = options.series;

  return (
    <div>
      <div className="flex items-center justify-center px-3 py-3">
        <Heading heading={"Status"} />
      </div>
      <Chart
        options={options}
        series={series}
        type="pie"
        width={500}
      />
    </div>
  );
};

export default CorePieChart;
