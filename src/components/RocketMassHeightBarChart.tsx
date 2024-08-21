import Heading from "./Heading";
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

interface ChartOptions {
    series: Array<{
        name: string;
        data: number[];
    }>;
    chart: {
        type: 'bar' | 'line' | 'area' | 'pie' | 'donut' | 'radar' | 'scatter'; // Extend with other chart types as needed
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
    yaxis: {
        title: {
            text: string;
        };
    };
    fill: {
        opacity: number;
    };
    tooltip: {
        y: {
            formatter: (val: number) => string;
        };
    };
}

interface types {
    types: { [key: string]: number }
}

const RocketMassHeightBarChart: React.FC<types> = ({ types }) => {
    const options: ChartOptions = {
        series: [{
            name: 'Mass',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Height',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: 'Mass(kg), Height(m)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center px-3 py-3'>
                <Heading heading={"Name vs (Mass & Height)"} />
            </div>
            <Chart
                options={options}
                series={options.series}
                type="bar"
                height={options.chart.height}
            />
        </div>
    )
};

export default RocketMassHeightBarChart;