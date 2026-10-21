export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderSummary {
  orderId: string;
  total: number;
  itemCount: number;
  customerName: string;
}
