import { useMedusa } from "medusa-react";
import { useQuery } from "@tanstack/react-query";
import { PlantForm } from "src/models/plant-form";
import { useMemo } from "react";

export const API_QUERY_KEY = {
  PLANT_FORMS: "PLANT_FORMS",
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

  return {
    plantFormsOptions,
    isFetchingPlantForms,
    refetchPlantForms,
  };
};
