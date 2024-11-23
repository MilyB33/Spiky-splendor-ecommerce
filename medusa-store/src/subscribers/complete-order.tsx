import { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa";
import { OrderService } from "@medusajs/medusa";

export default async function updateOrder({ data, container }: SubscriberArgs) {
  const orderService: OrderService = container.resolve("orderService");

  const { id } = data as { id: string };

  await orderService.completeOrder(id);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.FULFILLMENT_CREATED,
};
