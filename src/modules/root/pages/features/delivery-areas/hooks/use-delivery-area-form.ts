import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  buildCreateDeliveryAreaPayload,
  buildUpdateDeliveryAreaPayload,
} from "../helpers/build-delivery-area-payload";
import {
  deliveryAreaToFormValues,
  getDeliveryAreaFormDefaultValues,
} from "../helpers/delivery-area-form-defaults";
import { useCreateDeliveryAreaMutation } from "../mutations/use-create-delivery-area-mutation";
import { useUpdateDeliveryAreaMutation } from "../mutations/use-update-delivery-area-mutation";
import { deliveryAreaFormSchema } from "../schema/delivery-area-form-schema";
import type { DeliveryArea, DeliveryAreaFormValues } from "../types/delivery-area.types";

type UseDeliveryAreaFormOptions = {
  area: DeliveryArea | null;
  onSaved: () => void;
};

export function useDeliveryAreaForm({ area, onSaved }: UseDeliveryAreaFormOptions) {
  const isEditing = area !== null;

  const form = useForm<DeliveryAreaFormValues>({
    resolver: zodResolver(deliveryAreaFormSchema),
    defaultValues: area ? deliveryAreaToFormValues(area) : getDeliveryAreaFormDefaultValues(),
    mode: "onTouched",
  });

  const { dirtyFields } = form.formState;

  const createAreaMutation = useCreateDeliveryAreaMutation();
  const updateAreaMutation = useUpdateDeliveryAreaMutation();

  const onSubmit = form.handleSubmit((values) => {
    if (area) {
      const payload = buildUpdateDeliveryAreaPayload(values, dirtyFields);

      if (Object.keys(payload).length === 0) {
        onSaved();
        return;
      }

      updateAreaMutation.mutate(
        { areaId: area.id, payload },
        {
          onSuccess: () => {
            toast.success("Área de entrega atualizada com sucesso!");
            onSaved();
          },
        },
      );
      return;
    }

    createAreaMutation.mutate(buildCreateDeliveryAreaPayload(values), {
      onSuccess: () => {
        toast.success("Área de entrega criada com sucesso!");
        onSaved();
      },
    });
  });

  return {
    form,
    onSubmit,
    isEditing,
    isSubmitting: createAreaMutation.isPending || updateAreaMutation.isPending,
  };
}
