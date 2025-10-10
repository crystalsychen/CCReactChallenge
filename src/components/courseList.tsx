import type { Dispatch, SetStateAction } from "react";


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
                return(
                <div key={id} className={`border-2 h-45 flex flex-col justify-between rounded-2xl  p-4 overflow-auto cursor-pointer ${isSelected ? 'border-blue-500 bg-blue-50' : 'bg-white border-gray-200'}`}
                        onClick={() => setSelectedCourses(isSelected ? selectedCourses.filter(courseId => courseId !== id) : [...selectedCourses, id])}
                    >
                    <div>
                        <h2 className="font-semibold">{course.term} CS {course.number}</h2>
                        <p>{course.title}</p>
                    </div>
                    <div className="text-gray-400">
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