export default function combineStrings(
  firstString: string | null,
  secondString: string | null
): string {
  const sep = firstString && secondString ? ', ' : '';

  return `${firstString}${sep}${secondString}`;
}
