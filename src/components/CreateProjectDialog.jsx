import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const CreateProjectDialog = ({ onCreate }) => {
  const [form, setForm] = useState({ 
    name: '', 
    description: '',
    course: '',
    courseCode: '',
    dueDate: null 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onCreate({
      ...form,
      course: {
        name: form.course,
        code: form.courseCode
      }
    });
    setLoading(false);
    setForm({ name: '', description: '', course: '', courseCode: '', dueDate: null });
    document.activeElement?.blur(); // closes dialog
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <PlusIcon className="h-5 w-5" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1"
              placeholder="Describe your project"
              rows={3}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="course"
                  name="course"
                  value={form.course}
                  className="mt-1"
                  placeholder="Enter course name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="courseCode"
                  name="courseCode"
                  value={form.courseCode}
                  className="mt-1"
                  placeholder="Enter course code"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <DatePicker
                date={form.dueDate}
                setDate={(date) => setForm(f => ({ ...f, dueDate: date }))}
                className="mt-1"
              />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog; 