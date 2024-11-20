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
        notify.success("Poprawnie usunięto", "Poprawnie usunięto element");
      },
      onError: () => {
        notify.error("Błąd", "Wystąpił błąd. Spróbuj jeszcze raz");
      },
    });

  const { mutateAsync: addPlantForm, isLoading: isAddingPlantForm } =
    useMutation({
      mutationFn: (name: string) =>
        client.admin.client.request("POST", `/admin/plant-forms/`, { name }),
      onSuccess: () => {
        refetchPlantForms();
        notify.success("Poprawnie dodano", "Poprawnie dodano element");
      },
      onError: () => {
        notify.error("Błąd", "Wystąpił błąd. Spróbuj jeszcze raz");
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
      notify.success("Poprawnie usunięto", "Poprawnie usunięto element");
    },
    onError: () => {
      notify.error("Błąd", "Wystąpił błąd. Spróbuj jeszcze raz");
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
        notify.success("Poprawnie dodano", "Poprawnie dodano element");
      },
      onError: () => {
        notify.error("Błąd", "Wystąpił błąd. Spróbuj jeszcze raz");
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
      notify.success("Poprawnie usunięto", "Poprawnie usunięto element");
    },
    onError: () => {
      notify.error(
        "Błąd",
        "Prawdopodobnie naruszono więzy integralności. Usuń tę wartośc z wszystkich produktów zeby usunąć"
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
        notify.success("Poprawnie dodano", "Poprawnie dodano element");
      },
      onError: () => {
        notify.error("Błąd", "Wystąpił błąd. Spróbuj jeszcze raz");
      },
    });

  console.log(error);

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
