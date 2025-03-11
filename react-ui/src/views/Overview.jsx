import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Container,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMediaQuery, MenuItem, Menu } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import RevenueSection from "./RevenueSection";
import SalesSection from "./SalesSection";

const Overview = () => {
  const buttons = [
    { text: "Customize Widget", Icon: DashboardOutlinedIcon },
    { text: "Filter", Icon: FilterListRoundedIcon },
    { text: "Share", Icon: ShareOutlinedIcon },
  ];

  const [cards, setCards] = useState([
    { id: "1", title: "Total Income", value: "$32,499.93", perChange: 12.95 },
    { id: "2", title: "Profit", value: "$10,499.93", perChange: -0.33 },
    { id: "3", title: "Total Views", value: "5,211,832", perChange: 0.32 },
    { id: "4", title: "Conversion Rate", value: "4.83%", perChange: 8.05 },
  ]);

  const [customizationDialog, setCustomizationDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    perChange: 0,
  });
  const [editCardId, setEditCardId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const isMobile = useMediaQuery("(max-width:768px)");

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const moveCard = (draggedId, droppedId) => {
    const updatedCards = [...cards];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedId
    );
    const droppedIndex = updatedCards.findIndex(
      (card) => card.id === droppedId
    );

    const [draggedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(droppedIndex, 0, draggedCard);
    setCards(updatedCards);
  };

  const onCustomize = (buttonText) => {
    if (buttonText === "Customize Widget") {
      setCustomizationDialog(true);
    }
  };

  const handleCreateEditCard = () => {
    if (editCardId) {
      // Edit card logic
      const updatedCards = cards.map((card) =>
        card.id === editCardId ? { ...card, ...formData } : card
      );
      setCards(updatedCards);
    } else {
      // Create card logic
      setCards([...cards, { id: String(cards.length + 1), ...formData }]);
    }
    setCreateDialog(false);
    setFormData({ title: "", value: "", perChange: 0 });
    setEditCardId(null);
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const CardItem = ({ card }) => {
    const [, drag] = useDrag({
      type: "CARD",
      item: { id: card.id },
    });

    const [, drop] = useDrop({
      accept: "CARD",
      hover: (item) => {
        if (item.id !== card.id) {
          moveCard(item.id, card.id);
          item.id = card.id; // Update dragged item's ID after swap
        }
      },
    });

    return (
      <Grid item xs={12} sm={6} md={3} key={card.id}>
        <Card
          ref={(node) => drag(drop(node))}
          elevation={0}
          sx={{
            borderRadius: "12px",
            border: "1px solid gainsboro",
            cursor: "grab",
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" mb={1} color="textSecondary">
                {card.title}
              </Typography>
              {customizationDialog && (
                <Box>
                  <IconButton
                    onClick={() => {
                      setEditCardId(card.id);
                      setFormData({
                        title: card.title,
                        value: card.value,
                        perChange: card.perChange,
                      });
                      setCreateDialog(true);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCard(card.id)}>
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Typography variant="h5" fontWeight="bold">
              {card.value}
            </Typography>
            <Box mt={1} display={"flex"} alignItems={"center"} gap={1}>
              <Chip
                icon={
                  card.perChange > 0 ? (
                    <ArrowUpwardRoundedIcon color="#d14669" />
                  ) : (
                    <ArrowDownwardRoundedIcon color="#23796d" />
                  )
                }
                size="small"
                sx={{
                  bgcolor: card.perChange > 0 ? "#d0f3ed" : "#f9d6dc",
                  color: card.perChange > 0 ? "#23796d" : "#d14669",
                  fontWeight: "600",
                }}
                label={card.perChange + "%"}
              />
              <Typography
                fontSize={12}
                color="#97A3B6"
                letterSpacing={0.6}
                fontWeight={400}
              >
                Compared to last month
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        sx={{ borderBottom: "1px solid gainsboro" }}
      >
        <Typography variant="h6" ml={4} fontWeight={600}>
          Overview
        </Typography>
        {isMobile ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              {buttons.map((button, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleMenuClose();
                    onCustomize(button.text);
                  }}
                >
                  <button.Icon style={{ marginRight: 8 }} />
                  {button.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box display="flex" gap={2} mr={4}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                size="small"
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
                color="black"
                startIcon={<button.Icon />}
                onClick={() =>
                  button.text === "Customize Widget"
                    ? setCustomizationDialog(true)
                    : console.log(`${button.text} button clicked`)
                }
              >
                {button.text}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {/* Customization Dialog */}
      <Dialog
        open={customizationDialog}
        onClose={() => setCustomizationDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="space-between"
            mb={2}
          >
            <DialogTitle sx={{ color: "#285F71", fontWeight: "bold" }}>
              Customize Widget
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setCreateDialog(true)}
                variant="contained"
                sx={{ bgcolor: "#EB862A" }}
              >
                Create New Widget
              </Button>
            </DialogActions>
          </Box>
          <Container>
            <Grid container spacing={3}>
              {cards.map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Card Dialog */}
      <Dialog
        open={createDialog}
        onClose={() => setCreateDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "#285F71", fontWeight: "bold" }}>
          {editCardId ? "Edit Card" : "Create New Card"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Value"
            fullWidth
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Change (%)"
            fullWidth
            type="number"
            value={formData.perChange}
            onChange={(e) =>
              setFormData({
                ...formData,
                perChange: parseFloat(e.target.value),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCreateDialog(false)}
            size="small"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateEditCard}
            variant="outlined"
            size="small"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ backgroundColor: "#fafcfe" }}>
        {/* Responsive Grid for Cards */}
        <Box p={4}>
          <Grid container spacing={3}>
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </Grid>
        </Box>
        <Box ml={4} mr={4}>
          <RevenueSection />
          <br />
          <SalesSection />
          <br />
        </Box>
      </div>
    </DndProvider>
  );
};

export default Overview;
