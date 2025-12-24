import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.scss'
import { useData } from '/src/providers/DataProvider.jsx'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hi! I'm Tusher's AI assistant. I know everything about his frontend engineering expertise with extensive backend knowledge, technical skills, projects, education, certifications, and more. What would you like to know?" }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [voiceEnabled, setVoiceEnabled] = useState(true)
    const messagesEndRef = useRef(null)
    const { getSections } = useData()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const speakText = (text) => {
        if (!voiceEnabled || !('speechSynthesis' in window)) return
        
        // Stop any ongoing speech
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = 0.8
        
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)
        
        window.speechSynthesis.speak(utterance)
    }

    const stopSpeaking = () => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
    }

    const getPortfolioData = () => {
        const sections = getSections()
        let data = "About Tusher:\n"
        
        sections.forEach(section => {
            if (section.content?.articles) {
                section.content.articles.forEach(article => {
                    if (article.items) {
                        article.items.forEach(item => {
                            if (item.locales?.en?.text) {
                                data += item.locales.en.text.replace(/<[^>]*>/g, '') + "\n"
                            }
                            if (item.locales?.en?.title) {
                                data += item.locales.en.title + "\n"
                            }
                            if (item.value) {
                                data += item.value + "\n"
                            }
                        })
                    }
                })
            }
        })
        
        return data
    }

    const generateResponse = (question) => {
        const q = question.toLowerCase()
        
        // Technical Skills
        if (q.includes('skill') || q.includes('technology') || q.includes('tech') || q.includes('stack')) {
            return "Tusher is a Frontend Engineer with extensive knowledge of Backend technologies. His technical stack includes: **Frontend**: React.js, Next.js, React Native, TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS, Tailwind CSS, Bootstrap, Redux, Zustand, Framer Motion. **Backend**: Node.js, Express.js, NestJS, Python. **Databases**: PostgreSQL, MySQL, MongoDB, Supabase. **Cloud & DevOps**: Kubernetes, Docker, Git, GitHub, Vercel, Netlify, Firebase, Clerk Auth, Appwrite."
        }
        
        // Experience & Work
        if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('company')) {
            return "Tusher's professional experience: **Current**: Frontend Developer at Cloudly Infotech BD (Dec 2024 - Jan 2026) - Built production-grade admin dashboards for AnonymousHealth.com and InstaCircle, achieving 40% higher conversions and 80% lower intake costs. **Previous**: College Mastermind (Jun-Jul 2024), Farika Technical Services (Jun-Dec 2022), Digital Expert Institute as Course Instructor (Mar-Jun 2022)."
        }
        
        // Projects & Portfolio
        if (q.includes('project') || q.includes('portfolio') || q.includes('app') || q.includes('website')) {
            return "Tusher's key projects: **AnonymousHealth** - AI-powered healthcare platform with admin dashboard (Next.js) and mobile app (React Native). **InstaCircle** - Community management platform with web dashboard and mobile app. **Storage Management System** - File management platform with Next.js 15. **ThreadCraft AI** - Social media content generator. **AI Podcast Platform** - Text-to-audio conversion tool."
        }
        
        // Contact Information
        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('phone') || q.includes('linkedin')) {
            return "Contact Tusher: 📧 Email: fackruddin.tusher@gmail.com | 📱 Phone: +8801821417230 | 💼 LinkedIn: linkedin.com/in/mohammed-fackruddin-tusher-2359a5215 | 🐙 GitHub: github.com/tusher1612 | 📍 Location: Dhaka, Bangladesh"
        }
        
        // Education
        if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('study')) {
            return "Tusher holds a Bachelor of Science in Computer Science and Engineering from Brac University, Dhaka, Bangladesh (Jan 2019 - Jun 2024)."
        }
        
        // Certificates
        if (q.includes('certificate') || q.includes('certification') || q.includes('course')) {
            return "Tusher's certifications include: 5-Day AI Agents Intensive Course with Google Badge (Google, 2025) and Top 100 Teams - Sheba Platform Limited Hackathon (Sheba Platform Limited, 2025)."
        }
        
        // Availability & Notice Period
        if (q.includes('available') || q.includes('notice') || q.includes('hire') || q.includes('freelance')) {
            return "Tusher is currently serving his notice period at Cloudly Infotech BD. His last working day is January 31, 2026. He's open to new opportunities and collaborations!"
        }
        
        // Personal Interests
        if (q.includes('interest') || q.includes('hobby') || q.includes('personal') || q.includes('guitar') || q.includes('music')) {
            return "Tusher's personal interests include: Playing guitar (exploring different genres), AI video editing, digital illustration and art, investing and personal finance, UX design principles, and photo editing with creative techniques."
        }
        
        // Location
        if (q.includes('location') || q.includes('where') || q.includes('based') || q.includes('bangladesh')) {
            return "Tusher is based in Dhaka, Bangladesh. He has experience working with international clients remotely, including projects in the USA and Dubai."
        }
        
        // Resume/CV
        if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
            return "You can download Tusher's resume directly from the about section. Just click on the 'Download Resume' link! It contains detailed information about his experience, skills, and projects."
        }
        
        // React/Frontend specific
        if (q.includes('react') || q.includes('frontend') || q.includes('next') || q.includes('typescript')) {
            return "Tusher specializes in React.js and Next.js development with TypeScript. He's built production-grade admin dashboards, mobile apps with React Native, and has experience with state management (Redux, Zustand), styling (Tailwind CSS, SCSS), and modern React patterns including hooks and context API."
        }
        
        // Mobile/React Native specific
        if (q.includes('mobile') || q.includes('react native') || q.includes('app development') || q.includes('ios') || q.includes('android')) {
            return "Tusher has extensive experience in React Native mobile development. He's built production-grade mobile apps for both iOS and Android platforms, including AnonymousHealth and InstaCircle mobile applications. Expert in cross-platform development, native modules integration, push notifications, and mobile-specific UI/UX patterns."
        }
        
        // Backend/Full Stack specific
        if (q.includes('backend') || q.includes('fullstack') || q.includes('full stack') || q.includes('nodejs') || q.includes('nestjs')) {
            return "Tusher is a Frontend Engineer with extensive backend knowledge. He's proficient in Node.js and NestJS for building scalable APIs and microservices. Experienced with database design and management using PostgreSQL, MySQL, MongoDB, and Supabase. Also skilled in REST APIs, GraphQL, JWT authentication, and cloud deployment."
        }
        
        // AI/Modern Tech
        if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('modern')) {
            return "Tusher has hands-on experience with AI integration in web applications. He's worked on AI-powered healthcare platforms, AI-driven CBT workflows, social media content generators using Google Generative AI, and text-to-audio conversion tools with OpenAI."
        }
        
        // Achievements
        if (q.includes('achievement') || q.includes('success') || q.includes('result')) {
            return "Tusher's notable achievements: Contributed to platforms achieving 40% higher conversions and 80% lower intake costs at AnonymousHealth. Built systems that reduced appointment no-shows by 50%. Improved student proficiency by 40% as a course instructor. Enhanced user engagement by 25% at College Mastermind."
        }
        
        // Default response
        return  "Hi! I'm Tusher's AI assistant. I know everything about his frontend engineering expertise with extensive backend knowledge, technical skills, projects, education, certifications, and more. What would you like to know?"
    }

    const handleSend = async () => {
        if (!input.trim()) return
        
        const userMessage = { type: 'user', text: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)
        
        // Simulate typing delay
        setTimeout(() => {
            const botResponse = generateResponse(input)
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }])
            setIsTyping(false)
            
            // Speak the response
            if (voiceEnabled) {
                setTimeout(() => speakText(botResponse), 500)
            }
        }, 1000)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
            </div>
            
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h4>Ask about Tusher</h4>
                        <div className="voice-controls">
                            <button 
                                className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}
                                onClick={() => setVoiceEnabled(!voiceEnabled)}
                                title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                            >
                                <i className={`fa-solid ${voiceEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
                            </button>
                            {isSpeaking && (
                                <button 
                                    className="stop-speaking"
                                    onClick={stopSpeaking}
                                    title="Stop speaking"
                                >
                                    <i className="fa-solid fa-stop"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type} ${message.type === 'bot' && isSpeaking && index === messages.length - 1 ? 'speaking' : ''}`}>
                                <div className="message-content">
                                    {message.text}
                                    {message.type === 'bot' && isSpeaking && index === messages.length - 1 && (
                                        <div className="speaking-indicator">
                                            <i className="fa-solid fa-volume-up"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-content typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me about Tusher..."
                        />
                        <button onClick={handleSend}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chatbot