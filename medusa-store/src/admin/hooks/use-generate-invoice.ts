import { useMutation, useQuery } from "@tanstack/react-query";
import { useMedusa } from "medusa-react";

export const useGenerateInvoice = (id: string) => {
  const { client } = useMedusa();

  const { data } = useQuery({
    queryFn: () => client.admin.orders.retrieve(id, { expand: "invoice" }),
  });

  const { mutateAsync: generateInvoice, isLoading: isGeneratingInvoice } =
    useMutation({
      mutationFn: (orderId: string) =>
        client.client.request("GET", `/admin/orders/${orderId}/invoice/`),
      onSuccess: (response) => {
        const pdfBuffer = atob(response.buffer);

        const pdfBytes = new Uint8Array(pdfBuffer.length);
        for (let i = 0; i < pdfBuffer.length; i++) {
          pdfBytes[i] = pdfBuffer.charCodeAt(i);
        }

        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);

        window.open(blobUrl, "_blank");
      },
    });

  return {
    order: data?.order,
    generateInvoice,
    isGeneratingInvoice,
  };
};
