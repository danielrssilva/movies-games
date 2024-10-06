import React, { useEffect } from "react";

interface SearchInputProps {
  value: string;
  label?: string;
  placeholder?: string;
  id?: string;
  onChange: (value: string) => void;
  icon?: React.JSX.Element;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { value, label, onChange, placeholder = "Search", id, icon } = props;
  const [localValue, setLocalValue] = React.useState(value);

  useEffect(() => {
    const timer = setTimeout(() => onChange(localValue), 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-monomaniac-one text-lightest-grey tracking-widest"
      >
        {label}
      </label>
      <input
        autoComplete="off"
        type="text"
        id={id}
        className="w-full px-4 pr-10 pl-0 text-sm border-b border-border-grey placeholder:text-border-grey pt-1 pb-3 text-lg font-montserrat uppercase font-bold text-white bg-darkest-grey focus:outline-none"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      <div className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 pointer-events-none">
        {icon}
      </div>
    </div>
  );
};

export default SearchInput;
