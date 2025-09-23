type Course = {
    term: string,
    number: string, 
    meets: string,
    title: string
}
type CourseProps = {
    courses : Course[]
}
const CourseList = ({courses}:CourseProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Course List</h2>
            <ul className="list-disc pl-5">
                {courses.map((course, index) => (
                    <li key={index} className="mb-2">
                        <span className="font-semibold">{course.term} {course.number}:</span> {course.title} <span className="text-sm text-gray-600">({course.meets})</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseList;