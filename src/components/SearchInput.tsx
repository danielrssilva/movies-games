import React, { useEffect } from 'react';

interface SearchInputProps {
    value: string;
    label?: string;
    placeholder?: string;
    id?: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
    const { value, label, onChange, placeholder = 'Search', id } = props;
    const [localValue, setLocalValue] = React.useState(value);

    useEffect(() => {
        const timer = setTimeout(() => onChange(localValue), 300);
        return () => clearTimeout(timer);
    }, [localValue, onChange]);

    // useEffect(() => {
    //     setLocalValue(value);
    // }, [value]);

    return (
        <div className="relative flex flex-col gap-2">
            <label htmlFor={id} className="font-monomaniac-one text-lightest-grey tracking-widest">{label}</label>
            <input
                type="text"
                id={id}
                className="w-full px-4 pr-10 pl-0 text-sm border-b border-border-grey placeholder:text-border-grey pt-1 pb-3 text-lg font-montserrat uppercase font-bold text-white bg-darkest-grey focus:outline-none"
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                // onBlur={() => setLocalValue(value)}
            />
            <div className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4241 17.6214C16.0156 16.0718 17.7509 13.2385 17.7509 9.99999C17.7509 5.09828 13.7775 1.12425 8.87574 1.12425C3.9734 1.12425 0 5.09828 0 9.99999C0 14.9017 3.9734 18.8757 8.87574 18.8757H20V17.6215L13.4241 17.6214ZM12.4408 5.69824C13.3606 5.16722 14.5361 5.48218 15.0671 6.40199C15.5981 7.32179 15.2832 8.49792 14.3634 9.02894C13.4436 9.55933 12.268 9.24441 11.737 8.32519C11.2054 7.4048 11.521 6.22925 12.4408 5.69824ZM11.7364 11.6284C12.268 10.7086 13.4436 10.3937 14.3634 10.9247C15.2832 11.4563 15.5981 12.6318 15.0671 13.5516C14.5362 14.4714 13.3606 14.7864 12.4402 14.2554C11.521 13.7244 11.2054 12.5482 11.7364 11.6284ZM8.87574 2.82714C9.93777 2.82714 10.7984 3.68773 10.7984 4.74976C10.7984 5.81179 9.93777 6.67359 8.87574 6.67359C7.81371 6.67359 6.95191 5.81175 6.95191 4.74976C6.95191 3.68777 7.81371 2.82714 8.87574 2.82714ZM9.7632 9.99999C9.7632 10.4907 9.36586 10.8875 8.87574 10.8875C8.385 10.8875 7.98828 10.4907 7.98828 9.99999C7.98828 9.50925 8.385 9.11253 8.87574 9.11253C9.36586 9.11253 9.7632 9.50929 9.7632 9.99999ZM2.68371 6.40199C3.21473 5.48218 4.39086 5.16726 5.31066 5.69824C6.23047 6.22921 6.54539 7.4048 6.01441 8.32519C5.4834 9.24437 4.30727 9.55992 3.38746 9.02894C2.46828 8.49792 2.1527 7.32179 2.68371 6.40199ZM5.31129 14.2554C4.39086 14.7864 3.21535 14.4714 2.68371 13.5516C2.15332 12.6318 2.46824 11.4557 3.38746 10.9241C4.30727 10.393 5.4834 10.7086 6.01441 11.6284C6.54543 12.5482 6.23047 13.7244 5.31129 14.2554ZM6.95191 15.2032C6.95191 14.1412 7.81375 13.28 8.87574 13.28C9.93773 13.28 10.7984 14.1412 10.7984 15.2032C10.7984 16.2652 9.93777 17.1264 8.87574 17.1264C7.81371 17.1264 6.95191 16.2653 6.95191 15.2032Z" fill="#A4A4A4" />
                </svg>
            </div>
        </div>
    );
};

export default SearchInput;
