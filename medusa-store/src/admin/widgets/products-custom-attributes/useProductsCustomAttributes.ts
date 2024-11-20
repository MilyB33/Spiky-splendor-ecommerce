import { useMedusa } from "medusa-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import type { ProductDetailsWidgetProps } from "@medusajs/admin";
import { useGetCustomAttributes } from "../../hooks/use-get-custom-attributes";

export const API_QUERY_KEY = {
  PRODUCT: "PRODUCT",
} as const;

export type CustomAttributesValues = {
  plant_forms?: string[];
  plant_placements?: string[];
  plant_water_demand_id?: string;
  pot_diameter?: number;
  min_height?: number;
  max_height?: number;
};

export const useProductsCustomAttributes = (
  productId: ProductDetailsWidgetProps["product"]["id"],
  notify: ProductDetailsWidgetProps["notify"]
) => {
  const [values, setValues] = useState<CustomAttributesValues>({
    plant_forms: [],
    plant_placements: [],
  });
  const { client } = useMedusa();
  const {
    plantFormsOptions,
    plantPlacementsOptions,
    plantWaterDemandsOptions,
    isFetchingPlantForms,
    isFetchingPlantPlacements,
    isFetchingPlantWaterDemands,
  } = useGetCustomAttributes();

  // NOTE: this is only as I cannot extend admin product response
  const {
    data: productResponse,
    isFetching: isFetchingProduct,
    refetch,
  } = useQuery({
    queryKey: [API_QUERY_KEY.PRODUCT],
    queryFn: () =>
      client.admin.products.list({
        id: [productId],
        expand: "plant_forms,plant_placements",
        fields: "pot_diameter,min_height,max_height,plant_water_demand_id",
      }),
  });

  const { mutateAsync: updateProductTrigger, status: productStatus } =
    useMutation({
      mutationFn: (values: CustomAttributesValues) =>
        client.admin.products.update(productId, { ...values }),
    });

  useEffect(() => {
    setValues({
      plant_forms:
        productResponse?.products[0]?.plant_forms?.map(
          (plantForm) => plantForm.id
        ) || [],
      plant_placements:
        productResponse?.products[0]?.plant_placements?.map(
          (plantForm) => plantForm.id
        ) || [],
      plant_water_demand_id:
        productResponse?.products[0]?.plant_water_demand_id,
      pot_diameter: productResponse?.products[0]?.pot_diameter || undefined,
      min_height: productResponse?.products[0]?.min_height || undefined,
      max_height: productResponse?.products[0]?.max_height || undefined,
    });
  }, [productResponse]);

  const onChangeValues = (newValue: CustomAttributesValues) => {
    setValues({ ...values, ...newValue });
  };

  // older version of tanstack
  const isUpdatingProduct = useMemo(() => {
    return productStatus === "loading";
  }, []);

  const updateProduct = async () => {
    await updateProductTrigger(values);
    notify.success("Zapisano", "Poprawnie zapisano dodatkowe atrybuty");
    refetch();
  };

  return {
    plantFormsOptions,
    plantPlacementsOptions,
    plantWaterDemandsOptions,
    values,
    onChangeValues,
    updateProduct,
    isFetchingPlantForms,
    isFetchingPlantPlacements,
    isFetchingPlantWaterDemands,
    isUpdatingProduct,
    isFetchingProduct,
  };
};
