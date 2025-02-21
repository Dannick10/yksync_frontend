import React from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";

type TechSelectionProps = {
  label: string;
  options: string[];
  selected: string[];
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  name: string;
};

const TechSelection: React.FC<TechSelectionProps> = ({
  label,
  options,
  selected,
  register,
  setValue,
  name,
}) => {
  return (
    <div className="py-4">
      <legend className="font-semibold flex gap-2 items-center">{label}</legend>
      <div className="flex flex-wrap gap-4">
        {options.map((tech) => (
          <label key={tech} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={tech}
              {...register(name)}
              checked={selected.includes(tech)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...selected, tech]
                  : selected.filter((t) => t !== tech);
                setValue(name, newValues);
              }}
            />
            {tech}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TechSelection;
