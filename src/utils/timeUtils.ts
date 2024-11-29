import { addMinutes, parse, format } from 'date-fns';

export const BUSINESS_HOURS = {
  open: '10:00',
  close: '19:00' // 7:00 PM in 24h format
};

export const parseTime = (timeStr: string): Date => {
  return parse(timeStr, 'HH:mm', new Date());
};

export const isWithinBusinessHours = (
  timeStr: string,
  serviceDuration: number
): boolean => {
  const appointmentTime = parseTime(timeStr);
  const endTime = addMinutes(appointmentTime, serviceDuration);
  const closingTime = parseTime(BUSINESS_HOURS.close);
  const openingTime = parseTime(BUSINESS_HOURS.open);

  return (
    appointmentTime >= openingTime &&
    endTime <= closingTime
  );
};

export const getAvailableTimeSlots = (
  serviceDuration: number
): string[] => {
  const slots: string[] = [];
  let currentTime = parseTime(BUSINESS_HOURS.open);
  const closingTime = parseTime(BUSINESS_HOURS.close);

  while (addMinutes(currentTime, serviceDuration) <= closingTime) {
    slots.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, 30); // 30-minute intervals
  }

  return slots;
};

export const formatTimeDisplay = (time: string): string => {
  const date = parseTime(time);
  return format(date, 'h:mm a'); // Formats as "10:00 AM"
};