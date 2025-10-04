// src/data/menuData.ts

export interface Option {
  label: string;
  price: string; 
  children?: Option[]; 
}

export interface Section {
  title: string;
  required?: boolean;
  included?: boolean;
  type: "radio" | "popup" | "info";
  description?: string;
  options?: Option[];
}

export interface ProductData {
  id: string;
  name: string;
  basePrice: number;
  calories: string;
  description: string;
  imageUrl: string;
  sections: Section[];
}

export const sampleProduct: ProductData = {
  id: "peri-paradise",
  name: "PERi–Paradise Platter",
  basePrice: 53.54,
  calories: "2790 Cal",
  imageUrl: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
  description:
    "PERi-Paradise basted whole chicken + Large PERi-Fries + Large Spiced Rice + Garlic Bread (Feeds 3–4 people). Our PERi-Paradise baste is a combination of citrus fruits blended with a PERi kick — on the milder side.",
  sections: [
    {
      title: "Whole Chicken",
      required: true,
      type: "radio",
      options: [{ label: "Whole Chicken", price: "$0.00" }],
    },

    {
      title: "The Cuts",
      required: true,
      type: "radio",
      options: [
        { label: "Cut in 2", price: "$0.00" },
        { label: "Cut in 4", price: "$0.00" },
        { label: "Cut in 8", price: "$0.00" },
      ],
    },

    {
      title: "Choose Large Fries",
      required: true,
      type: "popup",
      description: "Pick your style of fries",
      options: [
        {
          label: "Large Fries",
          price: "$0.00",
          children: [
            { label: "Salted", price: "$0.00" },
            { label: "Mayo - naise", price: "$2.37" },
            { label: "Mayo - ranch", price: "$3.37" },
          ],
        },
        {
          label: "Large PERi-PERi Fries",
          price: "$0.00",
          children: [
            { label: "Peri-Salted", price: "$0.00" },
            { label: "Peri - naise", price: "$2.37" },
            { label: "Peri - ranch", price: "$3.37" },
          ],
        },
      ],
    },

    {
      title: "Large Spiced Rice",
      included: true,
      type: "info",
    },
    {
      title: "Large Garlic Bread",
      included: true,
      type: "info",
    },
  ],
};
