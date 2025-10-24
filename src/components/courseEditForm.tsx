import { useState, useEffect } from 'react';
import type { Course } from './courseList';
import { 
    validateCourseForm, 
    type ValidationErrors,
    type CourseFormData 
} from '../utilities/courseValidation';

interface CourseEditFormProps {
    course: Course;
    onCancel: () => void;
}

const CourseEditForm = ({ course, onCancel }: CourseEditFormProps) => {
    const [title, setTitle] = useState(course.title);
    const [term, setTerm] = useState(course.term);
    const [number, setNumber] = useState(course.number);
    const [meets, setMeets] = useState(course.meets);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Validate form whenever data changes
    useEffect(() => {
        const formData: CourseFormData = { title, term, number, meets };
        const validationErrors = validateCourseForm(formData);
        setErrors(validationErrors);
    }, [title, term, number, meets]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ title: true, term: true, number: true, meets: true });
    };

    const handleFieldBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
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
                            onBlur={() => handleFieldBlur('title')}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                touched.title && errors.title 
                                    ? 'border-red-500 bg-red-50' 
                                    : 'border-gray-300'
                            }`}
                            placeholder="Enter course title"
                        />
                        {touched.title && errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-1">
                            Term
                        </label>
                        <select
                            id="term"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            onBlur={() => handleFieldBlur('term')}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                touched.term && errors.term 
                                    ? 'border-red-500 bg-red-50' 
                                    : 'border-gray-300'
                            }`}
                        >
                            <option value="">Select a term</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                        </select>
                        {touched.term && errors.term && (
                            <p className="mt-1 text-sm text-red-600">{errors.term}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                            Course Number
                        </label>
                        <input
                            type="text"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            onBlur={() => handleFieldBlur('number')}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                touched.number && errors.number 
                                    ? 'border-red-500 bg-red-50' 
                                    : 'border-gray-300'
                            }`}
                            placeholder="e.g., 213 or 213-2"
                        />
                        {touched.number && errors.number && (
                            <p className="mt-1 text-sm text-red-600">{errors.number}</p>
                        )}
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
                            onBlur={() => handleFieldBlur('meets')}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                touched.meets && errors.meets 
                                    ? 'border-red-500 bg-red-50' 
                                    : 'border-gray-300'
                            }`}
                            placeholder="e.g., MWF 10:00-10:50 or TuTh 14:00-15:20"
                        />
                        {touched.meets && errors.meets && (
                            <p className="mt-1 text-sm text-red-600">{errors.meets}</p>
                        )}
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseEditForm;
