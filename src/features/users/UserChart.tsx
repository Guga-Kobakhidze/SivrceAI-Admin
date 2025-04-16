// StackedChart.tsx
import React from 'react'
import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
  ChartType,
  BarController,
  LineController,
} from 'chart.js'
import { useTheme } from '@mui/material'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const generateRandomData = (min: number, max: number, count: number) =>
  Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  )

const StackedChart: React.FC = () => {
  const { palette } = useTheme()
  const data: ChartData<ChartType> = {
    labels: months,
    datasets: [
      {
        label: 'Sales (in $K)',
        data: generateRandomData(20, 80, months.length),
        borderColor: '#523e43',
        backgroundColor: palette.text.secondary,
        stack: 'combined',
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomLeft: 0,
          bottomRight: 0,
        },
        type: 'bar',
      },
      {
        label: 'Growth (%)',
        data: generateRandomData(10, 30, months.length),
        borderColor: palette.primary.dark,
        backgroundColor: palette.primary.dark,
        stack: 'combined',
        type: 'line',
        tension: 0.4,
      },
    ],
  }

  const options: ChartOptions<ChartType> = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  }

  return <Chart type="bar" data={data} options={options} />
}

export default StackedChart
