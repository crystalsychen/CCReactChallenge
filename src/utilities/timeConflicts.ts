import type { Course } from '../components/courseList';

// Parse a meeting string like "MWF 11:00-11:50" or "TuTh 14:00-15:20"
export interface ParsedMeeting {
  days: string[];
  startTime: number; // minutes from midnight
  endTime: number;   // minutes from midnight
}

export function parseMeetingTime(meets: string): ParsedMeeting | null {
  if (!meets || meets.trim() === '') {
    return null;
  }

  // Match pattern like "MWF 11:00-11:50" or "TuTh 14:00-15:20"
  const match = meets.match(/^([A-Za-z]+)\s+(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!match) {
    return null;
  }

  const [, dayString, startHour, startMin, endHour, endMin] = match;
  
  const days = parseDays(dayString);
  const startTime = parseInt(startHour) * 60 + parseInt(startMin);
  const endTime = parseInt(endHour) * 60 + parseInt(endMin);

  return {
    days,
    startTime,
    endTime
  };
}

function parseDays(dayString: string): string[] {
  const days: string[] = [];
  let i = 0;
  
  while (i < dayString.length) {
    // Check for two-letter days first (Tu, Th)
    if (i + 1 < dayString.length) {
      const twoChar = dayString.substring(i, i + 2);
      if (twoChar === 'Tu' || twoChar === 'Th') {
        days.push(twoChar);
        i += 2;
        continue;
      }
    }
    
    // Single character days (M, W, F)
    days.push(dayString.charAt(i));
    i++;
  }
  
  return days;
}

function timeRangesOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
  return start1 < end2 && start2 < end1;
}

function daysOverlap(days1: string[], days2: string[]): boolean {
  return days1.some(day => days2.includes(day));
}


export function coursesHaveTimeConflict(course1: Course, course2: Course): boolean {
  // Courses must be in the same term to conflict
  if (course1.term !== course2.term) {
    return false;
  }

  const meeting1 = parseMeetingTime(course1.meets);
  const meeting2 = parseMeetingTime(course2.meets);

  // If either course has no meeting time (empty string), no conflict
  if (!meeting1 || !meeting2) {
    return false;
  }

  // Check if they have overlapping days and times
  return daysOverlap(meeting1.days, meeting2.days) && 
         timeRangesOverlap(meeting1.startTime, meeting1.endTime, meeting2.startTime, meeting2.endTime);
}

export function courseHasConflictWithSelected(
  course: Course, 
  selectedCourses: string[], 
  allCourses: Record<string, Course>
): boolean {
  return selectedCourses.some(selectedId => {
    const selectedCourse = allCourses[selectedId];
    return selectedCourse && coursesHaveTimeConflict(course, selectedCourse);
  });
}