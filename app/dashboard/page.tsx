// app/dashboard/page.tsx
"use client";

import { Card } from '@/components/ui/card';
import {
  UserCheck,
  Clock,
  Briefcase,
  TrendingUp,
  TrendingDown,
  //CalendarClock,
  //CircleUser,
  ChevronRight,
  FolderPlus,
  Folders,
  Users,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { motion, Variants, useMotionValue, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';
import { useOffice } from '@/contexts/OfficeContext';

// Define reusable animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    }
  },
  hover: { 
    y: -8,
    boxShadow: "0 10px 25px -5px rgba(29, 78, 95, 0.3)",
    transition: { 
      duration: 0.3, 
      ease: "easeOut"
    }
  }
};

// KpiCard props interface
interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  suffix?: string;
  icon: React.ReactNode;
  bgColor?: string;
  iconBgColor?: string;
  iconColor?: string;
  compareText?: string;
  delay?: number;
}

// Reusable KPI Card Component
function KpiCard({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  suffix = '', 
  icon, 
  bgColor = "[#1D4E5F]/10", 
  iconBgColor = "[#1D4E5F]/20", 
  iconColor = "[#80BDCA]", 
  compareText = "From last month",
  delay = 0
}: KpiCardProps) {
  return (
    <motion.div
      className="bg-neutral-800 overflow-hidden border-none shadow-md relative rounded-lg"
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <motion.div 
        className={`absolute top-0 right-0 h-24 w-24 bg-${bgColor} rounded-full -mt-8 -mr-8`}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <div className="px-6 py-5 flex justify-between items-center relative">
        <div>
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-2xl font-bold text-white">{value}{suffix ? <span className="text-base ml-1 font-medium">{suffix}</span> : ''}</p>
            {change && (
              <span className={`text-xs font-medium ${isPositive ? 'text-[#51B3A2]' : 'text-red-400'} pb-1 flex items-center`}>
                {isPositive ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />} {change}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-1">{compareText}</p>
        </div>
        <motion.div 
          className={`h-12 w-12 rounded-full bg-${iconBgColor} flex items-center justify-center text-${iconColor}`}
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -5, 5, -5, 0],
            transition: { 
              scale: { duration: 0.2 },
              rotate: { duration: 0.5, ease: "easeInOut" }
            }
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

// If you don't need this component, you can remove it entirely
// If you want to keep it for future use, you can add this comment to suppress the warning
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AnimatedProgressBar({ 
  progress, 
  color = "[#37A794]", 
  height = "h-1.5", 
  delay = 0.5 
}: {
  progress: number;
  color?: string;
  height?: string;
  delay?: number;
}) {
  const progressValue = useMotionValue(0);
  const width = useTransform(progressValue, value => `${value}%`);
  
  useEffect(() => {
    // Animate progress value from 0 to target
    const animation = setTimeout(() => {
      progressValue.set(progress);
    }, delay * 1000);
    
    return () => clearTimeout(animation);
  }, [progress, progressValue, delay]);
  
  return (
    <div className={`${height} bg-neutral-700 rounded-full overflow-hidden`}>
      <motion.div 
        className={`h-full bg-${color}`}
        style={{ width }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut", 
          delay 
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  // Refs for scroll animation triggers
  const pipelineRef = useRef(null);
  const activitiesRef = useRef(null);
  
  // Track if sections are in view
  const isPipelineInView = useInView(pipelineRef, { once: true, amount: 0.3 });
  const isActivitiesInView = useInView(activitiesRef, { once: true, amount: 0.3 });

  const { currentOffice, userAccessLevel } = useOffice();

  // Filter KPI data by office
  const getOfficeFilteredData = useCallback(() => {
    // This is where you'd normally fetch data from an API with the office filter
    // For now we'll simulate different data for different offices
    
    // Sample multipliers for different offices
    const officeMultipliers: Record<string, number> = {
      '1': 1,    // Montreal (base numbers)
      '2': 1.2,  // Dubai (20% higher)
      '3': 0.8   // Istanbul (20% lower)
    };
    
    const multiplier = officeMultipliers[currentOffice.id] || 1;
    
    // Adjust KPI numbers based on selected office
    return {
      openPositions: Math.round(24 * multiplier),
      positionsChange: '+5%',
      placements: Math.round(76 * multiplier),
      placementsChange: '+18%',
      timeToHire: Math.round(32 * (1/multiplier)),  // Inverse relationship for time metrics
      timeToHireChange: 'Better',
      activeRecruitments: Math.round(18 * multiplier)
    };
  }, [currentOffice.id]);

  const dashboardData = getOfficeFilteredData();

  // Mock data for pipeline stages
  const pipelineStages = [
    { name: 'Applied', count: 45, color: 'bg-[#1D4E5F]' },
    { name: 'Screening', count: 28, color: 'bg-[#2A6274]' },
    { name: 'Interview', count: 16, color: 'bg-[#37A794]' },
    { name: 'Offer', count: 8, color: 'bg-[#51B3A2]' },
    { name: 'Hired', count: 4, color: 'bg-green-500' },
  ];

  // Mock data for upcoming activities
  const upcomingActivities = [
    {
      id: 1,
      type: 'Interview',
      candidate: 'Emma Thompson',
      position: 'Senior Developer',
      company: 'TechCorp',
      time: '10:00 AM',
      date: 'Today'
    },
    {
      id: 2,
      type: 'Follow-up',
      candidate: 'Michael Rodriguez',
      position: 'Product Manager',
      company: 'Innovate Inc.',
      time: '2:30 PM',
      date: 'Today'
    },
    {
      id: 3,
      type: 'Screening',
      candidate: 'Sarah Chen',
      position: 'UX Designer',
      company: 'DesignHub',
      time: '9:15 AM',
      date: 'Tomorrow'
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome section with date and office indicator */}
      <div className="flex flex-wrap items-center justify-between">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold text-white">
            Welcome back, John
          </h1>
          <p className="text-neutral-400">
            April 20, 2025 · {currentOffice.city} Office
          </p>
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Open Positions"
          value={dashboardData.openPositions.toString()}
          change={dashboardData.positionsChange}
          isPositive={true}
          icon={<Briefcase size={24} />}
          bgColor="[#37A794]/10"
          iconBgColor="[#37A794]/20"
          iconColor="[#51B3A2]"
        />
        
        <KpiCard
          title="Placements"
          value={dashboardData.placements.toString()}
          change={dashboardData.placementsChange}
          isPositive={true}
          icon={<UserCheck size={24} />}
        />
        
        <KpiCard
          title="Avg. Time to Hire"
          value={dashboardData.timeToHire.toString()}
          suffix="days"
          change={dashboardData.timeToHireChange}
          isPositive={true}
          icon={<Clock size={24} />}
          bgColor="[#37A794]/10"
          iconBgColor="[#37A794]/20"
          iconColor="[#51B3A2]"
          compareText="Industry avg: 36 days"
        />

        <KpiCard
          title="Active Recruitments"
          value={dashboardData.activeRecruitments.toString()}
          icon={<Users size={24} />}
        />
      </div>
      
      {/* Recruitment pipeline and Upcoming Activities with Project buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline visualization */}
        <motion.div 
          className="lg:col-span-2"
          ref={pipelineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isPipelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="bg-neutral-800 p-6 border-none shadow-md rounded-lg"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(29, 78, 95, 0.2)", 
              translateY: -5 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h3 
                className="font-semibold text-[#80BDCA] text-lg flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.3 
                  }}
                >
                  Recruitment Pipeline
                </motion.span>
              </motion.h3>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/analytics" className="text-sm text-[#80BDCA] hover:text-white flex items-center group transition-colors duration-300">
                  View Details <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              {/* Pipeline bar */}
              <div className="h-8 flex rounded-lg overflow-hidden">
                {pipelineStages.map((stage, index) => (
                  <motion.div 
                    key={stage.name} 
                    className={`${stage.color} ${index === 0 ? 'rounded-l-lg' : ''} ${index === pipelineStages.length - 1 ? 'rounded-r-lg' : ''}`} 
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.count / pipelineStages.reduce((sum, s) => sum + s.count, 0) * 100}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.5 + index * 0.15,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      filter: "brightness(1.15)", 
                      transition: { duration: 0.2 } 
                    }}
                  />
                ))}
              </div>
              
              {/* Pipeline legend */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {pipelineStages.map((stage, index) => (
                  <motion.div 
                    key={stage.name} 
                    className="flex flex-col group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.7 + index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className={`h-3 w-3 rounded-full ${stage.color} mr-2`}
                        whileHover={{ 
                          scale: 1.25, 
                          transition: { duration: 0.2, type: "spring" } 
                        }}
                      />
                      <span className="text-sm text-neutral-300 font-medium">{stage.name}</span>
                    </div>
                    <motion.p 
                      className="text-lg font-bold text-white ml-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      {stage.count}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Project Action Cards - Now under the Recruitment Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isPipelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <Link href="/projects/create">
                <Card className="bg-neutral-800 border-none shadow-md h-full group">
                  <div className="p-5 flex flex-col items-center text-center">
                    <motion.div 
                      className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA] group-hover:bg-[#1D4E5F]/30 transition-all mb-3"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <FolderPlus size={24} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#80BDCA] transition-colors duration-300">Create New Project</h3>
                    <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Define roles and requirements</p>
                  </div>
                </Card>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isPipelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.9,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <Link href="/projects">
                <Card className="bg-neutral-800 border-none shadow-md h-full group">
                  <div className="p-5 flex flex-col items-center text-center">
                    <motion.div 
                      className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2] group-hover:bg-[#37A794]/30 transition-all mb-3"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Folders size={24} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#51B3A2] transition-colors duration-300">View All Projects</h3>
                    <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Manage recruitment campaigns</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Upcoming activities */}
        <motion.div 
          ref={activitiesRef}
          initial={{ opacity: 0, x: 30 }}
          animate={isActivitiesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="bg-neutral-800 p-6 border-none shadow-md h-full rounded-lg"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(29, 78, 95, 0.2)", 
              translateY: -5 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h3 
                className="font-semibold text-[#80BDCA] text-lg flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>Upcoming Activities</span>
              </motion.h3>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/calendar" className="text-sm text-[#80BDCA] hover:text-white flex items-center group transition-colors duration-300">
                  View Calendar <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              {upcomingActivities.map((activity, index) => (
                <motion.div 
                  key={activity.id} 
                  className="p-3 bg-neutral-700 rounded-lg border border-neutral-600 hover:border-[#1D4E5F]/40 transition-all duration-300 hover:bg-neutral-700/80 hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActivitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 15px -5px rgba(0,0,0,0.2)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between">
                    <motion.span 
                      className="text-xs font-semibold px-2 py-1 rounded bg-[#1D4E5F]/20 text-[#80BDCA] hover:bg-[#1D4E5F]/30 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      {activity.type}
                    </motion.span>
                    <span className="text-xs text-neutral-400">{activity.time}, {activity.date}</span>
                  </div>
                  <p className="font-medium text-white mt-2">{activity.candidate}</p>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center">
                    <Briefcase size={12} className="mr-1" /> 
                    {activity.position} at {activity.company}
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isActivitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + upcomingActivities.length * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/calendar" className="inline-flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-[#80BDCA] bg-[#1D4E5F]/20 hover:bg-[#1D4E5F]/30 rounded-lg transition-all duration-300 hover:shadow-md group">
                  View All Activities
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={14} className="ml-1" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Office badge on charts for Super Admin */}
      {userAccessLevel === 'superAdmin' && (
        <div className="absolute top-6 right-6 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1D4E5F]/20 text-[#80BDCA]">
            <Building size={14} className="mr-1" />
            {currentOffice.city}
          </span>
        </div>
      )}
    </motion.div>
  );
}