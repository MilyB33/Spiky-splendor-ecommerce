import { useMedusa } from "medusa-react";
import { useQuery } from "@tanstack/react-query";
import { PlantForm } from "src/models/plant-form";
import { PlantPlacement } from "src/models/plant-placement";
import { useMemo } from "react";

export const API_QUERY_KEY = {
  PLANT_FORMS: "PLANT_FORMS",
  PLANT_PLACEMENTS: "PLANT_PLACEMENTS",
} as const;

export const useGetCustomAttributes = () => {
  const { client } = useMedusa();

  const {
    data: plantFormsResponse,
    isFetching: isFetchingPlantForms,
    refetch: refetchPlantForms,
  } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_FORMS],
    queryFn: (): Promise<{ plant_forms: PlantForm[] }> =>
      client.client.request("GET", "/store/plant-forms/"),
  });

  const {
    data: plantPlacementsResponse,
    isFetching: isFetchingPlantPlacements,
    refetch: refetchPlantPlacements,
  } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_PLACEMENTS],
    queryFn: (): Promise<{ plant_placements: PlantPlacement[] }> =>
      client.client.request("GET", "/store/plant-placements/"),
  });

  const plantFormsOptions = useMemo(() => {
    return (
      plantFormsResponse?.plant_forms.map((plantForm) => {
        return {
          value: plantForm.id,
          label: plantForm.name,
        };
      }) || []
    );
  }, [plantFormsResponse]);

  const plantPlacementsOptions = useMemo(() => {
    return (
      plantPlacementsResponse?.plant_placements.map((plantPlacement) => {
        return {
          value: plantPlacement.id,
          label: plantPlacement.name,
        };
      }) || []
    );
  }, [plantPlacementsResponse]);

  return {
    plantFormsOptions,
    plantPlacementsOptions,
    isFetchingPlantForms,
    isFetchingPlantPlacements,
    refetchPlantForms,
    refetchPlantPlacements,
  };
};
