'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UploadPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    projectName: "",
    techStack: "",
    description: "",
    github: "",
    deployed: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.projectName,
          techStack: formData.techStack,
          description: formData.description,
          githubLink: formData.github,
          deployedLink: formData.deployed,
        }),
      });

      if (res.ok) {
        setMessage(" Project submitted successfully!");
        setShowModal(true);
        setFormData({
          projectName: "",
          techStack: "",
          description: "",
          github: "",
          deployed: "",
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          setShowModal(false);
          router.push("/projects");
        }, 2000);
      } else {
        setMessage(" Failed to submit. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage(" Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://res.cloudinary.com/dbnnd43kl/image/upload/v1760877041/Lucid_Origin_A_curious_cartoon_college_student_peeks_out_from__0_hsfh3l.jpg"
          alt="ml4e"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-[#0A0A23] via-[#1B1B3A] to-[#3C4EC0]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl text-white p-6 sm:p-8 rounded-xl border border-blue-500 shadow-[0_0_15px_2px_rgba(100,149,237,0.4)] backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Submit Your Project</h2>

          <div className="mb-6">
            <label htmlFor="projectName" className="block mb-2 text-lg font-semibold">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              required
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project name"
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="techStack" className="block mb-2 text-lg font-semibold">
              Tech Stack
            </label>
            <input
              id="techStack"
              type="text"
              required
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, FASTAPI, etc."
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of your project..."
              rows={4}
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="github" className="block mb-2 text-lg font-semibold">
              GitHub Repository Link
            </label>
            <input
              id="github"
              type="url"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/yourproject"
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="deployed" className="block mb-2 text-lg font-semibold">
              Deployed Project Link
            </label>
            <input
              id="deployed"
              type="url"
              value={formData.deployed}
              onChange={handleChange}
              placeholder="https://yourproject.vercel.app"
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 cursor-pointer rounded font-bold transition ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-white text-[#0A0A23] hover:bg-blue-400 hover:text-white"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </button>

          {message && (
            <p className="text-center mt-4 text-blue-300 font-semibold">{message}</p>
          )}
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-blue-600 text-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4"> Project Submitted!</h2>
            <p className="text-gray-200 mb-6">
              Redirecting you to the projects page...
            </p>
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
