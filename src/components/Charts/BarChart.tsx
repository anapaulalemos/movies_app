import { BarElement, CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
        onHover: function (event, element) {
            (event.native?.target as any).style.cursor = 'pointer';
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
        },
        parsing: {
            xAxisKey: 'title',
            yAxisKey: 'index'
        },
        onClick: (evt, element) => {
            const { id } = (element[0].element as any).$context.raw;
            navigate(`/movie/${id}`);
        }
    };

    return <Bar options={options} data={datasets} />;
}

export default BarChart;