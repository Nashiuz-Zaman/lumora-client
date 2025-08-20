"use client";

type TInputCheckboxProps = {
  labelText?: string;
  icon?: string | null;
  invertIconPosition?: boolean;
  labelTextClassName?: string;
  checkboxClassName?: string;
  iconClassName?: string;
  ClassName?: string;
  [key: string]: unknown;
};

export const InputCheckbox = ({
  labelText,

  icon = null,
  invertIconPosition = false,
  labelTextClassName = "",
  checkboxClassName = "",
  iconClassName = "",
  ClassName = "",
}: TInputCheckboxProps) => {
  return (
    <label
      className={`flex items-center w-max gap-2 cursor-pointer select-none ${
        invertIconPosition ? "flex-row-reverse" : ""
      } ${ClassName}`}
    >
      {icon && <span className={`text-inherit ${iconClassName}`}>{icon}</span>}

      <input
        type="checkbox"
        className={`accent-green-700 cursor-pointer ${checkboxClassName}`}
      />

      {labelText && (
        <span className={`text-inherit ${labelTextClassName}`}>
          {labelText}
        </span>
      )}
    </label>
  );
};
