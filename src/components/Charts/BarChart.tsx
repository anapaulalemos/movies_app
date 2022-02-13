import { BarControllerChartOptions, BarElement, BarOptions, CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import ChartDataset from '../../models/ChartDataset';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    datasets: ChartDataset;
}

const BarChart = ({ datasets }: BarChartProps) => {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Top movies',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                ticks: {
                    callback: function (val: any, index: any) {
                        return `${this.getLabelForValue(val).substring(0, 9)}...`;
                    },
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Position',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    };

    return <Bar options={options} data={datasets} />;
}

export default BarChart;