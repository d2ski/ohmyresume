export default function combineStrings(...args: (string | null)[]): string {
  const displayStrings = args.filter((arg) => arg);

  return displayStrings.join(', ');
}
