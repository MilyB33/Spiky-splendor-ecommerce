import { useMedusa } from "medusa-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import type { ProductDetailsWidgetProps } from "@medusajs/admin";
import { useGetCustomAttributes } from "../../hooks/use-get-custom-attributes";
import { WaterDemand } from "../../types/product";

export const API_QUERY_KEY = {
  PRODUCT: "PRODUCT",
} as const;

export type CustomAttributesValues = {
  plant_forms?: string[];
  plant_placements?: string[];
  water_demand?: string;
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
    isFetchingPlantForms,
    isFetchingPlantPlacements,
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
        fields: "pot_diameter,min_height,max_height,water_demand",
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
      water_demand: productResponse?.products[0]?.water_demand,
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
    notify.success("Saved", "Additional attributes saved correctly");
    refetch();
  };

  const waterDemandOptions = useMemo(() => {
    return Object.values(WaterDemand).map((demand) => ({
      value: demand,
      label: demand,
    }));
  }, []);

  return {
    plantFormsOptions,
    plantPlacementsOptions,
    waterDemandOptions,
    values,
    onChangeValues,
    updateProduct,
    isFetchingPlantForms,
    isFetchingPlantPlacements,
    isUpdatingProduct,
    isFetchingProduct,
  };
};
