import { RouteConfig, RouteProps } from "@medusajs/admin";
import { Heading } from "@medusajs/ui";
import { useGetCustomAttributes } from "../../hooks/use-get-custom-attributes";
import { CustomAttributeItem } from "../../components/custom-attributes/item";
import { AddNewAttributeInput } from "../../components/custom-attributes/add-new-attribute-input";
import { useHandleCustomAttributes } from "../../hooks/use-handle-custom-attributes";

export const API_QUERY_KEY = {
  PLANT_FORMS: "PLANT_FORMS",
  PLANT_PLACEMENTS: "PLANT_PLACEMENTS",
  PRODUCT: "PRODUCT",
} as const;

const CustomAttributesPage = ({ notify }: RouteProps) => {
  const {
    plantFormsOptions,
    plantPlacementsOptions,
    refetchPlantForms,
    refetchPlantPlacements,
  } = useGetCustomAttributes();
  const {
    removePlantForm,
    removePlantPlacement,
    addPlantForm,
    addPlantPlacement,
    isRemovingPlantForm,
    isRemovingPlantPlacement,
    isAddingPlantForm,
    isAddingPlantPlacement,
  } = useHandleCustomAttributes({
    refetchPlantForms,
    refetchPlantPlacements,
    notify,
  });

  return (
    <div className="flex flex-col gap-5 bg-white p-8 border border-gray-200 ">
      <div className="flex flex-col gap-4">
        <Heading className="max-h-96">Plant forms</Heading>

        <AddNewAttributeInput
          placeholder="Plant form"
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
        <Heading className="max-h-96">Plant placements</Heading>

        <AddNewAttributeInput
          placeholder="Plant placement"
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
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Additional attributes",
  },
};

export default CustomAttributesPage;
