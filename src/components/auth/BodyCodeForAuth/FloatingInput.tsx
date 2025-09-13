import { FloatingInputProps } from '@/types/type';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function FloatingInput({ label, name, type = "text", value, onChange, onBlur, error }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";
  const hasValue = value && value.trim().length > 0;

  useEffect(() => {
    if (value) setIsFocused(true);
  }, [value]);

  return (
    <div className="relative w-full mb-6">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        onFocus={() => setIsFocused(true)}
        placeholder={label}
        autoComplete="off"
        
        className={`peer w-full h-[60px] px-3 pt-5 pb-1 text-sm border ${
          error ? "border-red-500" : "border-gray-600"
        } rounded-md outline-none placeholder-transparent`}
      />
      <label
        htmlFor={name}
        className={`absolute ${ isArabic ? "right-3" : "left-3"} font-bold text-gray-500 transition-all duration-200 pointer-events-none ${ isFocused || hasValue ? "text-[14px] top-1.5" : "text-[16px] top-4.5"
        }`}
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}
