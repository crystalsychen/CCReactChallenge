import { useState } from "react";

import CourseList from './courseList';
import TermSelector from "./termSelector";
import type {Course} from './courseList'; 
import Modal from "./scheduleModal";
import SchedulePopup from "./schedulePopup";

interface TermPageProps {
    courses: Record<string, Course>;
}


const TermPage = (props: TermPageProps) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const terms = [...new Set(Object.values(props.courses).map((course) => course.term))];
    const [modalOpen, setModalOpen] = useState(false);
    const filteredCourses = Object.fromEntries(
        Object.entries(props.courses).filter(([, course]) => course.term === selectedTerm)
    );

    return (
        <div>
            <div className = "relative flex items-center justify-end mt-4 px-6">
                <div className="absolute left-1/2 -translate-x-1/2">
                    <TermSelector options={terms} defaultSelected={selectedTerm} setSelected={setSelectedTerm} />
                </div>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
                    onClick={() => setModalOpen(true)}
                    >
                    Course Plan
                </button>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <SchedulePopup courses={props.courses} selectedCourses={selectedCourses} />
            </Modal>
            <CourseList courses={filteredCourses} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} allCourses={props.courses}/>
        </div>
        );

}
export default TermPage;


