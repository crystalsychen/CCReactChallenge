import { createFileRoute, useNavigate } from '@tanstack/react-router'
import CourseEditForm from '../components/courseEditForm'
import { useDataQuery } from '../utilities/firebase';


interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseList {
  title: string;
  courses: Record<string, Course>;
}

function CourseEdit() {
  const { courseId } = Route.useParams()
  const navigate = useNavigate()
  const [json, isLoading, error] = useDataQuery('/');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!json) return null;

  const schedule = json as CourseList;
  const course = schedule.courses[courseId];

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleCancel = () => {
    navigate({ to: '/' });
  };

  return (
    <div>
      <CourseEditForm course={course} courseId={course.number} onCancel={handleCancel} />
    </div>
  );
}

export const Route = createFileRoute('/course/edit/$courseId')({
  component: CourseEdit,
})