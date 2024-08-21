import React from 'react';
import Chart from 'react-apexcharts';
import Heading from './Heading'; 

// Define types for the chart options
interface LineChartOptions {
    series: {
        name: string;
        data: number[];
    }[];
    chart: {
        type: 'line';
        height: number;
        zoom: {
            enabled: boolean;
        };
    };
    dataLabels: {
        enabled: boolean;
    };
    stroke: {
        curve: 'smooth'; // 'straight' is also acceptable, depending on the curve style
    };
    title: {
        text: string;
        align: 'left';
    };
    grid: {
        row: {
            colors: string[];
            opacity: number;
        };
    };
    xaxis: {
        categories: string[];
    };
}

// Define the props for the LineChart component
interface LineChartProps {
    title: string;
    categories: string[];
    data: number[];
}

// Define the props for the HistoryEventLineChart component
interface HistoryEventLineChartProps {
    eventYearMap: { [key: string]: number };
}

// Functional component for LineChart
const HistoryEventLineChart: React.FC<HistoryEventLineChartProps> = ({ eventYearMap }) => {
    // Taking all years for x axis
    const categories = Object.keys(eventYearMap);
    // Taking all freq of events occured on particular year
    const seriesData = categories.map(category => eventYearMap[category]);

    // Define the options with type annotation
    const options: LineChartOptions = {
        series: [{
            name: "Events",
            data: seriesData
        }],
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth' // 'smooth' curve style is often used for line charts
        },
        title: {
            text: 'No. of Events by Year',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: categories,
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center px-3 py-3'>
                <Heading heading={"Frequency"} />
            </div>
            <Chart
                options={options}
                series={options.series}
                type="line"
                height={options.chart.height}
            />
        </div>
    );
};

export default HistoryEventLineChart;
