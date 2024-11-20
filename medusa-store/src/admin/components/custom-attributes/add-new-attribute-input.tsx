import { Input, Button } from "@medusajs/ui";
import { useState } from "react";

type AddNewAttributeInput = {
  placeholder: string;
  isAdding: boolean;
  onAdd: (id: string) => Promise<void>;
};

export const AddNewAttributeInput = ({
  placeholder,
  isAdding,
  onAdd,
}: AddNewAttributeInput) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleOnAdd = async () => {
    if (value.length === 0) {
      setError("Pole nie moze być puste");
      return;
    }

    await onAdd(value);
    setValue("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          className="w-72"
          value={value}
          onChange={(event) => {
            if (error.length) setError("");
            setValue(event.target.value);
          }}
        />

        <Button onClick={handleOnAdd} disabled={isAdding}>
          Dodaj
        </Button>
      </div>
      <span className="text-red-500">{error}</span>
    </div>
  );
};
