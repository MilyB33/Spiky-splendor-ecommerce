import type { SettingConfig, SettingProps } from "@medusajs/admin";
import { Container, Heading, Input, Button } from "@medusajs/ui";
import { useUpdateStoreAddress } from "../../hooks/use-update-store-address";

const StoreAddressPage = ({ notify }: SettingProps) => {
  const { onSubmit, values, onChangeValues, isFetchingStore, isUpdatingStore } =
    useUpdateStoreAddress({ notify });

  return (
    <Container className="flex flex-col gap-5">
      <Heading>Store address (for invoices) </Heading>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Company name</Heading>
        <Input
          name="company"
          id="company"
          placeholder="Company name"
          value={values.company}
          onChange={(event) => onChangeValues({ company: event.target.value })}
          disabled={isFetchingStore}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading level="h3">City</Heading>
        <Input
          name="city"
          id="city"
          placeholder="City"
          value={values.city}
          onChange={(event) => onChangeValues({ city: event.target.value })}
          disabled={isFetchingStore}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Zip code</Heading>
        <Input
          name="postal_code"
          id="postal_code"
          placeholder="Zip code"
          value={values.postal_code}
          onChange={(event) =>
            onChangeValues({ postal_code: event.target.value })
          }
          disabled={isFetchingStore}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Address</Heading>
        <Input
          name="address"
          id="address"
          placeholder="Address"
          value={values.address}
          onChange={(event) => onChangeValues({ address: event.target.value })}
          disabled={isFetchingStore}
        />
      </div>

      <Button className="ml-auto" onClick={onSubmit} disabled={isUpdatingStore}>
        Save
      </Button>
    </Container>
  );
};

export const config: SettingConfig = {
  card: {
    label: "Adres",
    description: "Manage company address (for invoices)",
  },
};

export default StoreAddressPage;
