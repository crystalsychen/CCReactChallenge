// Course validation utilities

export interface CourseFormData {
  title: string;
  term: string;
  number: string;
  meets: string;
}

export interface ValidationErrors {
  title?: string;
  term?: string;
  number?: string;
  meets?: string;
}

const VALID_TERMS = ['Fall', 'Winter', 'Spring', 'Summer'];


export function validateTitle(title: string): string | undefined {
    if (!title || title.trim().length < 2) {
        return 'Title must be at least 2 characters long'; 
    }
}

export function validateTerm(term: string): string | undefined {
  if (!VALID_TERMS.includes(term)) {
    return 'Term must be Fall, Winter, Spring, or Summer';
  }
  return undefined;
}

export function validateNumber(number: string): string | undefined {
  if (!number) {
    return 'Course number is required';
  }
  
  // Pattern: digits, optionally followed by dash and more characters
  const numberPattern = /^\d+(-\w+)?$/;
  if (!numberPattern.test(number)) {
    return 'Must be a number with optional section, e.g., "213" or "213-2"';
  }
  
  return undefined;
}

export function validateMeets(meets: string): string | undefined {
  // Empty string is valid
  if (!meets || meets.trim() === '') {
    return undefined;
  }
  
  // Pattern: days followed by space and time range
  // Time: HH:MM-HH:MM (24-hour format)
  const meetsPattern = /^([MWF]|Tu|Th|)+\s+\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
  
  if (!meetsPattern.test(meets.trim())) {
    return 'Must contain days and start-end time, e.g., "MWF 12:00-13:20"';
  }
  
  // Additional validation: check time range is valid
  const timeMatch = meets.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
  if (timeMatch) {
    const [, startHour, startMin, endHour, endMin] = timeMatch;
    const startTime = parseInt(startHour) * 60 + parseInt(startMin);
    const endTime = parseInt(endHour) * 60 + parseInt(endMin);
    
    if (startTime >= endTime) {
      return 'End time must be after start time';
    }
    
    // Validate hour and minute ranges
    if (parseInt(startHour) >= 24 || parseInt(endHour) >= 24) {
      return 'Hours must be 0-23';
    }
    
    if (parseInt(startMin) >= 60 || parseInt(endMin) >= 60) {
      return 'Minutes must be 0-59';
    }
  }
  
  return undefined;
}

export function validateCourseForm(data: CourseFormData): ValidationErrors {
  return {
    title: validateTitle(data.title),
    term: validateTerm(data.term),
    number: validateNumber(data.number),
    meets: validateMeets(data.meets),
  };
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.values(errors).some(error => error !== undefined);
}