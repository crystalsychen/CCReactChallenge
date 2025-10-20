import { useState } from 'react';
import type { Course } from './courseList';

interface CourseEditFormProps {
    course: Course;
    onCancel: () => void;
}

const CourseEditForm = ({ course, onCancel }: CourseEditFormProps) => {
    const [title, setTitle] = useState(course.title);
    const [meets, setMeets] = useState(course.meets);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Do nothing - as specified in requirements
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
             onClick={onCancel}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl"
                 onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">
                    Edit Course: {course.term} CS {course.number}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter course title"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="meets" className="block text-sm font-medium text-gray-700 mb-1">
                            Meeting Times
                        </label>
                        <input
                            type="text"
                            id="meets"
                            value={meets}
                            onChange={(e) => setMeets(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., MWF 10:00-10:50 or TuTh 14:00-15:20"
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseEditForm;