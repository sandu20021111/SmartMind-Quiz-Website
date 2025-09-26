import React, { useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  MessageCircleIcon,
  SendIcon,
  HelpCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { sendContactForm } from "../services/api";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [titleRef, titleInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
  });
  const [infoRef, infoInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });
  const [formRef, formInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      setFormError("");
      await sendContactForm(formData); // ✅ POST to backend
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setFormError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-smartmind-very-light text-gray-800 font-sans leading-relaxed animate-page-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Breadcrumb items={[{ label: "Contact Us" }]} />

        <div
          ref={titleRef}
          className={`mb-10 ${
            titleInView ? "animate-element-pop-up" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-smartmind-dark mb-2">
            Contact Us
          </h1>
          <p className="mt-2 text-gray-700 text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Section */}
          <div
            ref={infoRef}
            className={`lg:col-span-1 ${
              infoInView ? "animate-element-pop-up" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-smartmind-dark mb-6">
                Get in Touch
              </h2>
              <div className="space-y-7">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-smartmind-light shadow-sm">
                    <MapPinIcon className="h-6 w-6 text-smartmind-dark" />
                  </div>
                  <div className="ml-4 text-gray-700">
                    <p className="font-semibold text-lg">Address</p>
                    <p className="mt-1">
                      123 Education Lane, Cinec Campus, Building 4, Malabe
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-smartmind-light shadow-sm">
                    <PhoneIcon className="h-6 w-6 text-smartmind-dark" />
                  </div>
                  <div className="ml-4 text-gray-700">
                    <p className="font-semibold text-lg">Phone</p>
                    <p className="mt-1">(+94) 76 9762216</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-smartmind-light shadow-sm">
                    <MailIcon className="h-6 w-6 text-smartmind-dark" />
                  </div>
                  <div className="ml-4 text-gray-700">
                    <p className="font-semibold text-lg">Email</p>
                    <p className="mt-1">cinec@itquiz.edu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`lg:col-span-2 ${
              formInView ? "animate-element-pop-up" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-smartmind-dark mb-6">
                Send Us a Message
              </h2>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-xl flex flex-col items-center text-center shadow-inner">
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Thank You!
                  </h3>
                  <p className="mt-3 text-lg">
                    Your message has been sent successfully. We'll get back to
                    you as soon as possible.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-6 py-3 bg-smartmind-dark text-white rounded-lg shadow-md hover:bg-smartmind-medium transition-colors duration-300 transform hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 shadow-sm">
                      <div className="flex items-center">
                        <HelpCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{formError}</span>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-smartmind-medium focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-smartmind-medium focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-smartmind-medium focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Please select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="bug">Report a Bug</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-smartmind-medium focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-smartmind-dark hover:bg-smartmind-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartmind-dark transition-colors duration-300 transform hover:scale-105"
                    >
                      <SendIcon className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
