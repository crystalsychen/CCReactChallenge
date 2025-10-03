import Banner from './components/banner.tsx'
import TermPage from './components/termPage.tsx'
import { useJsonQuery } from './utilities/fetch.ts';

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

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

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

export default App
