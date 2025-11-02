'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiPlus } from "react-icons/fi";

const AchievementForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    achievementName: "",
    dateOfEvent: "",
    github: "",
    deployed: "",
  });

  const [members, setMembers] = useState([{ name: "", linkedin: "" }]);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setCertificate(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };


  const handleMemberChange = (index: number, field: "name" | "linkedin", value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length < 6) {
      setMembers([...members, { name: "", linkedin: "" }]);
    }
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("achievementName", formData.achievementName);
      form.append("dateOfEvent", formData.dateOfEvent);
      form.append("githubLink", formData.github);
      form.append("deployedLink", formData.deployed);
      form.append("members", JSON.stringify(members));
      if (certificate) form.append("certificate", certificate);

      const res = await fetch("/api/achievements", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        setMessage("Achievement submitted successfully!");
        setShowModal(true);
        setFormData({
          achievementName: "",
          dateOfEvent: "",
          github: "",
          deployed: "",
        });
        setMembers([{ name: "", linkedin: "" }]);
        setCertificate(null);
        setPreviewUrl(null);

        setTimeout(() => {
          setShowModal(false);
          router.push("/achievements");
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
          src="https://res.cloudinary.com/dbnnd43kl/image/upload/v1761625676/Screenshot_2025-10-28_095648_frjezi.png"
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
          <h2 className="text-3xl font-bold mb-8 text-center">Submit Your Achievement</h2>

    
          <div className="mb-6">
            <label htmlFor="achievementName" className="block mb-2 text-lg font-semibold">
              Name of Achievement
            </label>
            <input
              id="achievementName"
              type="text"
              required
              value={formData.achievementName}
              onChange={handleChange}
              placeholder="e.g. Hackathon Winner, Best Innovation Award"
              className="w-full p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

       
          <div className="mb-6">
            <label htmlFor="dateOfEvent" className="block mb-2 text-lg font-semibold">
              Date of Event
            </label>
            <input
              id="dateOfEvent"
              type="date"
              required
              value={formData.dateOfEvent}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

         
          <div className="mb-6">
            <label htmlFor="github" className="block mb-2 text-lg font-semibold">
              Project GitHub Link (optional)
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
            <label className="block mb-3 text-lg font-semibold">Members</label>
            {members.map((member, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="text"
                  placeholder={`Member ${index + 1} Name`}
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                  className="flex-1 p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={member.linkedin}
                  onChange={(e) => handleMemberChange(index, "linkedin", e.target.value)}
                  className="flex-1 p-3 rounded bg-transparent border border-white placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            {members.length < 6 && (
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg hover:bg-blue-500 transition"
              >
                <FiPlus /> Add Member
              </button>
            )}
          </div>

 
          <div className="mb-8">
            <label htmlFor="certificate" className="block mb-2 text-lg font-semibold">
              Upload Certificate
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="certificate"
                className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-blue-500 transition"
              >
                <FiUploadCloud className="text-xl" />
                <span>Select File</span>
              </label>
              <span className="text-sm text-gray-300">
                {certificate ? certificate.name : "No file chosen"}
              </span>
            </div>
            <input
              id="certificate"
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
                    alt="Certificate Preview"
                    fill
                    style={{ objectFit: "cover" }}
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
            {isSubmitting ? "Submitting..." : "Submit Achievement"}
          </button>

          {message && (
            <p className="text-center mt-4 text-blue-300 font-semibold">{message}</p>
          )}
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-blue-600 text-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Achievement Submitted!</h2>
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

export default AchievementForm;
