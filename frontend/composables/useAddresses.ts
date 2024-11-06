import type { Address, AddressCreatePayload, AddressPayload } from "@medusajs/medusa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { API_QUERY_KEY } from "~/constant";

type UpdateAddressPayload = {
  addressId: string;
  data: AddressPayload;
};

export const useAddresses = () => {
  const queryClient = useQueryClient();
  const client = useMedusaClient();
  const { snackbar } = useSnackbar();
  const { customer } = useCustomer();

  const { mutateAsync: saveBillingAddress, isPending: isSavingBillingAddress } = useMutation({
    mutationFn: (data: AddressPayload) =>
      client.customers.update({
        billing_address: data,
      }),
    onSuccess: () => {
      snackbar.success("Zapisano adres rozliczeniowy");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
    onError: () => {
      snackbar.error("Coś poszło nie tak, spróbuj jeszcze raz");
    },
  });

  const { mutateAsync: createShippingAddress, isPending: isCreatingShippingAddress } = useMutation({
    mutationFn: (data: AddressCreatePayload) =>
      client.customers.addresses.addAddress({ address: data }),
    onSuccess: () => {
      snackbar.success("Zapisano adres wysyłkowy");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
    onError: () => {
      snackbar.error("Coś poszło nie tak, spróbuj jeszcze raz");
    },
  });

  const { mutateAsync: updateShippingAddress, isPending: isUpdatingShippingAddress } = useMutation({
    mutationFn: ({ addressId, data }: UpdateAddressPayload) =>
      client.customers.addresses.updateAddress(addressId, data),
    onSuccess: () => {
      snackbar.success("Zaktualizowano adres wysyłkowy");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
    onError: () => {
      snackbar.error("Coś poszło nie tak, spróbuj jeszcze raz");
    },
  });

  const { mutateAsync: deleteShippingAddress, isPending: isDeletingShippingAddress } = useMutation({
    mutationFn: (addressId: string) => client.customers.addresses.deleteAddress(addressId),
    onSuccess: () => {
      snackbar.success("Usunięto adres wysyłkowy");
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    },
    onError: () => {
      snackbar.error("Coś poszło nie tak, spróbuj jeszcze raz");
    },
  });

  const billingAddress: ComputedRef<Address> = computed(
    () => customer.value?.customer?.billing_address,
  );

  const shippingAddresses: ComputedRef<Address[]> = computed(() => {
    return customer.value?.customer.shipping_addresses || [];
  });
  console.log(customer.value?.customer.shipping_addresses);
  return {
    billingAddress,
    shippingAddresses,
    isSavingBillingAddress,
    isCreatingShippingAddress,
    isUpdatingShippingAddress,
    isDeletingShippingAddress,
    saveBillingAddress,
    createShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
  };
};
