import type { WidgetConfig, OrderDetailsWidgetProps } from "@medusajs/admin";
import { Heading, Button, Input } from "@medusajs/ui";
import { useGenerateInvoice } from "../../hooks/use-generate-invoice";

const GenerateInvoice = ({
  order: orderWithoutInvoice,
}: OrderDetailsWidgetProps) => {
  const { order, generateInvoice, isGeneratingInvoice } = useGenerateInvoice(
    orderWithoutInvoice.id
  );

  if (!order) return null;

  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg mb-4">
      <Heading level="h2">Generate an invoice</Heading>
      <Button
        disabled={!order.invoice || isGeneratingInvoice}
        onClick={() => generateInvoice(order.id)}
        className="mt-4"
      >
        Generuj
      </Button>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.before",
};

export default GenerateInvoice;
