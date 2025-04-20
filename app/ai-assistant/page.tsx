// app/ai-assistant/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  FileText,
  Users,
  MessageSquare,
  Mail,
  Send,
  Upload,
  RefreshCw,
  Lightbulb,
  AlertCircle,
  Copy,
  Download
} from 'lucide-react'
import { JSX } from 'react/jsx-runtime';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  examplePrompt: string;
}

const tools: Tool[] = [
  { 
    id: 'resume', 
    name: 'Resume Analysis', 
    icon: <FileText size={20} />,
    description: 'Extract key skills and experience from resumes',
    examplePrompt: 'Analyze this resume for frontend developer positions with a focus on React experience'
  },
  { 
    id: 'matching', 
    name: 'Candidate Matching', 
    icon: <Users size={20} />,
    description: 'Find the best candidates for a job opening',
    examplePrompt: 'Find candidates with React, TypeScript and Node.js experience for a Senior Developer role'
  },
  { 
    id: 'questions', 
    name: 'Interview Questions', 
    icon: <MessageSquare size={20} />,
    description: 'Generate tailored interview questions',
    examplePrompt: 'Generate 5 technical questions for a UX Designer position with 3+ years of experience'
  },
  { 
    id: 'email', 
    name: 'Email Templates', 
    icon: <Mail size={20} />,
    description: 'Create personalized communication templates',
    examplePrompt: 'Draft a rejection email that is professional but encouraging to apply again in the future'
  },
]

export default function AIAssistantPage() {
  const [activeTool, setActiveTool] = useState(tools[0])
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleRun = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      if (activeTool.id === 'resume') {
        setResponse(`# Resume Analysis Results

## Candidate Overview
The candidate demonstrates strong technical expertise in frontend development with a focus on modern JavaScript frameworks.

## Key Skills
- **Technical Skills**: React.js (4 years), TypeScript (3 years), Node.js (2 years), AWS
- **Experience Level**: 5+ years in software development
- **Education**: BSc in Computer Science from Stanford University
- **Languages**: English (Native), Spanish (Intermediate)

## Strengths
- Extensive experience with React ecosystem including Redux, React Router, and Next.js
- Strong portfolio of responsive and accessible web applications
- History of mentoring junior developers
- Experience with CI/CD pipelines and automated testing

## Areas for Development
- Limited experience with backend technologies
- Could benefit from more experience with large-scale applications
- No formal project management experience

## Recommendation
This candidate appears to be a strong match for frontend developer roles requiring React expertise. I recommend advancing to an initial technical interview.`);
      } else if (activeTool.id === 'matching') {
        setResponse(`# Candidate Matching Results

Based on your requirements for a Senior Developer with React, TypeScript and Node.js experience, I've identified the following top candidates:

## Top Matches

1. **Alex Johnson** (Match Score: 92%)
   - 6 years React experience, 4 years TypeScript, 5 years Node.js
   - Previously led development teams at TechCorp and InnoSystems
   - Available for interview immediately

2. **Sarah Chen** (Match Score: 89%)
   - 5 years React experience, 5 years TypeScript, 3 years Node.js
   - Full-stack developer with AWS certification
   - Currently in final interview stage with another company

3. **Michael Rodriguez** (Match Score: 85%)
   - 7 years React experience, 3 years TypeScript, 4 years Node.js
   - Strong background in scaling applications and mentoring
   - Requires 4 weeks notice period

## Recommended Next Steps
- Schedule technical interviews with Alex and Sarah within the next week
- Prepare specialized questions on system architecture and team leadership
- Consider expediting the process for Sarah given her current interview status with another company`);
      } else if (activeTool.id === 'questions') {
        setResponse(`# Interview Questions for UX Designer (3+ years experience)

## Technical Questions

1. **Process & Methodology**
   - "Walk me through your design process from initial research to final handoff. What steps do you consider essential, and which ones can you adapt based on project constraints?"
   - *Look for*: Structured approach, research emphasis, adaptability, collaboration with developers

2. **Portfolio Deep Dive**
   - "Choose one project from your portfolio that faced significant user experience challenges. How did you identify the problems, what solutions did you consider, and how did you measure the success of your implementation?"
   - *Look for*: Problem identification skills, multiple solution exploration, metrics-based evaluation

3. **Design Systems**
   - "Describe your experience with creating or contributing to design systems. How do you balance consistency across products while allowing for product-specific variations?"
   - *Look for*: Component thinking, documentation skills, understanding of design system governance

4. **Research & Testing**
   - "What user research methods have you found most valuable for informing your design decisions? Provide a specific example where research significantly changed your initial design direction."
   - *Look for*: Familiarity with multiple research methods, willingness to adapt based on findings

5. **Accessibility & Inclusive Design**
   - "How do you incorporate accessibility considerations into your design process? Share an example of how you modified a design to improve accessibility while maintaining the overall user experience."
   - *Look for*: WCAG knowledge, empathy for diverse users, practical implementation experience

## Follow-up Areas to Explore

- Collaboration with developers and product managers
- Experience with design tool ecosystems (Figma, Adobe XD, etc.)
- Approach to user testing and iteration
- Examples of measurable impact from their design work`);
      } else if (activeTool.id === 'email') {
        setResponse(`# Rejection Email Template

## Subject: Update on Your Application with RecruitmentPlus

Dear [Candidate Name],

Thank you for your interest in the [Position] role at [Company Name] and for taking the time to participate in our selection process.

After careful consideration of all applications, we have decided to move forward with candidates whose qualifications more closely align with our current needs for this specific position. While we were impressed with your background in [specific strength from their application], the competition for this role was exceptionally strong.

We genuinely appreciate your interest in joining our team and would like to encourage you to apply for future positions that match your qualifications. We will keep your application on file for 12 months and will reach out if we identify a role that aligns with your experience and skills.

Please don't hesitate to reapply for other positions that interest you on our careers page. We regularly post new opportunities across various departments.

Thank you again for your interest in [Company Name]. We wish you success in your job search and professional endeavors.

Best regards,

[Your Name]
[Your Position]
[Company Name]
[Contact Information]`);
      }
      
      setIsLoading(false);
      setUploadedFile(null);
    }, 2000);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
  };

  return (
    <div className="space-y-8">
      {/* Page Title and Description */}
      <div>
        <h2 className="text-2xl font-semibold text-[#80BDCA]">AI Assistant</h2>
        <p className="text-neutral-400 mt-1">Leverage AI to streamline your recruitment process</p>
      </div>

      {/* Tool selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map(tool => (
          <Card 
            key={tool.id}
            onClick={() => {
              setActiveTool(tool);
              setResponse(null);
            }}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeTool.id === tool.id
                ? 'bg-neutral-800 border-[#1D4E5F] ring-1 ring-[#1D4E5F]/20'
                : 'bg-neutral-800 border-neutral-700 hover:border-[#1D4E5F]/30'
            }`}
          >
            <div className="p-5">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${
                activeTool.id === tool.id 
                  ? 'bg-[#1D4E5F]/20 text-[#80BDCA]' 
                  : 'bg-neutral-700/50 text-neutral-400'
              }`}>
                {tool.icon}
              </div>
              <h3 className={`font-medium ${
                activeTool.id === tool.id ? 'text-white' : 'text-neutral-300'
              }`}>
                {tool.name}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{tool.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Prompt input */}
      <Card className="bg-neutral-800 border border-neutral-700 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-lg text-white flex items-center">
              {activeTool.icon && <span className="mr-2 text-[#80BDCA]">{activeTool.icon}</span>}
              {activeTool.name}
            </h3>
            
            <div className="flex items-center text-sm">
              <Lightbulb size={16} className="mr-1.5 text-amber-400" />
              <span className="text-neutral-400 hidden sm:inline">Example:</span>
              <button 
                className="text-[#80BDCA] ml-1.5 hover:text-[#51B3A2]"
                onClick={() => setPrompt(activeTool.examplePrompt)}
              >
                Use example prompt
              </button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            {/* File upload for resume analysis */}
            {activeTool.id === 'resume' && (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-300">Upload Resume (PDF, DOCX)</label>
                  {uploadedFile && (
                    <span className="text-xs text-[#51B3A2]">
                      {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Upload your resume file"
                  />
                  <div className="w-full border-2 border-dashed border-neutral-700 rounded-lg p-4 flex items-center justify-center hover:border-[#1D4E5F]/50 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <Upload size={24} className="text-neutral-500 mb-2" />
                      <p className="text-sm text-neutral-400">
                        Drag and drop a file here, or click to browse
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Supports PDF, DOCX (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Text input area */}
            <div>
              <textarea
                rows={4}
                placeholder={`Enter your prompt for ${activeTool.name}...`}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]/50 focus:border-[#1D4E5F] placeholder-neutral-500"
              />
            </div>
            
            {/* Action row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center text-neutral-500">
                <AlertCircle size={16} className="mr-1.5" />
                <span className="text-xs">Responses are AI-generated and may require review</span>
              </div>
              
              <button
                onClick={handleRun}
                disabled={isLoading || !prompt.trim()}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition ${
                  isLoading || !prompt.trim() 
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' 
                    : 'bg-[#1D4E5F] text-white hover:bg-[#123040]'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 animate-spin" size={16} /> Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={16} /> Run
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Response output */}
      {response && (
        <Card className="bg-neutral-800 border-l-4 border-l-[#1D4E5F] border-t border-r border-b border-neutral-700 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#80BDCA]">AI Response</h3>
              <div className="flex items-center space-x-2">
                <button title="Copy response" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded">
                  <Copy size={16} />
                </button>
                <button title="Copy response" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded">
                  <Download size={16} />
                </button>
              </div>
            </div>
            
            <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-4">
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-neutral-200" dangerouslySetInnerHTML={{ __html: response.replace(/^#+ (.*$)/gm, '<h3 class="text-[#80BDCA] font-medium text-lg">$1</h3>').replace(/\n\n/g, '<br /><br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs text-neutral-500">
                Generated in 1.2 seconds | API Version 1.0
              </div>
              
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-3 py-1.5 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-700 text-sm">
                  Regenerate
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-[#1D4E5F] text-[#80BDCA] rounded hover:bg-[#1D4E5F]/10 text-sm">
                  Save to Templates
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}