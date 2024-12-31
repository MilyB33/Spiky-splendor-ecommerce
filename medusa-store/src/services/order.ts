import {
  FindConfig,
  OrderService as MedusaOrderService,
  Order,
} from "@medusajs/medusa";
import OrderRepository from "@medusajs/medusa/dist/repositories/order";
import { PaymentService } from "@medusajs/medusa/dist/services";
import PaymentRepository from "@medusajs/medusa/dist/repositories/payment";

type InjectedDependencies = {
  orderRepository: typeof OrderRepository;
  paymentService: PaymentService;
  paymentRepository: typeof PaymentRepository;
};

class OrderService extends MedusaOrderService {
  protected orderRepository_: typeof OrderRepository;
  protected paymentService: PaymentService;
  protected paymentRepository: typeof PaymentRepository;

  constructor({
    orderRepository,
    paymentService,
    paymentRepository,
  }: InjectedDependencies) {
    super(arguments[0]);
    this.orderRepository_ = orderRepository;
    this.paymentService = paymentService;
    this.paymentRepository = paymentRepository;
  }

  async cancel(orderId: string) {
    return await this.atomicPhase_(async () => {
      const order = await this.orderRepository_.findOne({
        where: {
          id: orderId,
        },
        relations: ["payments"],
      });

      const payment = await this.paymentRepository.findOne({
        where: {
          id: order.payments[0].id,
        },
      });

      await this.paymentService.refund(payment.id, payment.amount, "other");

      const canceledOrder = await super.cancel(orderId);

      return canceledOrder;
    });
  }

  async retrieve(orderId: string, config?: FindConfig<Order>) {
    return super.retrieve(orderId, config);
  }

  async getLastCustomerOrder(customerId: string) {
    const searchedOrder = await this.orderRepository_.findOne({
      order: { created_at: "DESC" },
      where: { customer_id: customerId },
    });

    if (searchedOrder) {
      const order = await this.retrieveWithTotals(searchedOrder.id);

      return order;
    }

    return null;
  }
}

export default OrderService;
