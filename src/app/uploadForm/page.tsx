'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUploadCloud } from "react-icons/fi";

const UploadPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("date", formData.date);
      if (file) form.append("image", file);

      const res = await fetch("/api/events", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        setMessage("Event submitted successfully!");
        setShowModal(true);
        setFormData({
          name: "",
          description: "",
          date: "",
        });
        setFile(null);
        setPreviewUrl(null);

        setTimeout(() => {
          setShowModal(false);
          router.push("/events");
        }, 2000);
      } else {
        setMessage("Failed to submit. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
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
          encType="multipart/form-data"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Submit Event</h2>

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-lg font-semibold">
              Event Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Event name"
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
              placeholder="Brief description of the event..."
              rows={4}
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="block mb-2 text-lg font-semibold">
              Event Date
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="image" className="block mb-2 text-lg font-semibold">
              Upload Event Image
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="image"
                className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-blue-500 transition"
              >
                <FiUploadCloud className="text-xl" />
                <span>Select File</span>
              </label>
              <span className="text-sm text-gray-300">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm mb-2 text-gray-300">Preview:</p>
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-blue-500">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
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
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </button>

          {message && (
            <p className="text-center mt-4 text-blue-300 font-semibold">{message}</p>
          )}
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-blue-600 text-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Event Submitted!</h2>
            <p className="text-gray-200 mb-6">
              Redirecting you to the events page...
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