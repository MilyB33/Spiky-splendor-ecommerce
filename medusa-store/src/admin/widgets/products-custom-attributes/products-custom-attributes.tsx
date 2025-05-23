import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { Heading, Button, Input } from "@medusajs/ui";
import { Multiselect } from "./Multiselect";
import { WaterDemand } from "./water-demand";
import { useProductsCustomAttributes } from "./useProductsCustomAttributes";
import { PlantForm, PlantPlacement } from "../../types/product";

const ProductsCustomAttributes = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  const {
    plantFormsOptions,
    plantPlacementsOptions,
    waterDemandOptions,
    values,
    onChangeValues,
    isUpdatingProduct,
    updateProduct,
  } = useProductsCustomAttributes(product.id, notify);

  const onChangePlantForms = (values: PlantForm[]) => {
    onChangeValues({ plant_forms: values });
  };

  const onChangePlantPlacements = (values: PlantPlacement[]) => {
    onChangeValues({ plant_placements: values });
  };

  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
      <Heading level="h1" className="font-bold text-2xl mb-4">
        Additional attributes
      </Heading>

      <div className="flex flex-col gap-4">
        <div>
          <Heading level="h3" className="mb-2">
            Plant form
          </Heading>
          <Multiselect
            options={plantFormsOptions}
            onChange={onChangePlantForms}
            value={values.plant_forms}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Plant placement
          </Heading>
          <Multiselect
            options={plantPlacementsOptions}
            onChange={onChangePlantPlacements}
            value={values.plant_placements}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Water demand
          </Heading>
          <WaterDemand
            options={waterDemandOptions}
            value={values.water_demand}
            onChangeValues={onChangeValues}
          />
        </div>

        <div>
          <Heading level="h3" className="mb-2">
            Pot diameter (cm)
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
            Minimum height (cm)
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
            Maximum height (cm)
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
          Save
        </Button>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default ProductsCustomAttributes;
