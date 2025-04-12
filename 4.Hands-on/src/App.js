// src/App.js
import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Moon,
  Sun,
  Award,
  ThumbsUp,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Data
import { resumeData } from "./resumeData";
import { resumePersonalData } from "./resumePersonalData";

const LAMBDA_URL = "https://YOUR-LAMBDA-URL"; // Lambda 함수의 URL
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Component Definitions
const CustomTooltip = ({ active, payload, label, language }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <p className="font-bold text-lg mb-2 text-black">{label}년</p>
        <div className="mb-2">
          <p className="font-semibold text-purple-600">
            {language === "ko" ? "자격증/교육이수" : "Certifications"} (
            {payload[0].value})
          </p>
          <p className="text-sm whitespace-pre-line text-black">
            {data.certDetail}
          </p>
        </div>
        <div>
          <p className="font-semibold text-green-600">
            {language === "ko" ? "주요 활동" : "Activities"} ({payload[1].value}
            )
          </p>
          <p className="text-sm whitespace-pre-line text-black">
            {data.actDetail}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ExpandableSection = ({
  title,
  description,
  achievements,
  id,
  expandedSections,
  toggleSection,
  darkMode,
  cardBgColor,
}) => {
  const isExpanded = expandedSections.includes(id);
  return (
    <div
      className={`p-4 rounded-lg ${cardBgColor} shadow-lg transition-all duration-300 break-inside-avoid`}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(id)}
      >
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          {description && (
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              {description}
            </p>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </div>
      {isExpanded && (
        <ul
          className={`list-disc list-inside mt-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {achievements.map((achievement, i) => (
            <li key={i} className="mt-2">
              {typeof achievement === "string" ? achievement : achievement}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function InteractiveResume() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ko");
  const [activeChart, setActiveChart] = useState("experience");
  const [visitCount, setVisitCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const [expandedSections, setExpandedSections] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const originalDarkMode = useRef(false);

  // Style variables
  const baseTextColor = darkMode ? "text-white" : "text-gray-800";
  const baseBgColor = darkMode ? "bg-gray-900" : "bg-gray-100";
  const cardBgColor = darkMode ? "bg-gray-800" : "bg-white";

  // 🔹 2. 다국어 데이터 불러오기
  const localizedProjects = resumeData.projectsData.map((project) => ({
    title: project.title[language],
    achievements: project.achievements.map((ach) => ach[language]),
  }));

  const localizedEducation = resumeData.educationData.map((item) => ({
    title: item.title[language],
    description: item.description[language],
    achievements: item.achievements.map((ach) => ach[language]),
  }));

  const localizedExperience = resumeData.experienceData.map((item) => ({
    ...item,
    certDetail: item.certDetail[language],
    actDetail: item.actDetail[language],
  }));

  const localizedDistribution = resumeData.projectDistribution.map((item) => ({
    ...item,
    name: item.name[language],
  }));

  // Effects
  useEffect(() => {
    // Fetch visit count
    fetch(`${LAMBDA_URL}/visit`)
      .then((response) => response.json())
      .then((data) => setVisitCount(data.visits))
      .catch((error) => console.error("방문자 수 가져오기 오류:", error));

    // Fetch like count
    fetch(`${LAMBDA_URL}/likes`)
      .then((response) => response.json())
      .then((data) => setLikeCount(data.likes))
      .catch((error) => console.error("좋아요 수 가져오기 오류:", error));
  }, []);

  // Handlers
  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((id) => id !== section)
        : [...prev, section]
    );
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ko" ? "en" : "ko"));
  };

  const handleLike = () => {
    fetch(`${LAMBDA_URL}/like`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setLikeCount(d.likes))
      .catch(console.error);
  };

  const generatePDF = async () => {
    const pdfButton = document.getElementById("pdf-button");
    const darkButton = document.getElementById("darkmode-button");
    const langButton = document.getElementById("language-button");
    const statsBar = document.getElementById("stats-bar");

    if (pdfButton) pdfButton.style.display = "none";
    if (darkButton) darkButton.style.display = "none";
    if (langButton) langButton.style.display = "none";
    if (statsBar) statsBar.style.display = "none";

    // 현재 다크모드 상태 저장 및 라이트 모드 전환
    originalDarkMode.current = darkMode;
    setDarkMode(false);

    // 모든 섹션 열기
    const allEducationIds = localizedEducation.map((_, i) => `edu-${i}`);
    const allProjectIds = localizedProjects.map((_, i) => `project-${i}`);
    setExpandedSections([...allEducationIds, ...allProjectIds]);

    // 일정 시간 후 PDF 생성 (렌더링 기다림)
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.print();

    setTimeout(() => {
      setDarkMode(originalDarkMode.current);
      if (pdfButton) pdfButton.style.display = "block";
      if (darkButton) darkButton.style.display = "block";
      if (langButton) langButton.style.display = "block";
      if (statsBar) statsBar.style.display = "flex";
    }, 1000);
  };

  // Chart Renderers
  const renderExperienceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={localizedExperience}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="certifications"
          name={language === "ko" ? "자격증/교육이수" : "Certifications"}
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="activities"
          name={language === "ko" ? "주요 활동" : "Activities"}
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderProjectDistribution = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={localizedDistribution}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {localizedDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className={`min-h-screen ${baseBgColor} ${baseTextColor}`}>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        <div className="flex space-x-2">
          <button
            id="language-button"
            onClick={toggleLanguage}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            {language === "ko" ? "en" : "ko"}
          </button>
          <button
            id="darkmode-button"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-white"
            }`}
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
        <div id="pdf-button">
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            📄 {language === "ko" ? "PDF 만들기" : "Generate PDF"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Bar */}
        <div
          id="stats-bar"
          className={`w-full ${cardBgColor} p-4 rounded-lg mb-8 flex justify-between items-center pdf-area`}
        >
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>
                {language === "ko"
                  ? `방문자 수: ${visitCount}`
                  : `Visitors: ${visitCount}`}
              </span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-5 h-5 mr-2" />
              <span>
                {language === "ko"
                  ? `좋아요: ${likeCount}`
                  : `Likes: ${likeCount}`}
              </span>
            </div>
          </div>
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            {language === "ko" ? "좋아요" : "Like"}
          </button>
        </div>

        <div
          id="resume-content"
          className="max-w-6xl mx-auto p-6 print:bg-[#f3f4f6]"
          style={{ backgroundColor: darkMode ? "#111827" : "#f3f4f6" }}
        >
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="no-page-break">
              <h1 className="text-4xl font-bold mb-2">
                {resumePersonalData.name[language]}
              </h1>
              <h2 className="text-2xl text-blue-500">
                {resumePersonalData.subtitle[language]}
              </h2>
            </div>
          </header>

          {/* Contact Info */}
          <section className="mb-8 flex flex-wrap gap-4 text-sm no-page-break">
            <a
              href={resumePersonalData.contact.email.href}
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              {resumePersonalData.contact.email.text}
            </a>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              {resumePersonalData.contact.phone.text}
            </div>
            <a
              href={resumePersonalData.contact.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              <Github className="w-4 h-4 mr-2" />
              {resumePersonalData.contact.github.text}
            </a>
            <a
              href={resumePersonalData.contact.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              {resumePersonalData.contact.linkedin.text}
            </a>
          </section>

          {/* Achievements and Project Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 no-page-break">
            <div className={`p-6 rounded-lg ${cardBgColor}`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />{" "}
                {language === "ko" ? "수상 및 활동" : "Achievements"}
              </h3>
              <ul className="space-y-4">
                {resumeData.achievementsSection.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium">
                      - {item.title[language]}
                    </span>
                    <ul className="mt-1 ml-4 text-sm">
                      <li className="text-gray-600 dark:text-gray-400">
                        {item.description[language]}
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${cardBgColor}`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" /> Project Distribution
              </h3>
              {renderProjectDistribution()}
            </div>
          </div>

          {/* Education Section */}
          <section className="mb-8 no-page-break">
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localizedEducation.map((edu, index) => (
                <ExpandableSection
                  key={index}
                  id={`edu-${index}`}
                  title={edu.title}
                  description={edu.description}
                  achievements={edu.achievements.map((ach) => {
                    if (typeof ach === "string" && ach.includes("http")) {
                      const isNotion = ach.includes("notion.so");
                      const isGithub = ach.includes("github.com");
                      const parts = ach.split(": ");

                      if (parts.length > 1 && (isNotion || isGithub)) {
                        return (
                          <>
                            {parts[0]}:{" "}
                            <a
                              href={parts[1]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {parts[1]}
                            </a>
                          </>
                        );
                      }
                    }
                    return ach;
                  })}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  darkMode={darkMode}
                  cardBgColor={cardBgColor}
                />
              ))}
            </div>
          </section>

          {/* Experience Chart */}
          <div className={`p-6 rounded-lg ${cardBgColor} mb-8 no-page-break`}>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setActiveChart("experience")}
                className={`px-4 py-2 rounded ${
                  activeChart === "experience"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Experience
              </button>
            </div>
            {activeChart === "experience" && renderExperienceChart()}
          </div>

          {/* Projects Section */}
          <section className="mb-8 no-page-break">
            <h3 className="text-2xl font-semibold mb-4">Projects</h3>
            <div className="space-y-4">
              {localizedProjects.map((project, index) => (
                <ExpandableSection
                  key={index}
                  id={`project-${index}`}
                  title={project.title}
                  achievements={project.achievements}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  darkMode={darkMode}
                  cardBgColor={cardBgColor}
                />
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-8 no-page-break">
            <h3 className="text-2xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skillsData.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  } transition-colors duration-300 hover:bg-blue-500 hover:text-white cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
