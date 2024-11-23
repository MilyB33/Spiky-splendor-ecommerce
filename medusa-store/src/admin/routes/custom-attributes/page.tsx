import { RouteConfig, RouteProps } from "@medusajs/admin";
import { Heading } from "@medusajs/ui";
import { useGetCustomAttributes } from "../../hooks/use-get-custom-attributes";
import { CustomAttributeItem } from "../../components/custom-attributes/item";
import { AddNewAttributeInput } from "../../components/custom-attributes/add-new-attribute-input";
import { useHandleCustomAttributes } from "../../hooks/use-handle-custom-attributes";

export const API_QUERY_KEY = {
  PLANT_FORMS: "PLANT_FORMS",
  PLANT_PLACEMENTS: "PLANT_PLACEMENTS",
  PLANT_WATER_DEMANDS: "PLANT_WATER_DEMANDS",
  PRODUCT: "PRODUCT",
} as const;

const CustomAttributesPage = ({ notify }: RouteProps) => {
  const {
    plantFormsOptions,
    plantPlacementsOptions,
    plantWaterDemandsOptions,
    refetchPlantForms,
    refetchPlantPlacements,
    refetchPlantWaterDemands,
  } = useGetCustomAttributes();
  const {
    removePlantForm,
    removePlantPlacement,
    removeWaterDemand,
    addPlantForm,
    addPlantPlacement,
    addWaterDemand,
    isRemovingPlantForm,
    isRemovingPlantPlacement,
    isRemovingWaterDemand,
    isAddingPlantForm,
    isAddingPlantPlacement,
    isAddingWaterDemand,
  } = useHandleCustomAttributes({
    refetchPlantForms,
    refetchPlantPlacements,
    refetchPlantWaterDemands,
    notify,
  });

  return (
    <div className="flex flex-col gap-5 bg-white p-8 border border-gray-200 ">
      <div className="flex flex-col gap-4">
        <Heading className="max-h-96">Typy roślin</Heading>

        <AddNewAttributeInput
          placeholder="Typ rośliny"
          onAdd={addPlantForm}
          isAdding={isAddingPlantForm}
        />

        <div className="border-b-2 flex flex-wrap gap-4 py-2">
          {plantFormsOptions.map((option) => (
            <CustomAttributeItem
              key={option.value}
              item={option}
              onRemove={removePlantForm}
              isRemoving={isRemovingPlantForm}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Heading className="max-h-96">Umiejscowienie roślin</Heading>

        <AddNewAttributeInput
          placeholder="Umiejscowienie rośliny"
          onAdd={addPlantPlacement}
          isAdding={isAddingPlantPlacement}
        />

        <div className="border-b-2 flex flex-wrap gap-4 py-2">
          {plantPlacementsOptions.map((option) => (
            <CustomAttributeItem
              key={option.value}
              item={option}
              onRemove={removePlantPlacement}
              isRemoving={isRemovingPlantPlacement}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Heading className="max-h-96">Zapotrzebowanie na wodę roślin</Heading>

        <AddNewAttributeInput
          placeholder="Zapotrzebowanie na wodę"
          onAdd={addWaterDemand}
          isAdding={isAddingWaterDemand}
        />

        <div className="border-b-2 flex flex-wrap gap-4 py-2">
          {plantWaterDemandsOptions.map((option) => (
            <CustomAttributeItem
              key={option.value}
              item={option}
              onRemove={removeWaterDemand}
              isRemoving={isRemovingWaterDemand}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Dodatkowe atrybuty",
  },
};

export default CustomAttributesPage;
