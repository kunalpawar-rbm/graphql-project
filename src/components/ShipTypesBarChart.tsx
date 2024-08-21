// src/components/BarChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Heading from './Heading';

// Define the types for the chart options
interface ChartOptions {
    series: { data: number[] }[];
    chart: {
        type: 'bar';
        height: number;
    };
    plotOptions: {
        bar: {
            borderRadius: number;
            borderRadiusApplication: 'end';
            horizontal: boolean;
        };
    };
    dataLabels: {
        enabled: boolean;
    };
    xaxis: {
        categories: string[];
    };
}

interface types {
    types: { [key: string]: number }
}

const ShipTypesBarChart: React.FC<types> = ({ types }) => {
    // Define the options with type annotation
    const options: ChartOptions = {
        series: [{
            data: [types["Tug"], types["Cargo"], types["Barge"], types["High Speed Craft"]]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Tug', 'Cargo', 'Barge', 'High Speed Craft'],
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center px-3 py-3'>
                <Heading heading={"Types"} />
            </div>
            <Chart
                options={options}
                series={options.series}
                type="bar"
                height={options.chart.height}
            />
        </div>
    );
};

export default ShipTypesBarChart;
