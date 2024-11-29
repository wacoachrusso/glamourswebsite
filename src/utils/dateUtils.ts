import { addMinutes, parseISO } from 'date-fns';

export const MAJOR_HOLIDAYS = [
  { month: 0, day: 1, name: 'New Year\'s Day' },
  { month: 11, day: 25, name: 'Christmas Day' },
  { month: 6, day: 4, name: 'Independence Day' },
  { month: 10, day: 24, name: 'Thanksgiving Day' },
  { month: 4, day: 31, name: 'Memorial Day' },
  { month: 8, day: 4, name: 'Labor Day' }
];

export const isHolidayDate = (date: Date): { isHoliday: boolean; holidayName?: string } => {
  const month = date.getMonth();
  const day = date.getDate();
  
  const holiday = MAJOR_HOLIDAYS.find(h => h.month === month && h.day === day);
  
  return {
    isHoliday: !!holiday,
    holidayName: holiday?.name
  };
};

export const isTimeSlotAvailable = (
  date: string,
  time: string,
  serviceDuration: number,
  existingAppointments: any[],
  selectedProfessional?: string
): boolean => {
  if (!date || !time || !serviceDuration) return false;

  try {
    // Create the appointment start time
    const appointmentDateTime = `${date}T${time}:00`;
    const appointmentStart = parseISO(appointmentDateTime);
    const appointmentEnd = addMinutes(appointmentStart, serviceDuration);

    // Filter relevant appointments
    const relevantAppointments = existingAppointments.filter(existing => {
      // If a specific professional is selected, only check their appointments
      if (selectedProfessional) {
        return existing.selectedProfessional === selectedProfessional;
      }
      // If no professional selected, check all appointments
      return true;
    });

    // Check for overlaps
    const hasOverlap = relevantAppointments.some(existing => {
      if (!existing.appointmentDate || !existing.appointmentTime || !existing.service?.duration) {
        return false;
      }

      const existingDateTime = `${existing.appointmentDate}T${existing.appointmentTime}:00`;
      const existingStart = parseISO(existingDateTime);
      const existingEnd = addMinutes(existingStart, parseInt(existing.service.duration));

      // Check if appointments overlap
      const overlap = (
        (appointmentStart < existingEnd && appointmentEnd > existingStart) || // General overlap
        (appointmentStart >= existingStart && appointmentStart < existingEnd) || // New appointment starts during existing
        (appointmentEnd > existingStart && appointmentEnd <= existingEnd) || // New appointment ends during existing
        (appointmentStart <= existingStart && appointmentEnd >= existingEnd) // New appointment completely encompasses existing
      );

      return overlap;
    });

    return !hasOverlap;
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    return false;
  }
};