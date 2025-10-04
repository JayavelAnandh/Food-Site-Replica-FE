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
import type { ProductData, Section } from "../helpers/menuData.ts";

interface CustomizationModalProps {
  open: boolean;
  onClose: () => void;
  product: ProductData;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const [activePopup, setActivePopup] = useState<{
    section: Section;
    optionLabel: string;
    children: { label: string; price: string }[];
  } | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [selectedPrices, setSelectedPrices] = useState<Record<string, number>>(
    {}
  );

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

  const handleSaveOption = (
    section: Section,
    parentLabel: string,
    childLabel: string,
    priceStr: string
  ) => {
    const price = parseFloat(priceStr.replace("$", "")) || 0;
    setSelectedOptions((prev) => ({
      ...prev,
      [section.title]: `${parentLabel} • ${childLabel}`,
    }));
    setSelectedPrices((prev) => ({ ...prev, [section.title]: price }));
    setActivePopup(null);
  };

  const totalPrice = useMemo(() => {
    const extra = Object.values(selectedPrices).reduce((a, b) => a + b, 0);
    return (BASE_PRICE + extra) * quantity;
  }, [BASE_PRICE, selectedPrices, quantity]);

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
          src={product?.imageUrl}
          alt={product?.name}
          className="zoomable-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, left: 12, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        ref={scrollRef}
        sx={{
          flex: 1,
          minWidth: { xs: "80%", md: "55%" },
          overflowY: "auto",
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ${BASE_PRICE.toFixed(2)} • {product?.calories}
        </Typography>
        <Typography paragraph>{product?.description}</Typography>

        <Divider sx={{ my: 2 }} />

        {product.sections.map((section: Section, index: number) => (
          <Box key={index} mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              {section.title}
            </Typography>

            {section.required && (
              <Typography variant="caption" color="text.secondary">
                Required
              </Typography>
            )}
            {section.included && (
              <Typography variant="caption" color="success.main">
              </Typography>
            )}

            {/* RADIO TYPE */}
            {section.type === "radio" && section.options && (
              <RadioGroup
                defaultValue={section.options[0].label}
                onChange={(e) => {
                  const selected = section.options?.find(
                    (opt: any) => opt.label === e.target.value
                  );
                  if (selected)
                    handleSaveOption(section, section.title, selected.label, selected.price);
                }}
              >
                {section.options.map((opt: any, i: number) => (
                  <FormControlLabel
                    key={i}
                    value={opt.label}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            )}

            {section.type === "popup" && section.options && (
              <>
                {section.options.map((opt: any, i: number) => (
                  <Box key={i}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={1.5}
                      onClick={() =>
                        setActivePopup({
                          section,
                          optionLabel: opt.label,
                          children: opt.children || [],
                        })
                      }
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography>{opt.label}</Typography>
                      <ArrowForwardIos fontSize="small" />
                    </Box>
                  </Box>
                ))}

                {selectedOptions[section.title] && (
                  <Typography variant="body2" color="success.main" ml={1}>
                    Selected: {selectedOptions[section.title]}
                  </Typography>
                )}
              </>
            )}

            {section.type === "info" && (
              <Typography variant="caption" color="success.main">
                Included
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />
          </Box>
        ))}

        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            py: 2,
          }}
        >
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

          <Button fullWidth variant="contained" sx={{ borderRadius: 2 }}>
            Add {quantity} to order • ${totalPrice.toFixed(2)}
          </Button>
        </Box>

        {activePopup && (
          <OptionPopup
            open={!!activePopup}
            onClose={() => setActivePopup(null)}
            title={activePopup.optionLabel}
            description={activePopup.section.description || ""}
            options={activePopup.children}
            selectedValue={selectedOptions[activePopup.section.title] || ""}
            onSave={(val, price) =>
              handleSaveOption(
                activePopup.section,
                activePopup.optionLabel,
                val,
                price.toString()
              )
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationModal;
