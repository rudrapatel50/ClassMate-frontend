import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: null
  });

  useEffect(() => {
    fetchProjectDetails();
    fetchTasks();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      toast.error('Failed to fetch project details');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/v1/tasks/project/${projectId}`);
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/tasks', {
        ...newTask,
        projectId
      });
      setTasks(prev => [...prev, response.data]);
      setShowCreateTaskModal(false);
      setNewTask({ title: '', description: '', dueDate: null });
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button
          onClick={() => setShowCreateTaskModal(true)}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No tasks created yet.</p>
          <button
            onClick={() => setShowCreateTaskModal(true)}
            className="btn btn-primary"
          >
            Create Your First Task
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  type="text"
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                  rows="3"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <DatePicker
                  date={newTask.dueDate}
                  setDate={(date) => setNewTask(prev => ({ ...prev, dueDate: date }))}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateTaskModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails; 