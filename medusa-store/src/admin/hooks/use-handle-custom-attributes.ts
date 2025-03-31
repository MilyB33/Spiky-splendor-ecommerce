import { useMedusa } from "medusa-react";
import { useMutation } from "@tanstack/react-query";
import { RouteProps } from "@medusajs/admin";

type UseHandleCustomAttributesProps = {
  refetchPlantForms: () => void;
  notify: RouteProps["notify"];
};

export const useHandleCustomAttributes = ({
  refetchPlantForms,
  notify,
}: UseHandleCustomAttributesProps) => {
  const { client } = useMedusa();

  const { mutateAsync: removePlantForm, isLoading: isRemovingPlantForm } =
    useMutation({
      mutationFn: (id: string) =>
        client.admin.client.request("DELETE", `/admin/plant-forms/${id}/`),
      onSuccess: () => {
        refetchPlantForms();
        notify.success("Successfully deleted", "Item successfully deleted");
      },
      onError: () => {
        notify.error("Error", "An error occurred. Please try again");
      },
    });

  const { mutateAsync: addPlantForm, isLoading: isAddingPlantForm } =
    useMutation({
      mutationFn: (name: string) =>
        client.admin.client.request("POST", `/admin/plant-forms/`, { name }),
      onSuccess: () => {
        refetchPlantForms();
        notify.success("Successfully added", "Item was successfully added");
      },
      onError: () => {
        notify.error("Error", "An error occurred. Please try again");
      },
    });

  return {
    removePlantForm,
    addPlantForm,
    isRemovingPlantForm,
    isAddingPlantForm,
  };
};
