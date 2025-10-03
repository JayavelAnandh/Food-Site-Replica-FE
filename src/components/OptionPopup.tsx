import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Option {
  label: string;
  price: string; // "$2.37"
}

interface OptionPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  options: Option[];
  selectedValue: string;
  onSave: (value: string, price: number) => void; // return both value + price
}

const OptionPopup: React.FC<OptionPopupProps> = ({
  open,
  onClose,
  title,
  description,
  options,
  selectedValue,
  onSave,
}) => {
  const [selected, setSelected] = useState<string>(selectedValue || "");

  // reset local state when popup opens
  useEffect(() => {
    setSelected(selectedValue || "");
  }, [selectedValue, open]);

  const parsePrice = (price: string): number => {
    const num = parseFloat(price.replace("$", ""));
    return isNaN(num) ? 0 : num;
  };

  const handleSave = () => {
    if (selected) {
      const option = options.find((o) => o.label === selected);
      const extra = option ? parsePrice(option.price) : 0;
      onSave(selected, extra); // send back to parent
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {/* Back button + Title */}
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            {title}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        {/* Options as RadioGroup */}
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={opt.label}
              control={<Radio />}
              label={
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>{opt.label}</Typography>
                  <Typography color="text.secondary">{opt.price}</Typography>
                </Box>
              }
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                m: 0,
                py: 1,
              }}
            />
          ))}
        </RadioGroup>

        {/* Sticky bottom button */}
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 2,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
            disabled={!selected}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OptionPopup;
