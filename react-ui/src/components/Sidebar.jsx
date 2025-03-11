import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Stack,
  Switch,
  MenuItem,
  Menu,
  Card,
  Container,
  Button,
  CardContent,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { MessageOutlined } from "@mui/icons-material";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import { useNavigate } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
const drawerWidth = 240;

const menuItems = [
  { title: "Overview", icon: <SpaceDashboardOutlinedIcon />, path: "/" },
  {
    title: "Performance",
    icon: <TrendingUpOutlinedIcon />,
    path: "/performance",
  },
  { title: "Campaigns", icon: <TextSnippetOutlinedIcon />, path: "/campaigns" },
  { title: "Orders", icon: <LocalMallOutlinedIcon />, path: "/orders" },
  { title: "Products", icon: <ViewInArRoundedIcon />, path: "/products" },
  { title: "Message", icon: <MessageOutlined />, path: "/message" },
  {
    title: "Sales Platform",
    icon: <PhoneIphoneOutlinedIcon />,
    path: "/sales-platform",
  },
];

const additionalItems = [
  { title: "Demo Mode", icon: <TouchAppOutlinedIcon />, switch: true },
  { title: "Feedback", icon: <LocalFireDepartmentIcon />, path: "/feedback" },
  { title: "Help and Docs", icon: <InfoOutlinedIcon />, path: "/help-docs" },
];

const icons = [
  { icon: <FileDownloadOutlinedIcon />, label: "Download" },
  { icon: <LocalFireDepartmentIcon />, label: "Trending" },
  { icon: <SettingsOutlinedIcon />, label: "Settings" },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  width: theme.spacing(7),
  [theme.breakpoints.up("sm")]: { width: theme.spacing(8) },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    if (path) navigate(path);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => setOpen(!isMobile), [isMobile]);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        open={open}
        sx={{ borderBottom: "1px solid gainsboro", bgcolor: "white" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon style={{ color: "#97A3B6" }} />
            </IconButton>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton style={{ color: "#97A3B6" }}>
                <SearchRoundedIcon />
              </IconButton>
              <input
                type="text"
                placeholder="Search anything here..."
                style={{
                  outline: "none",
                  color: "#97A3B6",
                  border: "none",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.7px",
                }}
              />
            </Stack>
          </Box>
          {/* Right Side */}
          {!isMobile ? (
            <Stack direction="row" alignItems="center">
              {icons.map((item, index) => (
                <IconButton key={index} style={{ color: "#97A3B6" }}>
                  {item.icon}
                </IconButton>
              ))}
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: 38,
                  mx: 1,
                  borderColor: "gainsboro",
                  borderWidth: 1,
                }}
              />
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton
                  sx={{
                    color: "#FFFFFF",
                    bgcolor: "#EB862A",
                    "&:hover": { bgcolor: "#FFC107" },
                    borderRadius: "50%",
                  }}
                >
                  <SentimentSatisfiedRoundedIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#97A386",
                  }}
                >
                  <ExpandMoreRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>
          ) : (
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertRoundedIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* Use a for loop to render menu items */}
                {icons.map((item, index) => (
                  <MenuItem key={index}>
                    {item.icon}
                    <span style={{ marginLeft: "8px" }}>{item.label}</span>
                  </MenuItem>
                ))}
                <MenuItem>
                  <SentimentSatisfiedRoundedIcon
                    sx={{
                      color: "#FFFFFF",
                      bgcolor: "#FFD700",
                      borderRadius: "50%",
                      p: 0.5,
                    }}
                  />
                  Smile
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {/* Left Side: Logo and Typography */}
          <Stack direction="row" alignItems="center" spacing={1} pl={2}>
            <IconButton
              aria-label="Logo"
              size="small"
              sx={{ bgcolor: "#287F71", borderRadius: "8px", color: "white" }}
            >
              <SignalCellularAltIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="h6" fontWeight={600}>
              Consist
            </Typography>
          </Stack>
          <DrawerHeader>
            <IconButton
              onClick={() => setOpen(!open)}
              style={{ color: "#97A3B6" }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </DrawerHeader>
        </Stack>
        <List
          sx={{
            pl: isMobile ? 0 : "10px",
            pr: isMobile ? 0 : "10px",
            borderRadius: isMobile ? 0 : "10px",
            color: "#97A3B6",
          }}
        >
          {!isMobile && (
            <Typography variant="subtitle2" ml={3}>
              MAIN MENU
            </Typography>
          )}
          {menuItems.map((item, index) => (
            <ListItem
              sx={{
                ...(location.pathname === item.path &&
                  !isMobile && {
                    bgcolor: "#287F71",
                    color: "white",
                  }),
                ...(isMobile && { bgcolor: "transparent", color: "inherit" }),
                borderRadius: !isMobile ? "8px" : 0,
              }}
              button
              key={index}
              onClick={() => handleNavigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path && !isMobile
                      ? "white"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isMobile && <ListItemText primary={item.title} />}
            </ListItem>
          ))}
        </List>
        <Divider sx={{ m: 3 }} />

        <List
          sx={{
            pl: isMobile ? 0 : "10px",
            pr: isMobile ? 0 : "10px",
            borderRadius: isMobile ? 0 : "10px",
            color: "#97A3B6",
          }}
        >
          {additionalItems.map((item, index) => (
            <ListItem
              sx={{
                ...(location.pathname === item.path &&
                  !isMobile && {
                    bgcolor: "#287F71",
                    color: "white",
                  }),
                ...(isMobile && { bgcolor: "transparent", color: "inherit" }),
                borderRadius: !isMobile ? "8px" : 0,
              }}
              button={!item.switch}
              key={index}
              onClick={() => item.path && handleNavigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path && !isMobile
                      ? "white"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {item.switch && <Switch size="small" />}
            </ListItem>
          ))}
        </List>
        <Container>
          <Card elevation={2} sx={{ backgroundColor: "#287F71" }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="body2" color="white" sx={{ marginBottom: 4,mr:2}}>
                Get detailed analytics for <br /> help you, upgrade pro
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#287F71",
                  borderRadius: "10px",
                }}
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </Container>
        <br />
      </Drawer>
    </Box>
  );
}
