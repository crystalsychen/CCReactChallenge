import { createFileRoute } from '@tanstack/react-router'
import TermPage from '../components/termPage'
import Banner from '../components/banner'
import { useDataQuery } from '../utilities/firebase'

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

function Index() {
  const [json, isLoading, error] = useDataQuery('/');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const Schedule = json as CourseList;

  return (
    <div>
      <Banner title={Schedule.title} />
      <TermPage courses={Schedule.courses}/>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
})