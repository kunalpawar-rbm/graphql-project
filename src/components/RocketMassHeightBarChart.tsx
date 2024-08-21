import React from 'react';
import Chart from 'react-apexcharts';
import Heading from './Heading';

// Defining the shape of ChartOptions for ApexCharts
interface ChartOptions {
    series: Array<{
        name: string;
        data: number[];
    }>;
    chart: {
        type: 'bar' | 'line' | 'area' | 'pie' | 'donut' | 'radar' | 'scatter'; 
        height: number;
    };
    plotOptions: {
        bar: {
            horizontal: boolean;
            columnWidth: string;
            endingShape: 'rounded' | 'flat';
        };
    };
    dataLabels: {
        enabled: boolean;
    };
    stroke: {
        show: boolean;
        width: number;
        colors: string[];
    };
    xaxis: {
        categories: string[];
    };
    yaxis: Array<{
        title: {
            text: string;
        };
        labels: {
            formatter: (value: number) => string;
        };
        opposite?: boolean;  
    }>;
    fill: {
        opacity: number;
    };
    tooltip: {
        y: {
            formatter: (value: number, { seriesIndex }: { seriesIndex: number }) => string;
        };
    };
}

interface RocketMassHeightBarChartProps {
    massMap: { [key: string]: number };
    heightMap: { [key: string]: number };
}

const RocketMassHeightBarChart: React.FC<RocketMassHeightBarChartProps> = ({ massMap, heightMap }) => {
    const categories = Object.keys(massMap);
    const massData: number[] = Object.values(massMap);
    const heightData: number[] = Object.values(heightMap);

    const options: ChartOptions = {
        series: [{
            name: 'Mass',
            data: massData,
        }, {
            name: 'Height',
            data: heightData,
        }],
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: categories,
        },
        yaxis: [{
            title: {
                text: 'Mass (10^4 kg)',
            },
            labels: {
                formatter: (value) => `${value} * 10^4 kg`,
            },
        }, {
            opposite: true,
            title: {
                text: 'Height (m)',
            },
            labels: {
                formatter: (value) => `${value} m`,
            },
        }],
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (value, { seriesIndex }) => {
                    if (seriesIndex === 0) {
                        return `${value} * 10^4 kg`; // Mass tooltip
                    } else {
                        return `${value} m`; // Height tooltip
                    }
                },
            },
        },
    };

    return (
        <div>
            <div className='flex justify-center items-center px-3 py-3'>
                <Heading heading={"Bar Chart"} />
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

export default RocketMassHeightBarChart;
