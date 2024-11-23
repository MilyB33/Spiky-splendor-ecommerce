import { Select } from "@medusajs/ui";
import { CustomAttributesValues } from "./useProductsCustomAttributes";

type Option = {
  value: string;
  label: string;
};

type WaterDemandProps = {
  options: Option[];
  value: string;
  onChangeValues: (values: CustomAttributesValues) => void;
};

export const WaterDemand = ({
  options,
  value,
  onChangeValues,
}: WaterDemandProps) => {
  const onChange = (value: string) => {
    onChangeValues({ plant_water_demand_id: value });
  };
  console.log(value);
  return (
    <Select value={value} onValueChange={onChange}>
      <Select.Trigger>
        <Select.Value placeholder="Wybierz zapotrzebowanie na wodę" />
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

type RadioOptionProps = Option & {
  onChange: (value: string) => void;
  initialValue: string;
};
