export const DEADLINE_STATUS_COLORS = {
  red: { bgColor: 'bg-red-100', textColor: 'text-red-700' },
  amber: { bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
  green: { bgColor: 'bg-green-100', textColor: 'text-green-700' },
};
export const DEFAULT_DEADLINE_STATUS_COLORS = { bgColor: 'bg-slate-100', textColor: 'text-slate-700' };

export function getDaysRemaining(deadline) {
  return Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
}

// Returns 'red' | 'amber' | 'green' | null based on a brand's threshold config.
export function getDeadlineStatus(brand, daysRemaining) {
  if (!brand) return null;

  if (daysRemaining < 1) return 'red';
  if (brand.green_max_days != null && daysRemaining > brand.green_max_days) return 'green';

  const inGreenRange = brand.green_min_days != null && brand.green_max_days != null &&
    daysRemaining >= brand.green_min_days && daysRemaining <= brand.green_max_days;
  const inAmberRange = brand.amber_min_days != null && brand.amber_max_days != null &&
    daysRemaining >= brand.amber_min_days && daysRemaining <= brand.amber_max_days;
  const inRedRange = brand.red_min_days != null && brand.red_max_days != null &&
    daysRemaining >= brand.red_min_days && daysRemaining <= brand.red_max_days;

  if (inGreenRange) return 'green';
  if (inAmberRange) return 'amber';
  if (inRedRange) return 'red';
  return null;
}
