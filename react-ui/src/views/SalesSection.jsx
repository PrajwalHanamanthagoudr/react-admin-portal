import { useEffect, useRef } from "react";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as echarts from "echarts";

const SalesSection = () => {
  const chartRefs = useRef([]);
  const charts = useRef([]);

  const cards = [
    { title: "Sales by Region" },
    { title: "Sales by e-commerce platform" },
    { title: "Registered users", subtitle: "an overview of your users" },
  ];

  const initCharts = () => {
    // Radar Chart - Sales by Region
    const radarChart = echarts.init(chartRefs.current[0]);
    radarChart.setOption({
      radar: {
        indicator: [
          { name: "Europe 2,728", max: 4000 },
          { name: "America 2,409", max: 4000 },
          { name: "Africa 3,028", max: 4000 },
          { name: "Middle East 800", max: 4000 },
          { name: "Pacific 1,8383", max: 4000 },
          { name: "Asia 2,843", max: 4000 },
        ],
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [2728, 2409, 3028, 800, 1838, 2843],
              areaStyle: {
                color: "rgba(0, 150, 136, 0.2)",
              },
              lineStyle: {
                color: "#009688",
              },
            },
          ],
        },
      ],
    });

    // Pie Chart - Sales by Platform
    const pieChart = echarts.init(chartRefs.current[1]);
    pieChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}%",
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          data: [
            { value: 25, name: "Tokopedia", itemStyle: { color: "#009688" } },
            { value: 45, name: "Alibaba", itemStyle: { color: "#FF9800" } },
            { value: 35, name: "Amazon", itemStyle: { color: "#9E9E9E" } },
          ],
          label: {
            formatter: "{b}\n{c}%",
          },
        },
      ],
    });

    // Gauge Chart - Registered Users
    const gaugeChart = echarts.init(chartRefs.current[2]);
    gaugeChart.setOption({
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 2500,
          splitNumber: 5,
          itemStyle: {
            color: "#009688",
          },
          progress: {
            show: true,
            roundCap: true,
            width: 18,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, "0%"],
            fontSize: 24,
            formatter: "{value}",
            color: "inherit",
          },
          data: [
            {
              value: 2324,
              name: "Total Users",
              title: {
                offsetCenter: [0, "-35%"],
              },
              detail: {
                offsetCenter: [0, "0%"],
              },
            },
          ],
        },
      ],
    });

    charts.current = [radarChart, pieChart, gaugeChart];
  };

  useEffect(() => {
    initCharts();

    // Handle resize
    const handleResize = () => {
      charts.current.forEach((chart) => chart.resize());
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      charts.current.forEach((chart) => chart.dispose());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card
            elevation={0}
            sx={{
              height: 300,
              border: "1px solid gainsboro",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div>
                <Typography variant="subtitle1" fontWeight={600}>{card.title}</Typography>
                  {card.subtitle && (
                    <Typography variant="subtitle2" sx={{ color: "#97a3b6" }}>
                      {card.subtitle}
                    </Typography>
                  )}
                </div>
                <IconButton>
                  <MoreHorizIcon sx={{ color: "#97A3B6" }} />
                </IconButton>
              </div>
              <div
                ref={(el) => (chartRefs.current[index] = el)}
                style={{ width: "100%", height: 230 }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SalesSection;
