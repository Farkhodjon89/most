type ProductParams = {
  categoryId: string;
};
export enum STATUSES {
  'approved_by_seller' = 'approved_by_seller',
  'approved_by_buyer' = 'approved_by_buyer',
  'signed_by_seller' = 'signed_by_seller',
  'signed_by_buyer' = 'signed_by_buyer',
  'shipment_sent' = 'shipment_sent',
  'shipment_received' = 'shipment_received',
  'payment_sent' = 'payment_sent',
  'payment_received' = 'payment_received',
  'viewed_by_seller' = 'viewed_by_seller',
  'viewed_by_buyer' = 'viewed_by_buyer',
  'rejected_by_buyer' = 'rejected_by_buyer',
  'rejected_by_seller' = 'rejected_by_seller',
}

export type OrderProduct = {
  id: number;
  productId: number;
  quantity: number;
  productPrice: string;
  productName: string;
  vendorCode: string;
  productImg: string;
  qtnL: string;
  qtnH: string;
  qtnW: string;
  createdAt: string;

  newProduct?: boolean;
};

export type ProductOrderType = {
  id: string;
  sellerId: number;
  buyerId: number;
  comment: string;
  status: STATUSES;
  creationDate: string;
  orderSum: string;
  prepaymentAmount: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  contractorInn: string;
  contractor: string;
  statuses: Array<{
    id: number;
    status: STATUSES;
  }>;
  orderProducts: Array<OrderProduct>;
  buyerCompanyName: string;
  sellerCompanyName: string;
};
