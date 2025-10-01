export interface Time {
  type: 'days' | 'minutes' | 'seconds';
  duration: number;
}

/**
 * Time in seconds or Time object
 */
export type Duration = number | Time;
