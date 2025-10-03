import React, { useRef, useState, useEffect, useMemo } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowForwardIos } from "@mui/icons-material";
import OptionPopup from "./OptionPopup";

interface CustomizationModalProps {
  open: boolean;
  onClose: () => void;
  product: any;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  open,
  onClose,
  product
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [friesPopup, setFriesPopup] = useState(false);
  const [periFriesPopup, setPeriFriesPopup] = useState(false);

  const [selectedFries, setSelectedFries] = useState<string>("");
  const [selectedPeriFries, setSelectedPeriFries] = useState<string>("");

  const [selectedFriesPrice, setSelectedFriesPrice] = useState<number>(0);
  const [selectedPeriFriesPrice, setSelectedPeriFriesPrice] =
    useState<number>(0);

  const [quantity, setQuantity] = useState<number>(1);

  const BASE_PRICE = product?.basePrice;

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

  // ---- helper to enforce only one fries selection ----
  const handleSaveFries = (val: string, price: number) => {
    setSelectedFries(val);
    setSelectedFriesPrice(price);
    setSelectedPeriFries("");
    setSelectedPeriFriesPrice(0);
  };

  const handleSavePeriFries = (val: string, price: number) => {
    setSelectedPeriFries(val);
    setSelectedPeriFriesPrice(price);
    setSelectedFries("");
    setSelectedFriesPrice(0);
  };

  // ---- compute total ----
  const totalPrice = useMemo(() => {
    const itemPrice = BASE_PRICE + selectedFriesPrice + selectedPeriFriesPrice;
    return itemPrice * quantity;
  }, [BASE_PRICE, selectedFriesPrice, selectedPeriFriesPrice, quantity]);

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
          flexDirection: { xs: "column", md: "row" },
          paddingRight: { xs: 0, md: 3 },
        },
      }}
    >
      {/* Image section */}
      <Box
        sx={{
          flex: 1,
          minHeight: { xs: "40vh", md: "auto" },
          minWidth: { xs: "100%", md: "45%" },
          position: "relative",
          overflow: "hidden",
          "& .zoomable-img": {
            transition: "transform 0.4s ease",
          },
          "& .zoomable-img:hover": {
            transform: "scale(1.2)",
            cursor: "zoom-in",
          },
        }}
      >
        <img
          src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
          alt="Food"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          className="zoomable-img"
        />

        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, left: 12, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content section */}
      <DialogContent
        ref={scrollRef}
        sx={{
          flex: 1,
          minWidth: { xs: "80%", md: "55%" },
          overflowY: "auto",
          p: 3,
        }}
      >
        {/* Title + Price + Calories */}
        <Typography variant="h5" fontWeight="bold">
          {product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ${BASE_PRICE.toFixed(2)} •  {product?.calories}
        </Typography>
        <Typography paragraph>
         {product?.description}
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
            <FormControlLabel
              value="whole"
              control={<Radio />}
              label="Whole Chicken"
            />
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

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1.5}
            onClick={() => setFriesPopup(true)}
            sx={{ cursor: "pointer" }}
          >
            <Typography>Large Fries</Typography>
            <ArrowForwardIos fontSize="small" />
          </Box>

          {selectedFries && (
            <Typography variant="body2" color="success.main" ml={1}>
              Selected: {selectedFries}
            </Typography>
          )}

          <Divider />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1.5}
            onClick={() => setPeriFriesPopup(true)}
            sx={{ cursor: "pointer" }}
          >
            <Typography>Large PERi-PERi Fries</Typography>
            <ArrowForwardIos fontSize="small" />
          </Box>

          {selectedPeriFries && (
            <Typography variant="body2" color="success.main" ml={1}>
              Selected: {selectedPeriFries}
            </Typography>
          )}
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

        {/* Sticky Footer with Qty + Button */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            py: 2,
          }}
        >
          {/* Qty dropdown at top-left */}
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              sx={{ minWidth: 80, borderRadius: 2 }}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Add to Order button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Add {quantity} to order • ${totalPrice.toFixed(2)}
          </Button>
        </Box>

        {/* Fries Popup */}
        <OptionPopup
          open={friesPopup}
          onClose={() => setFriesPopup(false)}
          title="Large Fries"
          description="Add Some Large Fries ?"
          options={[
            { label: "Salted", price: "$0.00" },
            { label: "Mayo - naise", price: "$2.37" },
            { label: "Mayo - ranch", price: "$3.37" },
          ]}
          selectedValue={selectedFries}
          onSave={handleSaveFries}
        />

        {/* Peri-Fries Popup */}
        <OptionPopup
          open={periFriesPopup}
          onClose={() => setPeriFriesPopup(false)}
          title="Large Peri-Peri Fries"
          description="Add Some Large Peri-Peri Fries ?"
          options={[
            { label: "Peri-Salted", price: "$0.00" },
            { label: "Peri - naise", price: "$2.37" },
            { label: "Peri - ranch", price: "$3.37" },
          ]}
          selectedValue={selectedPeriFries}
          onSave={handleSavePeriFries}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationModal;
