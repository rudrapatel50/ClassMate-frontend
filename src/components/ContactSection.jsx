import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    // Here you would send the form to your backend or an email service
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto w-full px-4 py-16">
      <h2 className="text-3xl font-extrabold text-center mb-4">Contact Us</h2>
      <p className="text-center text-gray-600 mb-12">
        Have questions or feedback? Fill out the form below and we'll get back to you!
      </p>
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-green-600 text-center py-8">Thank you! We'll be in touch soon.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-2">Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2">Email</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="message" className="mb-2">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection; 