'use client';

import { useMemo } from 'react';
import en from 'react-phone-number-input/locale/en.json';
import { getCountries, getCountryCallingCode, type Country } from 'react-phone-number-input';

type CountryCodeSelectProps = {
  value: Country | undefined;
  onChange: (country: Country | undefined) => void;
  disabled?: boolean;
  id?: string;
  countryNameOverrides?: Partial<Record<Country, string>>;
};

export function getDialCodeFromCountry(country: Country | undefined): string {
  if (!country) return '';
  try {
    return `+${getCountryCallingCode(country)}`;
  } catch {
    return '';
  }
}

export default function CountryCodeSelect({
  value,
  onChange,
  disabled,
  id,
  countryNameOverrides,
}: CountryCodeSelectProps) {
  const options = useMemo(
    () =>
      getCountries()
        .map((country: Country) => {
          const dialCode = getDialCodeFromCountry(country);
          const label =
            countryNameOverrides?.[country] ?? (en as Record<string, string>)[country] ?? country;
          return {
            country,
            dialCode,
            label,
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })),
    [countryNameOverrides],
  );

  return (
    <select
      id={id}
      className="registration-country-select"
      value={value ?? ''}
      disabled={disabled}
      onChange={(e) => {
        const next = e.target.value as Country;
        onChange(next || undefined);
      }}
    >
      <option value="" disabled>
        Select country code
      </option>
      {options.map(
        ({ country, dialCode, label }: { country: Country; dialCode: string; label: string }) => (
          <option key={country} value={country}>
            {label} ({dialCode})
          </option>
        ),
      )}
    </select>
  );
}
