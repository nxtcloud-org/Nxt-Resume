// src/App.js
import { useState, useEffect } from 'react';
import { 
 LineChart, 
 Line, 
 BarChart, 
 Bar, 
 PieChart, 
 Pie, 
 Cell,
 XAxis, 
 YAxis, 
 CartesianGrid, 
 Tooltip, 
 Legend, 
 ResponsiveContainer 
} from 'recharts';
import { Mail, Phone, Github, Linkedin, Moon, Sun, Code, Award, ThumbsUp, Users } from 'lucide-react';

const skillData = [
 { name: 'AWS', value: 85 },
 { name: 'Python', value: 75 },
 { name: 'Infrastructure as Code', value: 70 },
 { name: 'Docker', value: 65 },
];

const experienceData = [
  { 
    year: 2022, 
    certifications: 1, 
    activities: 2,
    certDetail: "AWS 학생 교육 프로그램 수료",
    actDetail: "AWS 기초 강좌 수강 및 실습\n자료구조/알고리즘 과목 수강"
  },
  { 
    year: 2023, 
    certifications: 2, 
    activities: 3,
    certDetail: "AWS Cloud Practitioner\nAWS Solutions Architect Associate",
    actDetail: "EC2, S3를 활용한 웹 서비스 구축\nCloudWatch 모니터링 대시보드 구축\n서버리스 아키텍처 설계 및 구현"
  },
  { 
    year: 2024, 
    certifications: 3, 
    activities: 4,
    certDetail: "AWS Cloud Practitioner\nAWS Solutions Architect Associate\nAWS AI Practitioner",
    actDetail: "AWS 심화 강좌 수강 및 실습\nAWS 대학생 유저 그룹 운영진\n교내 DevOps 동아리\n웹서버 구축 프로젝트"
  },
  { 
    year: 2025, 
    certifications: 5, 
    activities: 5,
    certDetail: "AWS Professional 자격증 목표\n추가 클라우드 자격증 취득 예정",
    actDetail: "클라우드 네이티브 프로젝트 리드\n기술 컨퍼런스 발표 목표\n인턴십 목표"
  }
];

const projectDistribution = [
 { name: '인프라/데브옵스', value: 40 },
 { name: '백엔드 개발', value: 30 },
 { name: '클라우드 아키텍처', value: 20 },
 { name: '모니터링/로깅', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LAMBDA_URL = ''; // Lambda 함수의 URL

export default function InteractiveResume() {
 const [darkMode, setDarkMode] = useState(false);
 const [activeChart, setActiveChart] = useState('skills');
 const [visitCount, setVisitCount] = useState(0);
 const [likeCount, setLikeCount] = useState(0);

 useEffect(() => {
   // 방문 카운트 GET
   fetch(`${LAMBDA_URL}/visit`)
     .then(response => response.json())
     .then(data => {
      console.log(`!!!!!!!!!!!!!!! ${data}`)
      setVisitCount(data.visits)
    });

   // 좋아요 카운트 GET
   fetch(`${LAMBDA_URL}/likes`)
     .then(response => response.json())
     .then(data => 
      {
        console.log(`@@@@@@ ${data}`)
        setLikeCount(data.likes)
      });
 }, []);

 const handleLike = () => {
   fetch(`${LAMBDA_URL}/like`, { method: 'POST' })
     .then(response => response.json())
     .then(data => setLikeCount(data.likes));
 };

 const baseTextColor = darkMode ? 'text-gray-500' : 'text-gray-800';
 const baseBgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
 const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white';

 const renderSkillsChart = () => (
   <ResponsiveContainer width="100%" height={300}>
     <BarChart data={skillData} layout="vertical">
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis type="number" domain={[0, 100]} />
       <YAxis dataKey="name" type="category" />
       <Tooltip />
       <Bar dataKey="value" fill="#8884d8" />
     </BarChart>
   </ResponsiveContainer>
 );

  const renderExperienceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={experienceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="certifications" 
          name="자격증/교육이수" 
          stroke="#8884d8" 
        />
        <Line 
          type="monotone" 
          dataKey="activities" 
          name="주요 활동" 
          stroke="#82ca9d" 
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 bg-white shadow-lg rounded-lg border border-gray-200`}>
          <p className="font-bold text-lg mb-2">{label}년</p>
          <div className="mb-2">
            <p className="font-semibold text-purple-600">자격증/교육이수 ({payload[0].value}개)</p>
            <p className="text-sm whitespace-pre-line">{payload[0].payload.certDetail}</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">주요 활동 ({payload[1].value}개)</p>
            <p className="text-sm whitespace-pre-line">{payload[1].payload.actDetail}</p>
          </div>
        </div>
      );
    }
    return null;
  };

 const renderProjectDistribution = () => (
   <ResponsiveContainer width="100%" height={300}>
     <PieChart>
       <Pie
         data={projectDistribution}
         innerRadius={60}
         outerRadius={80}
         paddingAngle={5}
         dataKey="value"
       >
         {projectDistribution.map((entry, index) => (
           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
         ))}
       </Pie>
       <Tooltip />
       <Legend />
     </PieChart>
   </ResponsiveContainer>
 );

 return (
   <div className={`min-h-screen ${baseBgColor} ${baseTextColor} transition-colors duration-300`}>
     <div className="max-w-6xl mx-auto p-6">
       {/* Stats Bar */}
       <div className={`w-full ${cardBgColor} p-4 rounded-lg mb-8 flex justify-between items-center`}>
         <div className="flex items-center space-x-8">
           <div className="flex items-center">
             <Users className="w-5 h-5 mr-2" />
             <span>방문자 수: {visitCount}</span>
           </div>
           <div className="flex items-center">
             <ThumbsUp className="w-5 h-5 mr-2" />
             <span>좋아요: {likeCount}</span>
           </div>
         </div>
         <button
           onClick={handleLike}
           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
         >
           <ThumbsUp className="w-4 h-4 mr-2" />
           좋아요
         </button>
       </div>

       <header className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-4xl font-bold mb-2">홍길동</h1>
           <h2 className="text-2xl text-blue-500">데브옵스 엔지니어링에 대한 열정을 가진 대학생</h2>
         </div>
         <button
           onClick={() => setDarkMode(!darkMode)}
           className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
         >
           {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
         </button>
       </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${cardBgColor}`}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" /> Contact
            </h3>
            <div className="space-y-2">
              <a 
                href="mailto:example@example.com" 
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                example@example.com
              </a>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                010-1234-5678
              </p>
              <a 
                href="https://github.com/yourgithubid" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                Github: yourid
              </a>
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn: yourprofile
              </a>
            </div>
          </div>
          <div className={`p-6 rounded-lg ${cardBgColor}`}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" /> Achievements
            </h3>
            <ul className="list-disc list-inside">
              <li>AWS GameDay 2등 수상</li>
              <li>교내 클라우드 해커톤에서 우수상 수상</li>
              <li>AWS 기반 CI/CD 파이프라인 구축</li>
            </ul>
          </div>
        </div>
       <div className={`p-6 rounded-lg ${cardBgColor} mb-8`}>
         <div className="flex gap-4 mb-4">
           <button
             onClick={() => setActiveChart('skills')}
             className={`px-4 py-2 rounded ${activeChart === 'skills' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
           >
             Skills
           </button>
           <button
             onClick={() => setActiveChart('experience')}
             className={`px-4 py-2 rounded ${activeChart === 'experience' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
           >
             Experience
           </button>
           <button
             onClick={() => setActiveChart('distribution')}
             className={`px-4 py-2 rounded ${activeChart === 'distribution' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
           >
             Project Distribution
           </button>
         </div>
         {activeChart === 'skills' && renderSkillsChart()}
         {activeChart === 'experience' && renderExperienceChart()}
         {activeChart === 'distribution' && renderProjectDistribution()}
       </div>

       <section className={`p-6 rounded-lg ${cardBgColor}`}>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2" /> Projects
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
            <h4 className="font-semibold">학과 스터디 매칭 플랫폼 AWS 배포</h4>
            <p className="text-sm whitespace-pre-line">
              {`- AWS EC2에 Node.js 백엔드 서버 배포 및 RDS(MySQL) 연동
              - Terraform IaC를 활용한 AWS 리소스 자동화
              - 프로젝트 기여: DevOps/인프라 담당`}
            </p>
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
            <h4 className="font-semibold">교내 동아리 웹사이트 클라우드 전환</h4>
            <p className="text-sm whitespace-pre-line">
              {`- AWS S3와 CloudFront를 활용한 정적 웹사이트 호스팅
              - Route53을 통한 도메인 관리 및 HTTPS 설정
              - Lambda를 활용한 이미지 리사이징 자동화 구현
              - CloudWatch로 접속자 수 모니터링 대시보드 구축`}
            </p>
          </div>
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
            <h4 className="font-semibold">개인 블로그 운영</h4>
            <p className="text-sm whitespace-pre-line">
              {`- 프로젝트 진행 과정 블로그 연재 중
              - SAA 문제 풀이 블로깅 연재 중`}
            </p>
          </div>
        </div>
      </section>
     </div>
   </div>
 );
}