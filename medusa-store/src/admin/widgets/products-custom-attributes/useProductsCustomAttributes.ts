import { useMedusa } from "medusa-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import type { ProductDetailsWidgetProps } from "@medusajs/admin";
import { PlantForm, PlantPlacement, WaterDemand } from "../../types/product";

export const API_QUERY_KEY = {
  PRODUCT: "PRODUCT",
} as const;

export type CustomAttributesValues = {
  plant_forms?: PlantForm[];
  plant_placements?: PlantPlacement[];
  water_demand?: WaterDemand;
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
        fields:
          "pot_diameter,min_height,max_height,water_demand,plant_placements,plant_forms",
      }),
  });

  const { mutateAsync: updateProductTrigger, status: productStatus } =
    useMutation({
      mutationFn: (values: CustomAttributesValues) =>
        client.admin.products.update(productId, { ...values }),
    });

  useEffect(() => {
    setValues({
      plant_forms: productResponse?.products[0]?.plant_forms || [],
      plant_placements: productResponse?.products[0]?.plant_placements || [],
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

  const plantPlacementsOptions = useMemo(() => {
    return Object.values(PlantPlacement).map((placement) => ({
      value: placement,
      label: placement,
    }));
  }, []);

  const plantFormsOptions = useMemo(() => {
    return Object.values(PlantForm).map((placement) => ({
      value: placement,
      label: placement,
    }));
  }, []);

  return {
    plantFormsOptions,
    plantPlacementsOptions,
    waterDemandOptions,
    values,
    onChangeValues,
    updateProduct,
    isUpdatingProduct,
    isFetchingProduct,
  };
};
