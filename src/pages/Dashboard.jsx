import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import CreateProjectDialog from '@/components/CreateProjectDialog';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/v1/projects/my-projects');
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (form) => {
    try {
      const response = await axios.post('/api/v1/projects', form);
      setProjects(prev => [...prev, response.data]);
      toast.success('Project created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  };

  const displayName = user?.username || user?.email || "User";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4">
      <h2 className="text-3xl font-semibold mb-10">
        Welcome, {displayName}
      </h2>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <CreateProjectDialog onCreate={handleCreateProject} />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't created any projects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600">{project.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                {project.members?.length || 0} members
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 