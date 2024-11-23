import { Store } from "@medusajs/medusa";

export type PDFSettings = {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export type DocumentSettings = {
  store_address: Pick<Store, "company" | "city" | "address" | "postal_code">;
};
