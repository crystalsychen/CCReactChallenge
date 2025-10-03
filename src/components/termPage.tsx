import { useState } from "react";

import CourseList from './courseList';
import TermSelector from "./termSelector";
import type {Course} from './courseList'; 

interface TermPageProps {
    courses: Record<string, Course>;
}

const TermPage = (props: TermPageProps) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const terms = [...new Set(Object.values(props.courses).map((course) => course.term))];
    const filteredCourses = Object.fromEntries(
        Object.entries(props.courses).filter(([, course]) => course.term === selectedTerm)
    );

    return (
        <div>
            <TermSelector options={terms} defaultSelected={selectedTerm} setSelected={setSelectedTerm} />
            <CourseList courses={filteredCourses} />
        </div>
        );

}
export default TermPage;


