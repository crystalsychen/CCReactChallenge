import type { Dispatch, SetStateAction } from "react";
import { courseHasConflictWithSelected } from '../utilities/timeConflicts';
import { Link } from "@tanstack/react-router";
import { useProfile } from "../utilities/profile";

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
    allCourses: Record<string, Course>;
  }


const CourseList = ({courses, selectedCourses, setSelectedCourses, allCourses}:CourseProps) => {
    const [user, isAdmin] = useProfile();

    return (
        <div className="grid gap-3 p-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-auto" data-cy="course">
            {Object.entries(courses).map(([id, course]) => {
                const isSelected = selectedCourses.includes(id);
                const hasConflict = !isSelected && courseHasConflictWithSelected(course, selectedCourses, allCourses);
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
                        <div className="flex justify-between mt-3">
                            <p>{course.meets}</p>
                            { user && isAdmin ?
                                <Link to="/course/edit/$courseId" 
                                    params={{ courseId: id }}
                                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                    Edit
                                </Link>
                                : null
                            }
                        </div>
                    </div>
                </div>
                );
            } )}
        </div>
    )
}

export default CourseList;