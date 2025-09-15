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
    price: 130,
    quantity: 100,
    label: "100 алмазов",
    image: jewels,
    type: "fixed",
  },
  {
    id: "2",
    price: 1300,
    quantity: 1000,
    label: "1 000 алмазов",
    image: jewels1,
    type: "fixed",
  },
  {
    id: "3",
    price: 6500,
    quantity: 5000,
    label: "5 000 алмазов",
    image: jewels2,
    type: "fixed",
  },
  {
    id: "4",
    price: 13000,
    quantity: 10000,
    label: "10 000 алмазов",
    image: jewels3,
    type: "fixed",
  },
  {
    id: "5",
    price: 65000,
    quantity: 50000,
    label: "50 000 алмазов",
    image: jewels4,
    type: "fixed",
  },
  {
    id: "6",
    price: 130000,
    quantity: 100000,
    label: "100 000 алмазов",
    image: jewels5,
    type: "fixed",
  },
  {
    id: "7",
    price: 390000,
    quantity: 300000,
    label: "300 000 алмазов",
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
