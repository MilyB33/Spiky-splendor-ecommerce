import { Select } from "@medusajs/ui";
import { CustomAttributesValues } from "./useProductsCustomAttributes";
import { WaterDemand as WaterDemandType } from "../../types/product";

type Option = {
  value: string;
  label: string;
};

type WaterDemandProps = {
  options: Option[];
  value: WaterDemandType;
  onChangeValues: (values: CustomAttributesValues) => void;
};

export const WaterDemand = ({
  options,
  value,
  onChangeValues,
}: WaterDemandProps) => {
  const onChange = (value: WaterDemandType) => {
    onChangeValues({ water_demand: value });
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <Select.Trigger>
        <Select.Value placeholder="Select water demand" />
      </Select.Trigger>
      <Select.Content>
        {options.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
