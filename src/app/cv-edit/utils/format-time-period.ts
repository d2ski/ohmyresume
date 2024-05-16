import { TuiMonthLike } from '@taiga-ui/cdk';
import { TUI_RUSSIAN_LANGUAGE_CORE } from '@taiga-ui/i18n';

const formatMonth = ({ month }: TuiMonthLike): string =>
  TUI_RUSSIAN_LANGUAGE_CORE.months[month || 0];

const formatYear = ({ year }: TuiMonthLike): string => (year ? `${year}` : '');

export function formatTimePeriod(
  monthStart: TuiMonthLike | null,
  monthEnd: TuiMonthLike | null
): string {
  if (!monthStart) {
    return '';
  }

  if (!monthEnd) {
    return `${formatMonth(monthStart)} ${formatYear(monthStart)} - н.в.`;
  }

  return `${formatMonth(monthStart)} ${formatYear(monthStart)} - ${formatMonth(
    monthEnd
  )} ${formatYear(monthEnd)}`;
}
