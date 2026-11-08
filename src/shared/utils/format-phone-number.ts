export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  const isInternationalInput = value.trimStart().startsWith("+");
  const hasBrazilCountryCode = digits.startsWith("55") && digits.length > 11;

  if (isInternationalInput && !hasBrazilCountryCode) {
    return `+${digits}`;
  }

  const localNumber = hasBrazilCountryCode ? digits.slice(2) : digits;
  const areaCode = localNumber.slice(0, 2);
  const subscriber = localNumber.slice(2);

  if (localNumber.length <= 2) {
    return `(${localNumber}`;
  }

  const formattedSubscriber =
    subscriber.length > 4
      ? `${subscriber.slice(0, localNumber.length > 10 ? 5 : 4)}-${subscriber.slice(
          localNumber.length > 10 ? 5 : 4,
        )}`
      : subscriber;

  return `(${areaCode}) ${formattedSubscriber}`;
}
