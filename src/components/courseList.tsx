export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}
export interface CourseProps {
    courses: Record<string, Course>
  }
const CourseList = ({courses}:CourseProps) => {
    return (
        <div className="grid gap-3 p-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-auto">
            {Object.entries(courses).map(([id, course]) => (
                <div key={id} className="border-2 border-gray-200 h-45 flex flex-col justify-between rounded-2xl bg-white p-4 overflow-auto">
                    <div>
                        <h2 className="font-semibold">{course.term} CS {course.number}</h2>
                        <p>{course.title}</p>
                    </div>
                    <div className="text-gray-400">
                        <hr />
                        <p>{course.meets}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseList;