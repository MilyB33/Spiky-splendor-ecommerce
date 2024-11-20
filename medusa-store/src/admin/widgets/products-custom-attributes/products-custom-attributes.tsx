import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { Heading, Button, Input } from "@medusajs/ui";
import { Multiselect } from "./Multiselect";
import { WaterDemand } from "./water-demand";
import { useProductsCustomAttributes } from "./useProductsCustomAttributes";

const ProductsCustomAttributes = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  const {
    plantFormsOptions,
    plantPlacementsOptions,
    plantWaterDemandsOptions,
    values,
    onChangeValues,
    isUpdatingProduct,
    updateProduct,
  } = useProductsCustomAttributes(product.id, notify);

  const onChangePlantForms = (values: string[]) => {
    onChangeValues({ plant_forms: values });
  };

  const onChangePlantPlacements = (values: string[]) => {
    onChangeValues({ plant_placements: values });
  };

  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
      <Heading level="h1" className="font-bold text-2xl mb-4">
        Dodatkowe atrybuty
      </Heading>

      <div className="flex flex-col gap-4">
        <div>
          <Heading level="h3" className="mb-2">
            Typ rośliny
          </Heading>
          <Multiselect
            options={plantFormsOptions}
            onChange={onChangePlantForms}
            value={values.plant_forms}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Umiejscowienie rośliny
          </Heading>
          <Multiselect
            options={plantPlacementsOptions}
            onChange={onChangePlantPlacements}
            value={values.plant_placements}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Zapotrzebowanie na wodę
          </Heading>
          <WaterDemand
            options={plantWaterDemandsOptions}
            value={values.plant_water_demand_id}
            onChangeValues={onChangeValues}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Średnica doniczki (cm)
          </Heading>
          <Input
            type="number"
            defaultValue={values.pot_diameter}
            onChange={(event) => {
              onChangeValues({ pot_diameter: Number(event.target.value) });
            }}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Minimalna wysokość (cm)
          </Heading>
          <Input
            type="number"
            defaultValue={values.max_height}
            onChange={(event) => {
              onChangeValues({ min_height: Number(event.target.value) });
            }}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Maksymalna wysokość (cm)
          </Heading>
          <Input
            type="number"
            defaultValue={values.max_height}
            onChange={(event) => {
              onChangeValues({ max_height: Number(event.target.value) });
            }}
          />
        </div>
      </div>

      <div className="mt-2 w-full flex justify-end">
        <Button disabled={isUpdatingProduct} onClick={() => updateProduct()}>
          Zapisz
        </Button>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default ProductsCustomAttributes;
