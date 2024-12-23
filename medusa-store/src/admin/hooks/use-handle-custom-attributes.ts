import { useMedusa } from "medusa-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { RouteProps } from "@medusajs/admin";

type UseHandleCustomAttributesProps = {
  refetchPlantForms: () => void;
  refetchPlantPlacements: () => void;
  refetchPlantWaterDemands: () => void;
  notify: RouteProps["notify"];
};

export const useHandleCustomAttributes = ({
  refetchPlantForms,
  refetchPlantPlacements,
  refetchPlantWaterDemands,
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

  const {
    mutateAsync: removePlantPlacement,
    isLoading: isRemovingPlantPlacement,
  } = useMutation({
    mutationFn: (id: string) =>
      client.admin.client.request("DELETE", `/admin/plant-placements/${id}/`),
    onSuccess: () => {
      refetchPlantPlacements();
      notify.success("Successfully deleted", "Item successfully deleted");
    },
    onError: () => {
      notify.error("Error", "An error occurred. Please try again");
    },
  });

  const { mutateAsync: addPlantPlacement, isLoading: isAddingPlantPlacement } =
    useMutation({
      mutationFn: (name: string) =>
        client.admin.client.request("POST", `/admin/plant-placements/`, {
          name,
        }),
      onSuccess: () => {
        refetchPlantPlacements();
        notify.success("Successfully added", "Item was successfully added");
      },
      onError: () => {
        notify.error("Error", "An error occurred. Please try again");
      },
    });

  const {
    mutateAsync: removeWaterDemand,
    isLoading: isRemovingWaterDemand,
    error,
  } = useMutation({
    mutationFn: (id: string) =>
      client.admin.client.request(
        "DELETE",
        `/admin/plant-water-demands/${id}/`
      ),
    onSuccess: () => {
      refetchPlantWaterDemands();
      notify.success("Successfully deleted", "Item successfully deleted");
    },
    onError: () => {
      notify.error(
        "Error",
        "The integrity bond has probably been violated. Remove this value from all products to remove"
      );
    },
  });

  const { mutateAsync: addWaterDemand, isLoading: isAddingWaterDemand } =
    useMutation({
      mutationFn: (name: string) =>
        client.admin.client.request("POST", `/admin/plant-water-demands/`, {
          name,
        }),
      onSuccess: () => {
        refetchPlantWaterDemands();
        notify.success("Successfully added", "Item was successfully added");
      },
      onError: () => {
        notify.error("Error", "An error occurred. Please try again");
      },
    });

  return {
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
  };
};
