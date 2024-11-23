import type { SettingConfig, SettingProps } from "@medusajs/admin";
import { Container, Heading, Input, Button } from "@medusajs/ui";
import { useUpdateStoreAddress } from "../../hooks/use-update-store-address";

const StoreAddressPage = ({ notify }: SettingProps) => {
  const { onSubmit, values, onChangeValues, isFetchingStore, isUpdatingStore } =
    useUpdateStoreAddress({ notify });

  return (
    <Container className="flex flex-col gap-5">
      <Heading>Adres sklepu (na potrzeby faktur) </Heading>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Nazwa firmy</Heading>
        <Input
          name="company"
          id="company"
          placeholder="Nazwa firmy"
          value={values.company}
          onChange={(event) => onChangeValues({ company: event.target.value })}
          disabled={isFetchingStore}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Miasto</Heading>
        <Input
          name="city"
          id="city"
          placeholder="Miasto"
          value={values.city}
          onChange={(event) => onChangeValues({ city: event.target.value })}
          disabled={isFetchingStore}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Kod pocztowy</Heading>
        <Input
          name="postal_code"
          id="postal_code"
          placeholder="Kod pocztowy"
          value={values.postal_code}
          onChange={(event) =>
            onChangeValues({ postal_code: event.target.value })
          }
          disabled={isFetchingStore}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading level="h3">Adres</Heading>
        <Input
          name="address"
          id="address"
          placeholder="Adres"
          value={values.address}
          onChange={(event) => onChangeValues({ address: event.target.value })}
          disabled={isFetchingStore}
        />
      </div>

      <Button className="ml-auto" onClick={onSubmit} disabled={isUpdatingStore}>
        Zapisz
      </Button>
    </Container>
  );
};

export const config: SettingConfig = {
  card: {
    label: "Adres",
    description: "Zarządzaj adresem firmy (dla faktur)",
  },
};

export default StoreAddressPage;
