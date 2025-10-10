import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "orders.json");


function ensureFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ orders: [] }, null, 2), "utf-8");
  }
}


export function readOrders() {
  ensureFile();
  const raw = fs.readFileSync(FILE_PATH, "utf-8");
  try {
    const data = JSON.parse(raw);
    return data.orders || [];
  } catch (err) {
    console.error("Ошибка при чтении orders.json:", err);
    return [];
  }
}


function writeOrders(orders: any[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify({ orders }, null, 2), "utf-8");
}


export function addOrder(order: any) {
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
}


export function getOrderById(orderId: string) {
  const orders = readOrders();
  return orders.find((o) => o.orderId === orderId) || null;
}


export function updateOrderStatus(orderId: string, status: string) {
  const orders = readOrders();
  const index = orders.findIndex((o) => o.orderId === orderId);
  if (index !== -1) {
    orders[index].status = status;
    writeOrders(orders);
    return orders[index];
  }
  return null;
}
