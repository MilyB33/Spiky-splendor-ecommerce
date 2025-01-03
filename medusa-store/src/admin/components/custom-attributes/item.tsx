import { Badge, FocusModal, Button } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { useState } from "react";

type CustomAttributeItemProps = {
  item: {
    value: string;
    label: string;
  };
  onRemove: (id: string) => Promise<void>;
  isRemoving: boolean;
};

export const CustomAttributeItem = ({
  item,
  onRemove,
  isRemoving,
}: CustomAttributeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Badge className="flex gap-2 h-fit">
      <p>{item.label}</p>
      <FocusModal open={isOpen} onOpenChange={setIsOpen}>
        <FocusModal.Trigger>
          <XMark />
        </FocusModal.Trigger>
        <ConfirmDeleteModalContent
          item={item}
          closeModal={closeModal}
          isRemoving={isRemoving}
          onRemove={onRemove}
        />
      </FocusModal>
    </Badge>
  );
};

type ConfirmDeleteModalContentProps = CustomAttributeItemProps & {
  closeModal: () => void;
};

const ConfirmDeleteModalContent = ({
  item,
  closeModal,
  onRemove,
  isRemoving,
}: ConfirmDeleteModalContentProps) => {
  return (
    <FocusModal.Content className="max-w-lg p-4 h-fit m-auto">
      <FocusModal.Header>Delete {item.label}</FocusModal.Header>
      <FocusModal.Body>
        <div className="flex justify-center py-5 w-100 text-center">
          Are you sure you want to delete {item.label}?
        </div>

        <div className="flex gap-4 justify-end">
          <Button onClick={closeModal} disabled={isRemoving}>
            Delete
          </Button>
          <Button
            variant="danger"
            disabled={isRemoving}
            onClick={async () => {
              try {
                await onRemove(item.value);
                closeModal();
              } catch (error) {
                // handled in useHandleCustomAttributesHook
              }
            }}
          >
            Delete
          </Button>
        </div>
      </FocusModal.Body>
    </FocusModal.Content>
  );
};
