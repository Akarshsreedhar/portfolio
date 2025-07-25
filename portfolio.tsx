"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Float,
  Environment,
  MeshDistortMaterial,
  useScroll,
  ScrollControls,
  Sphere,
  Box,
  Torus,
  Scroll,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, MapPin, Code, Database, Globe, Cpu, Zap } from "lucide-react"
import type * as THREE from "three"

export default function Portfolio() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.1}>
            <Scene />
            <Scroll html style={{ width: '100%' }}>
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </Scroll>
          </ScrollControls>
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene() {
  const scroll = useScroll()
  const { camera } = useThree()

  useFrame(() => {
    const offset = scroll.offset
    camera.position.y = -offset * 20
    camera.lookAt(0, -offset * 20, 0)
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

      {/* Hero 3D Elements */}
      <group position={[0, 0, 0]}>
        <FloatingAvatar />
        <ParticleField />
      </group>

      {/* About 3D Elements */}
      <group position={[0, -20, 0]}>
        <FuturisticWorkspace />
      </group>

      {/* Projects 3D Elements */}
      <group position={[0, -40, 0]}>
        <ProjectCards />
      </group>

      {/* Skills 3D Elements */}
      <group position={[0, -60, 0]}>
        <SkillObjects />
      </group>
    </>
  )
}

function FloatingAvatar() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Float floatIntensity={2} speed={2}>
      <mesh ref={meshRef} position={[3, 0, 0]}>
        <dodecahedronGeometry args={[1.5]} />
        <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const particlesPosition = new Float32Array(200 * 3)
  for (let i = 0; i < 200; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 20
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 20
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="position" args={[particlesPosition, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff00ff" />
    </points>
  )
}

function FuturisticWorkspace() {
  return (
    <group>
      <Float floatIntensity={1} speed={1}>
        <Box position={[-3, 0, 0]} args={[2, 0.1, 1]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </Box>
        <Box position={[-2.5, 0.5, 0]} args={[1, 0.8, 0.05]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.2} />
        </Box>
      </Float>

      <Float floatIntensity={1.5} speed={1.5}>
        <Torus position={[3, 1, 0]} args={[0.8, 0.3, 16, 32]}>
          <meshStandardMaterial color="#ff00ff" wireframe />
        </Torus>
      </Float>
    </group>
  )
}

function ProjectCards() {
  return (
    <group>
      <Float floatIntensity={1} speed={1}>
        <Box position={[-4, 0, 0]} args={[2.5, 1.5, 0.1]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
        </Box>
      </Float>

      <Float floatIntensity={1.2} speed={1.2}>
        <Box position={[0, 0, 0]} args={[2.5, 1.5, 0.1]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
        </Box>
      </Float>

      <Float floatIntensity={0.8} speed={0.8}>
        <Box position={[4, 0, 0]} args={[2.5, 1.5, 0.1]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
        </Box>
      </Float>
    </group>
  )
}

function SkillObjects() {
  return (
    <group>
      <Float floatIntensity={2} speed={1}>
        <Sphere position={[-4, 0, 0]} args={[0.5]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
        </Sphere>
      </Float>

      <Float floatIntensity={1.5} speed={1.5}>
        <Box position={[-2, 0, 0]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
        </Box>
      </Float>

      <Float floatIntensity={1.8} speed={0.8}>
        <Torus position={[0, 0, 0]} args={[0.6, 0.2, 16, 32]}>
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} />
        </Torus>
      </Float>

      <Float floatIntensity={1.3} speed={1.3}>
        <Sphere position={[2, 0, 0]} args={[0.5]}>
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.3} />
        </Sphere>
      </Float>

      <Float floatIntensity={2.2} speed={0.9}>
        <Box position={[4, 0, 0]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.3} />
        </Box>
      </Float>
    </group>
  )
}

function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="text-center z-20 max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          AKARSH SREEDHAR
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          Computer Science Student & Aspiring Developer
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Passionate about creating innovative solutions through code, data science, and web development
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
        >
          <Zap className="mr-2 h-5 w-5" />
          View My Work
        </Button>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a dedicated Computer Science and Engineering student at GITAM University, specializing in Data Science.
            With a strong foundation in problem-solving and software development, I'm passionate about applying academic
            knowledge to real-world projects.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Currently serving as Technical Head for GITAM University Literature Club, I bring leadership skills and
            technical expertise to collaborative projects.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-cyan-400" />
              <span className="text-gray-300">Bangalore, India</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-purple-400" />
              <span className="text-gray-300">+91 9535010391</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-cyan-400 font-medium">Bachelor of Computer Science</p>
                  <p className="text-gray-400">GITAM University (2022 - Present)</p>
                </div>
                <div>
                  <p className="text-purple-400 font-medium">PUC</p>
                  <p className="text-gray-400">Narayana PU College (2020 - 2022)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "Plastic Recycle Reward System",
      description:
        "Developed a plastic recycling initiative with voucher system to encourage recycling efforts through rewards.",
      tech: ["Python", "Web Development", "Database"],
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "PawSignature",
      description:
        "Digital Identity system for stray dogs using QR tags with contact and health information for BBMP tracking.",
      tech: ["QR Technology", "Database", "Web Development"],
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Web Development Projects",
      description: "Front-end development and UI enhancements during internship at ParknSecure.",
      tech: ["HTML", "CSS", "JavaScript", "UI/UX"],
      color: "from-green-500 to-teal-600",
    },
  ]

  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          My <span className="text-cyan-400">Projects</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <CardContent className="p-6">
                <div className={`h-2 w-full bg-gradient-to-r ${project.color} rounded-full mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const skills = [
    { name: "Python", level: 60, icon: Code, color: "text-yellow-400" },
    { name: "C Programming", level: 70, icon: Cpu, color: "text-blue-400" },
    { name: "SQL", level: 75, icon: Database, color: "text-green-400" },
    { name: "HTML/CSS", level: 90, icon: Globe, color: "text-orange-400" },
    { name: "Data Structures", level: 70, icon: Zap, color: "text-purple-400" },
  ]

  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Technical <span className="text-cyan-400">Skills</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <skill.icon className={`h-6 w-6 ${skill.color}`} />
                  <span className="text-white font-medium text-lg">{skill.name}</span>
                  <span className="text-gray-400 ml-auto">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-cyan-400 font-medium">Web Development Intern</p>
                    <p className="text-gray-400">ParknSecure (June-July 2025)</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-medium">Investment Banking Simulation</p>
                    <p className="text-gray-400">JPMorgan (September 2024)</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium">Data Analytics Simulation</p>
                    <p className="text-gray-400">Accenture (October 2024)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Leadership", "Problem Solving", "Communication", "Time Management", "Reasoning"].map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      console.log('Raw server response:', response);
      const data = await response.json();
      console.log('Parsed JSON data:', data);

      if (response.ok && data.success) {
        setSubmitStatus({ success: true, message: 'Email sent successfully!' });
        event.currentTarget.reset();
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Failed to send email.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Email sent successfully!' })
    }

    setIsSubmitting(false)
  }

  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Get In <span className="text-cyan-400">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="bg-gray-900/30 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Send Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
                {submitStatus && (
                  <p className={`mt-4 text-center ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                    {submitStatus.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg backdrop-blur-sm">
                <Mail className="h-6 w-6 text-cyan-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">asreedha@gitam.in</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg backdrop-blur-sm">
                <Phone className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-400">+91 9535010391</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg backdrop-blur-sm">
                <MapPin className="h-6 w-6 text-pink-400" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-400">Bangalore, India</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white bg-transparent"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
