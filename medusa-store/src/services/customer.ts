import {
  Customer,
  FindConfig,
  CustomerService as MedusaCustomerService,
} from "@medusajs/medusa";
import CustomerRepository from "@medusajs/medusa/dist/repositories/customer";
import ProductRepository from "src/repositories/product";
import OrderRepository from "@medusajs/medusa/dist/repositories/order";
import ReturnRepository from "@medusajs/medusa/dist/repositories/return";
import AddressRepository from "@medusajs/medusa/dist/repositories/address";

type InjectedDependencies = {
  customerRepository: typeof CustomerRepository;
  productRepository: typeof ProductRepository;
  orderRepository: typeof OrderRepository;
  returnRepository: typeof ReturnRepository;
  addressRepository: typeof AddressRepository;
};

class CustomerService extends MedusaCustomerService {
  protected customerRepository_: typeof CustomerRepository;
  protected productRepository_: typeof ProductRepository;
  protected orderRepository_: typeof OrderRepository;
  protected returnRepository_: typeof ReturnRepository;
  protected addressRepository_: typeof AddressRepository;

  constructor({
    customerRepository,
    productRepository,
    orderRepository,
    returnRepository,
    addressRepository,
  }: InjectedDependencies) {
    super(arguments[0]);

    this.customerRepository_ = customerRepository;
    this.productRepository_ = productRepository;
    this.orderRepository_ = orderRepository;
    this.returnRepository_ = returnRepository;
    this.addressRepository_ = addressRepository;
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

  async deactivate(customerId: string) {
    const customer = await this.customerRepository_.findOne({
      where: { id: customerId },
      relations: ["billing_address", "shipping_addresses"],
    });

    let encodedEmail = (Math.random() + 1).toString(36).substring(7);
    let encodedFirstName = (Math.random() + 1).toString(36).substring(7);
    let encodedLastName = (Math.random() + 1).toString(36).substring(7);

    await this.customerRepository_.update(
      { id: customerId },
      {
        email: encodedEmail,
        first_name: encodedFirstName,
        last_name: encodedLastName,
        billing_address_id: null,
      }
    );

    if (customer.billing_address) {
      // Delete this via repository as it's have relation with customer
      await this.addressRepository_.delete({ id: customer.billing_address.id });
    }

    if (customer.shipping_addresses?.length) {
      const addressesIds = customer.shipping_addresses.map(
        (address) => address.id
      );

      for (const address of addressesIds) {
        await this.removeAddress(customer.id, address);
        await this.addressRepository_.delete({ id: address });
      }
    }
  }
}

export default CustomerService;
