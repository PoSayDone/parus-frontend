import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StoreProductOption } from "@/types/store";
import type React from "react";

type OptionSelectProps = {
  option: StoreProductOption;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = option.values;

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Выберите {title}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption(option.id, v)}
              key={v}
              variant={v === current ? "default" : "outline"}
              className={cn("px-2 flex-1 ", {
                "border-ui-border-interactive": v === current,
                "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                  v !== current,
              })}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;