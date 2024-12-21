"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, Legend, Title } from "chart.js";
import { DatePicker, Space } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { useTrendGraphData } from "@/queries/dashboard";
import { useDashboardFilterStore } from "@/store/dashboard-filter-store";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

export const CountTrendChart = () => {
    const [dates, setDates] = useState<[string, string] | null>([
        dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
    ]);

    const { filters } = useDashboardFilterStore();

    const { data, isLoading } = useTrendGraphData({ dates, ...filters });
    if (isLoading) {
        return <p>Loading Graph...</p>;
    }

    const { labels = [], data: graphData = [] }: any = data || { labels: [], data: [] };

    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) => {
        if (dates) {
            setDates(dateStrings);
        }
    };

    const options: any = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'center',
                labels: {
                    boxWidth: 15,
                    boxHeight: 15,
                    borderRadius: 2,
                    useBorderRadius: true,
                    color: "#04121E"
                },
            },
            title: {
                align: 'start',
                display: true,
                color: 'gray',
                text: 'Finding Count Trend',
                font: {
                    family:'Prompt, sans-serif',
                    size: 20, // Increased font size
                    weight:'bold'
                },
            },
            // tooltip: {
            //     enabled: true,
            //     callbacks: {
            //         label: (tooltipItem: any) => {
            //             // Customize tooltip content
            //             return `Count: `;
            //         },
            //     },
            // },
            customPlugins: [
                {
                    id: 'titleTooltipPlugin',
                    beforeDraw: (chart: any) => {
                        const ctx = chart.ctx;
                        const chartArea = chart.chartArea;
        
                        // Tooltip text and styles
                        const tooltipText = 'Custom Tooltip';
                        ctx.save();
                        ctx.font = '14px Prompt, sans-serif';
                        ctx.fillStyle = 'gray';
                        ctx.textAlign = 'right';
        
                        // Position the tooltip near the title
                        ctx.fillText(tooltipText, chartArea.right, chartArea.top - 10);
                        ctx.restore();
                    },
                },
            ],
        },
    };

    return (
        <div className="w-full border rounded p-4 mt-2">
            <div className="flex justify-end mb-4">
                <Space>
                    <DatePicker.RangePicker
                        picker="month"
                        placeholder={['Start Date', 'End Date']}
                        onChange={(dates: any, dateStrings: any) => handleDateRangeChange(dates, dateStrings)}
                        format="YYYY-MM-DD"
                        value={[dayjs(dates?.[0]), dayjs(dates?.[1])]}
                    />
                </Space>
            </div>
            <div className="w-full mx-auto">
                <Line
                    key={JSON.stringify(dates)}
                    data={{
                        labels: labels.length > 0 ? labels : ['No Data'],
                        datasets: graphData.length > 0
                            ? graphData
                            : [{
                                label: 'No Data',
                                data: [0],
                                borderColor: 'rgba(200, 200, 200, 0.5)', 
                                backgroundColor: 'rgba(200, 200, 200, 0.2)',
                            }],
                    }}
                    options={options}
                />
            </div>
        </div>
    );
};
