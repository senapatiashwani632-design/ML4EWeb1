"use client";
import { motion } from "framer-motion";
import TeamCard from "@/app/components/TeamCard"; // Adjust path as needed
import { useEffect, useState } from "react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  githubLink: string;
  linkedinLink: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/team', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch team members');
        }
        
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setTeamMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    getTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Talented individuals working together to create amazing experiences
          </p>
        </motion.div>

        {/* Team Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-lg">Loading team members...</p>
            </div>
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                <TeamCard
                  member={{
                    name: member.name,
                    avatar: member.imageUrl,
                    email: member.githubLink, // Using githubLink as email placeholder
                    linkedin: member.linkedinLink,
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-8 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-lg mb-2">No team members found</p>
              <p className="text-gray-500 text-sm">Add team members to see them here</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}