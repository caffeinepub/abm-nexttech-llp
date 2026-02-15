import { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTACT_INFO } from '@/constants/contact';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n${formData.company ? `Company: ${formData.company}\n` : ''}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;

    // Try to open mailto link
    window.location.href = mailtoLink;

    // Also copy message to clipboard as fallback
    const fullMessage = `Name: ${formData.name}\nEmail: ${formData.email}\n${formData.company ? `Company: ${formData.company}\n` : ''}\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(fullMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/20 to-background py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Ready to transform your financial operations? Contact ABM Nexttech LLP to discuss your needs and explore
              how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{CONTACT_INFO.email}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{CONTACT_INFO.phone}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {CONTACT_INFO.address.lines.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < CONTACT_INFO.address.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name (optional)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your needs..."
                        rows={6}
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Message Copied & Email Opened
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {copied && (
                      <p className="text-sm text-muted-foreground text-center">
                        Your message has been copied to clipboard and your email client should open. If it doesn't,
                        please email us directly at {CONTACT_INFO.email}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">We're Here to Help</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're looking to optimize your financial operations, implement new technology, or explore our
              AI-driven reconciliation platform, the ABM Nexttech LLP team is ready to assist.
            </p>
            <p className="text-lg text-muted-foreground">
              We typically respond to inquiries within one business day. For urgent matters, please call us directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
