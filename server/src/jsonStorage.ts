import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "orders.json");

interface Order {
  orderId: string;
  status?: string;
  [key: string]: any; // позволяет хранить любые дополнительные поля
}

function ensureFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ orders: [] }, null, 2), "utf-8");
  }
}

export function readOrders(): Order[] {
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

function writeOrders(orders: Order[]): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify({ orders }, null, 2), "utf-8");
}

export function addOrder(order: Order): void {
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
}

export function getOrderById(orderId: string): Order | null {
  const orders = readOrders();
  return orders.find((o: Order) => o.orderId === orderId) || null;
}

export function updateOrderStatus(orderId: string, status: string): Order | null {
  const orders = readOrders();
  const index = orders.findIndex((o: Order) => o.orderId === orderId);
  if (index !== -1) {
    orders[index].status = status;
    writeOrders(orders);
    return orders[index];
  }
  return null;
}
