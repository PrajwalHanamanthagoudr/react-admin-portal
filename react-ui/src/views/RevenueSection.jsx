import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const RevenueSection = () => {
  const chartRef = useRef(null);

  const revenueData = [
    {
      label: "Total Revenue",
      value: "$32,839.99",
      percent: "55%",
      color: "#278F71",
    },
    {
      label: "Total Target",
      value: "$30,932.12",
      percent: "45%",
      color: "#EB862A",
    },
  ];

  const sessionData = [
    {
      country: "Australia",
      flag: "https://flagcdn.com/au.svg",
      value: "634 ' 8%",
      percent: 90,
    },
    {
      country: "Indonesia",
      flag: "https://flagcdn.com/id.svg",
      value: "589 ' 7.2%",
      percent: 80,
    },
    {
      country: "Thailand",
      flag: "https://flagcdn.com/th.svg",
      value: "562 ' 6.2%",
      percent: 70,
    },
    {
      country: "Germany",
      flag: "https://flagcdn.com/de.svg",
      value: "453 ' 5.4%",
      percent: 60,
    },
  ];

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: [
          "Mar 2023",
          "Jun 2023",
          "Sep 2023",
          "Dec 2023",
          "Mar 2024",
          "Jun 2024",
          "Sep 2024",
          "Dec 2024",
        ],
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 20000,
        interval: 10000,
        axisLabel: {
          formatter: (value) => `$${value / 1000}`,
        },
      },
      series: [
        {
          name: "Revenue",
          type: "line",
          data: [
            16000.1, 12823.98, 11000.22, 10500.45, 14300.45, 7009.78, 12700.67,
            17000.95,
          ],
          smooth: true,
          color: "#278F71",
        },
        {
          name: "Target",
          type: "line",
          data: [
            12000.03, 10110.0, 9000.23, 11000.57, 7500.36, 9300.87, 13600.68,
            13400.56,
          ],
          smooth: true,
          color: "#EB862A",
        },
      ],
    };

    chart.setOption(option);

    return () => chart.dispose();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Revenue Over Time Section */}
      <Grid item xs={12} md={8}>
        <Card
          elevation={0}
          sx={{
            height: 315,
            border: "1px solid gainsboro",
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Revenue Over Time</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {revenueData.map((item, index) => (
                    <Box key={index} sx={{ display: "flex" }}>
                      <Box component="span" sx={{ color: item.color }}>
                        ◆
                      </Box>
                      <Box sx={{ ml: 1 }}>
                        <Typography color="text.secondary">
                          {item.label}
                        </Typography>
                        <Typography fontWeight="bold">
                          {item.value}{" "}
                          <Box component="span" color="text.secondary">
                            {item.percent}
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box>
                <IconButton>
                  <FileDownloadOutlinedIcon sx={{ color: "#97A3B6" }} />
                </IconButton>
                <IconButton>
                  <MoreHoriz sx={{ color: "#97A3B6" }} />
                </IconButton>
              </Box>
            </Box>
            <Box ref={chartRef} sx={{ width: "100%", height: 250 }} />
          </CardContent>
        </Card>
      </Grid>

      {/* Session by Country Section */}
      <Grid item xs={12} md={4}>
        <Card
          elevation={0}
          sx={{
            height: 315,
            border: "1px solid gainsboro",
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Box>
              <Typography variant="subtitle1" fontWeight={600}>Session by Country</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Showing Data for Top Session
                </Typography>
              </Box>
              <IconButton>
                <MoreHoriz sx={{ color: "#97A3B6" }} />
              </IconButton>
            </Box>
            <Stack spacing={2}>
              {sessionData.map((session, index) => (
                <Box key={index}>
                  <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                    <Avatar src={session.flag} sx={{ width: 24, height: 24 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography color="text.secondary">
                          {session.country}
                        </Typography>
                        <Typography fontWeight="bold">
                          {session.value}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={session.percent}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#287F71",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RevenueSection;
