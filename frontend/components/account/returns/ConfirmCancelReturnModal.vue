<template>
  <v-dialog
    max-width="500"
    v-model:model-value="isActive"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip
        :disabled="!isDisabled"
        text="The refund has been received or canceled"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="{ ...activatorProps, ...props }"
            variant="text"
            :disabled="isDisabled"
            style="pointer-events: auto"
          >
            Cancel
          </v-btn>
        </template>
      </v-tooltip>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        class="text-center pa-4"
        :title="`Cancel return ${returnId}`"
      >
        <v-card-text> Are you sure you want to cancel your return? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            @click="isActive.value = false"
            :disabled="isCancellingReturn"
          >
            No
          </v-btn>

          <v-btn
            variant="tonal"
            color="red"
            @click="onCancel"
            :disabled="isCancellingReturn"
          >
            Yes, cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { ReturnStatus } from "@medusajs/medusa";

type ConfirmCancelOrderModalProps = {
  returnId: string;
  returnStatus: ReturnStatus;
};

const { cancelReturn, isCancellingReturn } = useReturns();

const isActive = ref(false);

const props = defineProps<ConfirmCancelOrderModalProps>();

const isDisabled = computed(
  () => props.returnStatus === "received" || props.returnStatus === "canceled",
);

const onCancel = async () => {
  try {
    await cancelReturn(props.returnId);

    isActive.value = false;
  } catch (error) {
    // handled in mutation query composable
  }
};
</script>
