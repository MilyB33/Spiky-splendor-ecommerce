import {
  Customer,
  FindConfig,
  CustomerService as MedusaCustomerService,
} from "@medusajs/medusa";
import CustomerRepository from "@medusajs/medusa/dist/repositories/customer";
import ProductRepository from "src/repositories/product";
import OrderRepository from "@medusajs/medusa/dist/repositories/order";
import ReturnRepository from "@medusajs/medusa/dist/repositories/return";

type InjectedDependencies = {
  customerRepository: typeof CustomerRepository;
  productRepository: typeof ProductRepository;
  orderRepository: typeof OrderRepository;
  returnRepository: typeof ReturnRepository;
};

class CustomerService extends MedusaCustomerService {
  protected customerRepository_: typeof CustomerRepository;
  protected productRepository_: typeof ProductRepository;
  protected orderRepository_: typeof OrderRepository;
  protected returnRepository_: typeof ReturnRepository;
  constructor({
    customerRepository,
    productRepository,
    orderRepository,
    returnRepository,
  }: InjectedDependencies) {
    super(arguments[0]);

    this.customerRepository_ = customerRepository;
    this.productRepository_ = productRepository;
    this.orderRepository_ = orderRepository;
    this.returnRepository_ = returnRepository;
  }

  async retrieve(
    customerId: string,
    config?: FindConfig<Customer>
  ): Promise<Customer> {
    const customer = await super.retrieve(customerId, config);

    const orders_count = await this.orderRepository_.count({
      where: { customer_id: customerId },
    });

    const returns_count = await this.returnRepository_.count({
      where: { order: { customer_id: customerId } },
    });

    customer.orders_count = orders_count;
    customer.returns_count = returns_count;

    return customer;
  }
}

export default CustomerService;
