// src/resumeData.js

export const resumeData = {
  experienceData: [
    {
      year: 2022,
      certifications: 1,
      activities: 2,
      certDetail: {
        ko: "AWS 학생 교육 프로그램 수료",
        en: "Completed AWS Student Training Program"
      },
      actDetail: {
        ko: "AWS 기초 강좌 수강 및 실습\n자료구조/알고리즘 과목 수강",
        en: "Attended and practiced AWS fundamental courses\nTook Data Structures/Algorithms course"
      }
    },
    {
      year: 2023,
      certifications: 2,
      activities: 3,
      certDetail: {
        ko: "AWS Cloud Practitioner\nAWS Solutions Architect Associate",
        en: "AWS Cloud Practitioner\nAWS Solutions Architect Associate"
      },
      actDetail: {
        ko: "EC2, S3를 활용한 웹 서비스 구축\nCloudWatch 모니터링 대시보드 구축\n서버리스 아키텍처 설계 및 구현",
        en: "Built web service using EC2 and S3\nCreated monitoring dashboard with CloudWatch\nDesigned and implemented serverless architecture"
      }
    },
    {
      year: 2024,
      certifications: 3,
      activities: 4,
      certDetail: {
        ko: "AWS Cloud Practitioner\nAWS Solutions Architect Associate\nAWS AI Practitioner",
        en: "AWS Cloud Practitioner\nAWS Solutions Architect Associate\nAWS AI Practitioner"
      },
      actDetail: {
        ko: "AWS 심화 강좌 수강 및 실습\nAWS 대학생 유저 그룹 운영진\n교내 DevOps 동아리\n웹서버 구축 프로젝트",
        en: "Attended advanced AWS courses and practice\nExecutive member of AWS student user group\nDevOps club member\nWeb server development project"
      }
    },
    {
      year: 2025,
      certifications: 5,
      activities: 5,
      certDetail: {
        ko: "AWS Professional 자격증 목표\n추가 클라우드 자격증 취득 예정",
        en: "Targeting AWS Professional certification\nPlanning to acquire additional cloud certifications"
      },
      actDetail: {
        ko: "클라우드 네이티브 프로젝트 리드\n기술 컨퍼런스 발표 목표\n인턴십 목표",
        en: "Lead cloud-native project\nPlan to present at tech conferences\nInternship goal"
      }
    }],

  projectDistribution: [
    { name: { ko: '인프라/데브옵스', en: 'Infra/DevOps' }, value: 40 },
    { name: { ko: '백엔드 개발', en: 'Backend Development' }, value: 30 },
    { name: { ko: '클라우드 아키텍처', en: 'Cloud Architecture' }, value: 20 },
    { name: { ko: '모니터링/로깅', en: 'Monitoring/Logging' }, value: 10 },
  ],

  educationData: [
    {
      title: { ko: 'GenAI with Cloud', en: 'GenAI with Cloud' },
      description: {
        ko: 'PartyRock 위젯 활용 AI 실습',
        en: 'AI practice using PartyRock widgets'
      },
      achievements: [
        {
          ko: 'AWS AI 서비스 활용한 애플리케이션 개발 사례 학습',
          en: 'Studied application development using AWS AI services'
        },
        {
          ko: 'AI 생성 콘텐츠의 투명성, 딥페이크 등 윤리적 문제와 사회적 영향 이해',
          en: 'Understanding ethical and social issues of AI content like transparency and deepfakes'
        },
        {
          ko: '책임 있는 AI 개발을 위한 AWS의 기술 및 정책 소개: Amazon Bedrock Guardrails',
          en: 'Introduction to AWS tools and policies for responsible AI: Amazon Bedrock Guardrails'
        },
        {
          ko: 'Amazon Titan Image Generator의 워터마크 기능 및 감지 API',
          en: 'Watermark and detection API features of Amazon Titan Image Generator'
        }
      ]
    },
    {
      title: { ko: '서비스 배포 with Cloud', en: 'Service Deployment with Cloud' },
      description: {
        ko: '2-티어, 3-티어 아키텍처 구축 실습',
        en: 'Practice on building 2-tier and 3-tier architecture'
      },
      achievements: [
        {
          ko: '랜덤 명언 앱, AI 학습 노트 앱 개발 및 배포',
          en: 'Developed and deployed Random Quote App and AI Learning Notes App'
        },
        {
          ko: 'RDS 연동, API 및 프론트엔드(React) 개발',
          en: 'Integrated RDS and developed API and frontend (React)'
        },
        {
          ko: '배포(S3, EC2), AI 기능(Bedrock) 연동까지 전 과정 실습 경험',
          en: 'Full deployment practice including S3, EC2, and AI feature (Bedrock) integration'
        }
      ]
    },
    {
      title: { ko: 'Serverless & AI 실습', en: 'Serverless & AI Practice' },
      description: {
        ko: '서버리스 기반 챗봇 개발 실습',
        en: 'Serverless chatbot development practice'
      },
      achievements: [
        {
          ko: 'Rekognition 활용 얼굴인식 로그인 구현 실습',
          en: 'Implemented face recognition login using Rekognition'
        },
        {
          ko: 'S3 프론트엔드 배포 및 Lambda 함수와 boto3를 활용한 백엔드 배포',
          en: 'Frontend deployment on S3 and backend with Lambda and boto3'
        },
        {
          ko: 'CloudFront를 활용하여 HTTPS 엔드포인트 배포 및 S3 웹 사이트 통합',
          en: 'Deployed HTTPS endpoint using CloudFront and integrated with S3 website'
        }
      ]
    },
    {
      title: { ko: 'AWS 자격증반 수강', en: 'AWS Certification Course' },
      description: {
        ko: 'AWS CLF, SAA 자격증반 수강 및 대비',
        en: 'Attended AWS CLF, SAA certification preparation course'
      },
      achievements: [
        {
          ko: 'AWS의 핵심 서비스 이해와 클라우드 설계 원칙 학습',
          en: 'Learned core AWS services and cloud design principles'
        },
        {
          ko: '실전 문제 풀이를 통한 시험 대비 역량 강화',
          en: 'Enhanced test readiness through solving practical questions'
        },
        {
          ko: '문제 풀이 사이트 및 학습 자료로 부족한 부분 보완',
          en: 'Supplemented weak areas using problem-solving sites and study materials'
        }
      ]
    },
    {
      title: { ko: '서버리스 MSA', en: 'Serverless MSA' },
      description: {
        ko: '서버리스 MSA 아키텍처 기반 3-티어 아키텍처 구축 실습',
        en: 'Built 3-tier architecture based on serverless MSA'
      },
      achievements: [
        {
          ko: '쇼핑몰 애플리케이션 개발 및 배포',
          en: 'Developed and deployed shopping mall application'
        },
        {
          ko: 'SQS를 통해 마이크로서비스 간의 비동기 메시징 처리 및 이벤트 기반 아키텍처 구현',
          en: 'Implemented asynchronous messaging and event-driven architecture with SQS'
        },
        {
          ko: 'Streamlit을 활용해 간단한 프론트엔드를 구축하여 사용자 인터페이스 개발',
          en: 'Built a simple frontend using Streamlit for UI development'
        },
        {
          ko: '공유 노션 자료: https://www.notion.so/NxtCloud-MSA-10579923b3c545059678d239155a17b8',
          en: 'Shared Notion resource: https://www.notion.so/NxtCloud-MSA-10579923b3c545059678d239155a17b8'
        },
        {
          ko: '학생 clone 레포: https://github.com/nxtcloud-org/msa-for-student.git',
          en: 'Student clone repo: https://github.com/nxtcloud-org/msa-for-student.git'
        }
      ]
    },
    {
      title: { ko: 'Resume Challenge', en: 'Resume Challenge' },
      description: {
        ko: 'AWS 핵심 서비스들을 활용한 이력서 웹사이트 배포 실습',
        en: 'Deployed resume website using AWS core services'
      },
      achievements: [
        {
          ko: 'HTML/CSS로 작성한 이력서를 S3 버킷에 배포하여 웹 호스팅',
          en: 'Deployed resume (HTML/CSS) on S3 for web hosting'
        },
        {
          ko: 'DynamoDB 테이블과 Lambda 함수로 웹사이트 좋아요 기능 추가',
          en: 'Added like feature using DynamoDB and Lambda'
        },
        {
          ko: '가상 서버 EC2 구동 및 환경 설정 경험',
          en: 'Experience running and configuring EC2 virtual server'
        }
      ]
    },
    {
      title: { ko: 'Face Authentication App', en: 'Face Authentication App' },
      description: {
        ko: 'Amazon Rekognition으로 만드는 얼굴 인식 인증 시스템',
        en: 'Face authentication system using Amazon Rekognition'
      },
      achievements: [
        {
          ko: 'CloudFront 배포를 통한 안전한 웹 애플리케이션 제공',
          en: 'Secure web app delivery using CloudFront'
        },
        {
          ko: 'Rekognition API와 Lambda를 연결해 얼굴 비교 로직 작성',
          en: 'Implemented face comparison logic with Rekognition API and Lambda'
        },
        {
          ko: 'S3 정적 웹 호스팅으로 얼굴 인증 프론트엔드 구현',
          en: 'Implemented frontend for face authentication with S3 static hosting'
        }
      ]
    }
  ],

  projectsData: [
    {
      title: {
        ko: '학과 스터디 매칭 플랫폼 AWS 배포',
        en: 'Department Study Matching Platform on AWS'
      },
      achievements: [
        {
          ko: 'AWS EC2에 Node.js 백엔드 서버 배포 및 RDS(MySQL) 연동',
          en: 'Deployed Node.js backend server on AWS EC2 and connected RDS (MySQL)'
        },
        {
          ko: 'Terraform IaC를 활용한 AWS 리소스 자동화',
          en: 'Automated AWS resources using Terraform (IaC)'
        },
        {
          ko: 'DevOps/인프라 담당',
          en: 'Responsible for DevOps/Infrastructure'
        }
      ]
    },
    {
      title: {
        ko: '교내 동아리 웹사이트 클라우드 전환',
        en: 'Migrated Club Website to Cloud'
      },
      achievements: [
        {
          ko: 'AWS S3와 CloudFront를 활용한 정적 웹사이트 호스팅',
          en: 'Hosted static website using AWS S3 and CloudFront'
        },
        {
          ko: 'Route53을 통한 도메인 관리 및 HTTPS 설정',
          en: 'Managed domain and configured HTTPS via Route53'
        },
        {
          ko: 'Lambda를 활용한 이미지 리사이징 자동화 구현',
          en: 'Automated image resizing with Lambda'
        },
        {
          ko: 'CloudWatch로 접속자 수 모니터링 대시보드 구축',
          en: 'Built visitor monitoring dashboard using CloudWatch'
        }
      ]
    },
    {
      title: {
        ko: '개인 블로그 운영',
        en: 'Personal Blog Operation'
      },
      achievements: [
        {
          ko: '프로젝트 진행 과정 블로그 연재 중',
          en: 'Writing blog series on project progress'
        },
        {
          ko: 'SAA 문제 풀이 블로그 연재 중',
          en: 'Writing blog series on SAA problem solving'
        }
      ]
    }
  ],

  skillsData: ['AWS', 'Python', 'Terraform', 'Docker', 'CI/CD', 'React'],

  achievementsSection: [
    {
      title: {
        ko: '해커톤 입상: DSC 공유대학 해커톤 최우수상',
        en: 'Hackathon Winner: DSC Shared University Hackathon Grand Prize',
      },
      description: {
        ko: '모빌리티를 활용한 지역사회 문제해결을 주제로 한 해커톤에서 사회적 고립 청년들의 사회 복귀를 지원하는 챌린지 프로젝트를 설계하여, AWS 서비스 기반의 데이터 수집 및 분석을 통해 맞춤형 지원 방안을 제안',
        en: 'Designed a challenge project supporting social reintegration of isolated youth through mobility-based solutions, leveraging AWS services for data collection and analysis to suggest tailored support plans.',
      },
    },
    {
      title: {
        ko: 'AWS GameDay 행사 참여: Generative AI Unicorn Party GameDay',
        en: 'Participated in AWS GameDay: Generative AI Unicorn Party',
      },
      description: {
        ko: '참가자들이 AWS 솔루션을 사용하여 실제 기술 문제를 해결하는 데 도전하는 게임화된 학습 이벤트로 해당 Gameday에서는 생성형 AI와 관련된 문제 해결을 중심으로 진행',
        en: 'A gamified learning event where participants tackled real-world technical problems using AWS solutions. This GameDay focused on solving challenges related to Generative AI.',
      },
    },
  ],
};
