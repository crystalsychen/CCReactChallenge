import type {Course} from './courseList'; 

interface ScheduleModalProps {
  courses: Record<string, Course>;
  selectedCourses: string[];
}

const SchedulePopup = ({ courses, selectedCourses }: ScheduleModalProps) => {
    return (
        <div>
            <h2 className="text-lg font-bold mb-5">Your Course Plan</h2>
            {selectedCourses.length === 0 ? (<p>No courses selected</p>) : (
                selectedCourses.map(id => {
                    const course = courses[id];
                    return (
                        <div key={id} className="mb-3">
                            <h3 className="font-semibold">{course.term} CS {course.number}: {course.title}</h3>
                            <p className="text-gray-600">{course.meets}</p>
                            <hr />
                        </div>
                    );
                }
            ))}
        </div>
    )
};

export default SchedulePopup;