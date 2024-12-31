import {
  requireCustomerAuthentication,
  type MiddlewaresConfig,
} from "@medusajs/medusa";

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store/orders/*/cancel*",
      middlewares: [requireCustomerAuthentication()],
    },
    {
      matcher: "/store/orders/last*",
      middlewares: [requireCustomerAuthentication()],
    },
    {
      matcher: "/store/returns*",
      middlewares: [requireCustomerAuthentication()],
    },
    {
      matcher: "/store/customer/deactivate*",
      middlewares: [requireCustomerAuthentication()],
    },
  ],
};
