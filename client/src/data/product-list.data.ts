import jewels from "/assets/diamond-list/jewels.png";
import jewels1 from "/assets/diamond-list/jewels-1.png";
import jewels2 from "/assets/diamond-list/jewels-2.png";
import jewels3 from "/assets/diamond-list/jewels-3.png";
import jewels4 from "/assets/diamond-list/jewels-4.png";
import jewels5 from "/assets/diamond-list/jewels-5.png";
import jewels6 from "/assets/diamond-list/jewels-6.png";
import jewels7 from "/assets/diamond-list/jewels-7.png";

export interface Product {
  id: string;
  price: number | null;
  quantity: number | null;
  label: string;
  image: string;
  type: "fixed" | "custom";
}

export const productList: Product[] = [
  {
    id: "1",
    price: 1000,
    quantity: 750,
    label: "750 алмазов",
    image: jewels,
    type: "fixed",
  },
  {
    id: "2",
    price: 2000,
    quantity: 1500,
    label: "1 500 алмазов",
    image: jewels1,
    type: "fixed",
  },
  {
    id: "3",
    price: 5000,
    quantity: 3900,
    label: "3 900 алмазов",
    image: jewels2,
    type: "fixed",
  },
  {
    id: "4",
    price: 10000,
    quantity: 7700,
    label: "7 700 алмазов",
    image: jewels3,
    type: "fixed",
  },
  {
    id: "5",
    price: 20000,
    quantity: 15500,
    label: "15 500 алмазов",
    image: jewels4,
    type: "fixed",
  },
  {
    id: "6",
    price: 50000,
    quantity: 38500,
    label: "38 500 алмазов",
    image: jewels5,
    type: "fixed",
  },
  {
    id: "7",
    price: 100000,
    quantity: 78000,
    label: "78 000 алмазов",
    image: jewels6,
    type: "fixed",
  },
  {
    id: "8",
    price: null,
    quantity: null,
    label: "Другое количество",
    image: jewels7,
    type: "custom",
  },
];
