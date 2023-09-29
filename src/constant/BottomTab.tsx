import Gift from "../screens/Gift";
import MBPlus from "../screens/MBPlus";
import Main from "../screens/Main";
import Product from "../screens/Product";
import Utilities from "../screens/Utilities";

export type TabElement = {
  name: string;
  component: () => React.JSX.Element;
  title: string;
  icon: string;
};

export const tabs: TabElement[] = [
  {
    name: "Main",
    component: Main,
    title: "Trang chủ",
    icon: 'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026090962_b2e3609a370b1fa404113890c1a20f78%20(1).jpg?alt=media&token=13b64677-1026-4164-8bec-1a4c6286b260'
  },
  {
    name: "Product",
    component: Product,
    title: "Sản phẩm",
    icon: 'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026090962_b2e3609a370b1fa404113890c1a20f78%20(2).jpg?alt=media&token=14d9ae67-806a-4c22-99e6-0282793e409d'
  },
  {
    name: "MBPlus",
    component: MBPlus,
    title: "MB++",
    icon: 'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026090962_b2e3609a370b1fa404113890c1a20f78%20(3).jpg?alt=media&token=9f70ad77-7224-4863-86e4-ed0d28f20c4d'
  },
  {
    name: "Gift",
    component: Gift,
    title: "Quà tặng",
    icon: 'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026090962_b2e3609a370b1fa404113890c1a20f78%20(4).jpg?alt=media&token=93e3479a-7c1b-4c5c-9d1a-31f4e646a344'
  },
  {
    name: "Utilities",
    component: Utilities,
    title: "Tiện ích",
    icon: 'https://firebasestorage.googleapis.com/v0/b/mb-bank-18cf1.appspot.com/o/method-buttons%2Fz4686026090962_b2e3609a370b1fa404113890c1a20f78.jpg?alt=media&token=2ac73d85-9dba-43d0-8908-4d4b165ff1fe'
  },
];
