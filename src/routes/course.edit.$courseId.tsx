import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useJsonQuery } from '../utilities/fetch'
import CourseForm from '../components/courseEditForm'

const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

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
  const [json, isLoading, error] = useJsonQuery(url);

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
      <CourseForm course={course} onCancel={handleCancel} />
    </div>
  );
}

export const Route = createFileRoute('/course/edit/$courseId')({
  component: CourseEdit,
})