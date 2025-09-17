"use client";

type TInputCheckboxProps = {
  labelText?: string;
  icon?: string | null;
  invertIconPosition?: boolean;
  labelTextClassName?: string;
  checkboxClassName?: string;
  iconClassName?: string;
  className?: string;
  [key: string]: unknown;
};

export const InputCheckbox = ({
  labelText,
  icon = null,
  invertIconPosition = false,
  labelTextClassName = "",
  checkboxClassName = "",
  iconClassName = "",
  className = "",
  ...props
}: TInputCheckboxProps) => {
  return (
    <label
      className={`flex items-center w-max gap-2 cursor-pointer select-none ${
        invertIconPosition ? "flex-row-reverse" : ""
      } ${className}`}
    >
      {icon && <span className={`text-inherit ${iconClassName}`}>{icon}</span>}

      <input
        type="checkbox"
        className={`appearance-auto accent-primary cursor-pointer ${checkboxClassName}`}
        {...props}
      />

      {labelText && (
        <span className={`text-inherit ${labelTextClassName}`}>
          {labelText}
        </span>
      )}
    </label>
  );
};
