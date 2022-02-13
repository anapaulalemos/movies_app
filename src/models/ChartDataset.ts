interface ChartDataset {
    labels: string[];
    datasets: {
        label: string;
        data: any[]
        backgroundColor: string;
    }[],
}

export default ChartDataset;