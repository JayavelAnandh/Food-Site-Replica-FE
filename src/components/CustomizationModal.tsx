import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomizationModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  open,
  onClose,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercent(percent);
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const getTranslateY = () => {
    if (scrollPercent < 30) return "5%";
    if (scrollPercent < 70) return "0";
    return "-5%";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: "90vh",
          borderRadius: 3,
          overflow: "hidden",
          transform: `translateY(${getTranslateY()})`,
          transition: "transform 0.4s ease",
          display: "flex",
          flexDirection: "row",
        },
      }}
    >
      {/* Left Fixed Image */}
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "45%" },
          backgroundImage:
            "url('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, left: 12, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Right Scrollable Content */}
      <DialogContent
        ref={scrollRef}
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "55%" },
          overflowY: "auto",
          p: 3,
        }}
      >
        {/* Title + Price + Calories */}
        <Typography variant="h5" fontWeight="bold">
          PERi–Paradise Platter
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          $53.54 • 2790 Cal
        </Typography>
        <Typography paragraph>
          PERi-Paradise basted whole chicken + Large PERi-Fries + Large Spiced
          Rice + Garlic Bread (Feeds 3-4 people). Our PERi-Paradise baste is a
          combination of citrus fruits blended with a PERi kick. On the milder
          side.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Whole Chicken */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Whole Chicken
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Required
          </Typography>
          <RadioGroup defaultValue="whole">
            <FormControlLabel value="whole" control={<Radio />} label="Whole Chicken" />
          </RadioGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Cuts */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            The Cuts
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Required
          </Typography>
          <RadioGroup defaultValue="cut2">
            <FormControlLabel value="cut2" control={<Radio />} label="Cut in 2" />
            <FormControlLabel value="cut4" control={<Radio />} label="Cut in 4" />
            <FormControlLabel value="cut8" control={<Radio />} label="Cut in 8" />
          </RadioGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Fries */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Choose Large Fries
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Required
          </Typography>
          <RadioGroup defaultValue="periFries">
            <FormControlLabel value="fries" control={<Radio />} label="Large Fries" />
            <FormControlLabel value="periFries" control={<Radio />} label="Large PERi-PERi Fries" />
          </RadioGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Rice */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Large Spiced Rice
          </Typography>
          <Typography variant="caption" color="success.main">
            Included
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Garlic Bread */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            Large Garlic Bread
          </Typography>
          <Typography variant="caption" color="success.main">
            Included
          </Typography>
        </Box>

        {/* Sticky Add to Order Button */}
        <Box
          mt={5}
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            py: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Add 1 to order • $53.54
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationModal;
