import { useMedusa } from "medusa-react";
import { useQuery } from "@tanstack/react-query";
import { PlantForm } from "src/models/plant-form";
import { PlantPlacement } from "src/models/plant-placement";
import { PlantWaterDemand } from "src/models/plant-water-demand";
import { useMemo } from "react";

export const API_QUERY_KEY = {
  PLANT_FORMS: "PLANT_FORMS",
  PLANT_PLACEMENTS: "PLANT_PLACEMENTS",
  PLANT_WATER_DEMANDS: "PLANT_WATER_DEMANDS",
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

  const {
    data: plantWaterDemandsResponse,
    isFetching: isFetchingPlantWaterDemands,
    refetch: refetchPlantWaterDemands,
  } = useQuery({
    queryKey: [API_QUERY_KEY.PLANT_WATER_DEMANDS],
    queryFn: (): Promise<{ plant_water_demands: PlantWaterDemand[] }> =>
      client.client.request("GET", "/store/plant-water-demands/"),
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

  const plantWaterDemandsOptions = useMemo(() => {
    return (
      plantWaterDemandsResponse?.plant_water_demands.map((plantWaterDemand) => {
        return {
          value: plantWaterDemand.id,
          label: plantWaterDemand.name,
        };
      }) || []
    );
  }, [plantWaterDemandsResponse]);

  return {
    plantFormsOptions,
    plantPlacementsOptions,
    plantWaterDemandsOptions,
    isFetchingPlantForms,
    isFetchingPlantPlacements,
    isFetchingPlantWaterDemands,
    refetchPlantForms,
    refetchPlantPlacements,
    refetchPlantWaterDemands,
  };
};
