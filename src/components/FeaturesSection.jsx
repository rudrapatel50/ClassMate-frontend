import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HomeIcon, ListTodoIcon, UsersIcon } from 'lucide-react';

const features = [
  {
    icon: <HomeIcon className="h-6 w-6 text-primary-600" />,
    title: 'Project Management',
    desc: 'Efficiently manage your class projects with intuitive tools for planning, organizing, and tracking progress. Stay on top of deadlines and ensure successful project completion.'
  },
  {
    icon: <ListTodoIcon className="h-6 w-6 text-primary-600" />,
    title: 'Task Tracking',
    desc: 'Keep track of your individual and team tasks with a clear and organized system. Prioritize tasks, set reminders, and monitor progress to stay productive and focused.'
  },
  {
    icon: <UsersIcon className="h-6 w-6 text-primary-600" />,
    title: 'Team Collaboration',
    desc: 'Enhance teamwork and communication with built-in collaboration features. Share project updates, discuss ideas, and work together seamlessly to achieve common goals.'
  },
];

const FeaturesSection = () => (
  <section id="features" className="w-full max-w-5xl mx-auto mt-16 px-4">
    <h2 className="text-xl font-semibold mb-10">Key Features</h2>
    <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Empowering Students and Educators</h3>
    <p className="text-gray-700 mb-8 max-w-2xl">
      ClassMate provides a comprehensive suite of tools designed to streamline project management, task tracking, and team collaboration, making academic life more organized and productive. With a user-friendly interface and powerful features, ClassMate helps students and educators achieve their goals efficiently.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, idx) => (
        <Card key={idx} className="h-full">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            {feature.icon}
            <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default FeaturesSection; 