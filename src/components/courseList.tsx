import type { Dispatch, SetStateAction } from "react";
import { courseHasConflictWithSelected } from '../utilities/timeConflicts';

export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}
export interface CourseProps {
    courses: Record<string, Course>;
    selectedCourses: string[];
    setSelectedCourses: Dispatch<SetStateAction<string[]>>;
  }


const CourseList = ({courses, selectedCourses, setSelectedCourses}:CourseProps) => {

    return (
        <div className="grid gap-3 p-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-auto">
            {Object.entries(courses).map(([id, course]) => {
                const isSelected = selectedCourses.includes(id);
                const hasConflict = !isSelected && courseHasConflictWithSelected(course, selectedCourses, courses);
                const isSelectable = isSelected || !hasConflict;
                
                return(
                <div key={id} className={`border-2 h-45 flex flex-col justify-between rounded-2xl p-4 overflow-auto relative ${
                    isSelected 
                        ? 'border-blue-500 bg-blue-50 cursor-pointer' 
                        : isSelectable 
                            ? 'bg-white border-gray-200 cursor-pointer hover:border-gray-300' 
                            : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
                        onClick={() => {
                            if (isSelectable) {
                                setSelectedCourses(isSelected ? selectedCourses.filter(courseId => courseId !== id) : [...selectedCourses, id])
                            }
                        }}
                    >
                    {hasConflict && (
                        <div className="absolute top-2 right-2 text-red-500 font-bold text-lg">
                            ×
                        </div>
                    )}
                    <div>
                        <h2 className={`font-semibold ${hasConflict ? 'text-gray-500' : ''}`}>{course.term} CS {course.number}</h2>
                        <p className={hasConflict ? 'text-gray-500' : ''}>{course.title}</p>
                    </div>
                    <div className={hasConflict ? 'text-gray-400' : 'text-gray-400'}>
                        <hr />
                        <p>{course.meets}</p>
                    </div>
                </div>
                );
            } )}
        </div>
    )
}

export default CourseList;