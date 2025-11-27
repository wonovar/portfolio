import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoplayRef = useRef(null);

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const offset = 120;
      let current = "about";

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.offsetTop - offset;
        if (scrollY >= top) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    if (selectedProject && selectedProject.slides && selectedProject.slides.length > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % selectedProject.slides.length);
      }, 3000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [selectedProject]);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.offsetTop - 80; // navbar 높이 보정
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      {/* 상단 네비게이션 */}
      <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <nav>
            <a
              href="#about"
              className={`nav-link ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              About
            </a>
            <a
              href="#skills"
              className={`nav-link ${
                activeSection === "skills" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("skills");
              }}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={`nav-link ${
                activeSection === "projects" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`nav-link ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ABOUT 섹션 */}
      <section id="about" className="section about-section">
        <div className="about-left">
          <h1>정예원</h1>
          <h2>Front-End Developer</h2>
          <p>
            사용자 경험을 고려한 웹 인터페이스를 만드는 개발 지망생입니다.
            <br />
            HTML/CSS/JavaScript를 기반으로 React 등 프론트엔드 기술을 공부하고
            있습니다.
            <br />
            작은 기능이라도 ‘왜 이렇게 구현하는가’를 고민하며 작업합니다.
          </p>
        </div>

        <div className="about-right">
          <div className="profile-circle">JY</div>
        </div>
      </section>

      {/* SKILLS 섹션 */}
      <section id="skills" className="section skills-section">
        <div className="skills-inner">
          <h2 className="section-title">Skills</h2>

          <div className="skills-grid">
            <div className="skill-column">
              <div className="skill-card-header">
                <span className="skill-category">Main</span>
              </div>
              <p className="skill-card-desc">주로 사용하고 있는 핵심 기술들입니다.</p>
              <ul className="skill-list">
                <li>HTML5 / CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React</li>
                <li>Git / GitHub</li>
              </ul>
            </div>

            <div className="skill-column">
              <div className="skill-card-header">
                <span className="skill-category">Experienced</span>
              </div>
              <p className="skill-card-desc">프로젝트에서 실제로 사용해본 경험이 있는 기술입니다.</p>
              <ul className="skill-list">
                <li>Java / Spring MVC</li>
                <li>Kotlin / Android Studio</li>
                <li>Firebase Auth / Firestore</li>
              </ul>
            </div>

            <div className="skill-column">
              <div className="skill-card-header">
                <span className="skill-category">Studying</span>
              </div>
              <p className="skill-card-desc">현재 학습 중인 영역입니다.</p>
              <ul className="skill-list">
                <li>TypeScript</li>
                <li>REST API 연동</li>
                <li>UI 애니메이션</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS 섹션 */}
      <section id="projects" className="section projects-section">
        <div className="projects-inner">
          <h2 className="section-title">Projects</h2>
          <p className="projects-intro">
            지금까지 진행한 프로젝트입니다. 카드를 클릭하면 간단한 상세
            정보를 볼 수 있습니다.
          </p>
          <div className="projects-grid">
            <div
              className="project-card"
              onClick={() =>
                setSelectedProject({
                  title: "뽀모두 (Pomo-do)",
                  summary:
                    "Kotlin / Android Studio / Room DB 기반 뽀모도로 + 투두 Android 팀 프로젝트",
                  period: "2024.09 ~ 2024.12",
                  stack: "Kotlin · Android Studio · Room DB",
                  github: "https://github.com/JiYeongParkDev/Pomodo",
                  slides: [
                    {
                      title: "프로젝트 개요",
                      subtitle: "뽀모두 (Pomo-do)",
                      body:
                        "뽀모두는 뽀모도로 타이머와 할 일 목록을 결합해 집중 시간을 관리할 수 있도록 설계한 Android 앱입니다. Kotlin과 Android Studio, Room DB를 사용해 로컬에 타이머 기록과 할 일을 저장하고, 하루 작업 흐름을 한눈에 볼 수 있도록 구성했습니다.",
                    },
                    {
                      title: "주요 기능",
                      subtitle: "뽀모도로 타이머 · 할 일 관리 · 기록 화면",
                      body:
                        "사용자는 할 일을 등록하고 우선순위를 정한 뒤, 뽀모도로 타이머로 집중 시간을 관리할 수 있습니다. 타이머 세션이 끝날 때마다 기록이 저장되며, 기록 화면에서 하루 동안의 타이머 사용 내역과 피드백을 함께 확인할 수 있도록 구현했습니다.",
                    },
                    {
                      title: "담당 기능",
                      subtitle: "할 일(플래너) 기능 · 기록 UI(중앙~하단 캘린더)",
                      body:
                        "프로젝트에서 저는 할 일(플래너) 기능과 기록 페이지의 중앙~하단 UI 부분을 담당했습니다. 플래너에서는 사용자가 할 일을 추가·완료·정렬할 수 있는 투두리스트 기반 UI를 구현했고, 기록 화면에서는 하루 활동을 감정/피드백으로 남길 수 있는 표정 캘린더(중앙~하단 UI)를 직접 설계하고 작업했습니다.",
                    },
                    {
                      title: "프로젝트 회고",
                      subtitle: "Android UI 구성과 Room DB 경험",
                      body:
                        "여러 화면에서 공통으로 사용하는 요소와 상태를 어떻게 나눌지 고민하면서 Android UI 구조를 설계했습니다. 또한 Room DB를 이용해 로컬 데이터를 다루며 엔티티 설계, DAO 분리, 비동기 처리 흐름을 경험했습니다. 이 과정을 통해 이후 Android와 Kotlin 기반 프로젝트를 진행할 때 화면 구성과 데이터 구조를 더 안정적으로 설계할 수 있게 되었습니다.",
                    },
                  ],
                })
              }
            >
              <h3>뽀모두 (Pomo-do)</h3>
              <p>
                할 일 관리와 뽀모도로 타이머 기능을 결합한 Android 팀 프로젝트입니다. 집중 시간 관리와 작업 흐름 시각화를 고려해 설계했습니다.
              </p>
              <span className="project-tag">Kotlin · Android Studio</span>
            </div>
            <div
              className="project-card"
              onClick={() =>
                setSelectedProject({
                  title: "Book-Log (독서 기록 앱)",
                  summary: "Firebase / Firestore / Kotlin 기반 독서 기록 Android 앱",
                  period: "2025.03 ~ 2025.06",
                  stack: "Android · Kotlin · Firebase",
                  github: "https://github.com/JiYeongParkDev/BookLog",
                  description:
                    "2인 팀 프로젝트로, 책 검색 및 등록, 서재 화면, 날짜별 독서 기록을 한 번에 볼 수 있는 캘린더 뷰까지 구현한 Android 독서 기록 앱입니다.",
                  slides: [
                    {
                      title: "프로젝트 개요",
                      subtitle: "Book-Log (통합형 독서 기록 앱)",
                      body: "2인 팀 프로젝트로, 독서 기록과 독서 달력, 책탑 기능을 하나의 앱에서 관리할 수 있도록 설계한 Android 독서 기록 앱입니다. Firebase와 Firestore를 사용해 실시간 데이터 저장 및 동기화를 구현했습니다.",
                    },
                    {
                      title: "주요 기능",
                      subtitle: "서재 · 독서 캘린더 · 책탑",
                      body: "서재 화면에서는 사용자가 등록한 책을 표지와 제목으로 한눈에 볼 수 있고, 검색·정렬 기능을 지원합니다. 독서 캘린더에서는 날짜별로 읽은 책과 독서량을 달력 형태로 확인할 수 있습니다. 책탑에서는 기간별 독서량을 책 높이 그래프로 시각화해 성취감을 느낄 수 있도록 구성했습니다.",
                    },
                    {
                      title: "담당 기능",
                      subtitle: "책탑 기능 설계 및 구현",
                      body: "책탑 기능의 기획부터 UI 구성, Firebase 연동까지 전반적인 구현을 담당했습니다. 책 높이를 어떻게 비교할지 기준을 잡는 과정에서 어려움이 있었지만, 여러 차례 프로토타입을 만들며 시각적으로 이해하기 쉬운 형태로 개선했습니다.",
                    },
                    {
                      title: "프로젝트 회고",
                      subtitle: "Firebase와 협업 경험",
                      body: "처음 Firebase와 Firestore를 사용하면서 데이터 구조 설계와 비동기 처리 흐름을 이해하게 되었습니다. 또한 2인 팀으로 진행하며 화면 단위로 역할을 나누고 GitHub로 버전 관리를 하는 협업 방식을 경험했습니다. 이후 Android와 Firebase를 사용하는 다른 프로젝트에서도 이 경험을 적극적으로 활용하고 있습니다.",
                    },
                  ],
                })
              }
            >
              <h3>Book-Log (독서 기록 앱)</h3>
              <p>
                Android 독서 기록 앱으로, 책 등록, 서재, 독서 달력 기능을 구현했습니다.
              </p>
              <span className="project-tag">Android · Firebase</span>
            </div>

            <div
              className="project-card"
              onClick={() =>
                setSelectedProject({
                  title: "이미지 분류 모델 (MobileNet Transfer Learning)",
                  summary: "MobileNet 기반 전이학습 이미지 분류 프로젝트",
                  period: "2025.03 ~ 2025.06",
                  stack: "Python · TensorFlow · Keras",
                  slides: [
                    {
                      title: "프로젝트 개요",
                      subtitle: "이미지 분류 모델 구현 (MobileNet 기반)",
                      body: "본 프로젝트는 일상생활에서 흔히 접할 수 있는 사물(book, bottle, chair, cup)의 이미지를 분류하는 모델을 개발하는 것을 목표로 진행했습니다. 기본 CNN 모델을 구현한 뒤, 사전 학습된 MobileNet 모델을 활용한 전이학습(Transfer Learning) 기법을 적용하였으며, 그 결과 MobileNet 모델이 가장 높은 정확도를 기록했습니다."
                    },
                    {
                      title: "주요 실험 및 기능",
                      subtitle: "기본 CNN → 성능 개선 시도 → MobileNet 전이학습",
                      body: "기본 CNN 모델을 설계해 초기 성능을 측정한 뒤, 하이퍼 파라미터 변경·커널 크기 조정·데이터 증강·정규화·Dropout 적용 등 다양한 실험을 통해 성능을 개선했습니다. 마지막으로 MobileNet 기반 전이학습을 적용하여 적은 학습 시간으로 더 높은 정확도를 확보했습니다."
                    },
                    {
                      title: "프로젝트 회고",
                      subtitle: "데이터·실험 설계·모델 해석 경험",
                      body: "여러 실험을 비교하며 단순 정확도뿐 아니라 학습 곡선과 혼동 행렬을 확인하는 습관을 익혔습니다. 데이터 분할 및 증강 설정의 중요성을 체감했으며, 전이학습의 전체 흐름(CNN 베이스라인 → 사전 학습 모델 로딩 → 출력층 교체 → 미세조정)을 실무처럼 경험했습니다."
                    }
                  ],
                })
              }
            >
              <h3>이미지 분류 모델</h3>
              <p>
                MobileNet을 활용한 전이학습 기반 4클래스 이미지 분류 모델을 구현한 프로젝트입니다.
              </p>
              <span className="project-tag">TensorFlow · Keras</span>
            </div>

            <div
              className="project-card"
              onClick={() =>
                setSelectedProject({
                  title: "화장실 위치 공유 앱",
                  summary: "현재 위치를 기준으로 가까운 공중 화장실을 찾아주는 Android 팀 프로젝트",
                  period: "2025.03 ~ 2025.06",
                  stack: "Android · Google Maps API · Firebase",
                  github: "https://github.com/wonovar/toilet",
                  description:
                    "3인 팀 프로젝트로, 사용자의 현재 위치 주변 공중 화장실을 지도 기반으로 보여 주는 Android 앱입니다. Google Maps API와 Firebase Firestore를 사용해 위치 데이터를 저장하고, 마커 클릭 시 상세 정보와 길찾기 기능을 제공합니다.",
                  slides: [
                    {
                      title: "프로젝트 개요",
                      subtitle: "비상! 화장실 (공중 화장실 위치 공유 앱)",
                      body:
                        "사용자의 현재 위치를 기준으로 반경 500m 이내의 공중 화장실 정보를 제공하는 Android 앱입니다. Google Maps API와 Firebase Firestore를 사용해 화장실 위치를 지도 위에 마커로 표시하고, 마커를 클릭하면 이름·주소·개방 시간 등을 확인할 수 있도록 구현했습니다.",
                    },
                    {
                      title: "주요 기능",
                      subtitle: "현재 위치 기반 탐색 · 상세 정보 · 길찾기",
                      body:
                        "위치 권한을 허용하면 현재 위치를 중심으로 주변 공중 화장실을 지도에 마커로 시각화합니다. '근처 공중 화장실 찾기' 버튼으로 위치를 갱신할 수 있고, 마커를 선택하면 이름, 주소, 개방 시간, 기저귀 교환대 유무 등을 하단 시트에서 볼 수 있습니다. 상세 정보에서 '길찾기' 버튼을 누르면 Google 지도 앱과 연동되어 목적지까지의 경로 안내를 제공합니다.",
                    },
                    {
                      title: "담당 기능",
                      subtitle: "UI 디자인 · 상세 화면 설계 · 문서 작성",
                      body:
                        "3인 팀 프로젝트로 참여했으며, 메인 지도 화면과 상세 정보 BottomSheet의 UI 구성, 버튼 배치 등을 설계했습니다. 사용자가 한 화면에서 탐색·상세 보기·길찾기를 자연스럽게 이어서 사용할 수 있도록 사용자 흐름을 설계했고, 사용자 매뉴얼과 최종 결과 보고서 작성도 담당했습니다.",
                    },
                    {
                      title: "프로젝트 회고",
                      subtitle: "지도 기반 서비스와 Firebase 경험",
                      body:
                        "지도 중심 단일 화면에서 필요한 정보만 보여 주는 UI를 설계하면서, 위치 기반 서비스에서는 화면 전환보다 한 화면에서 흐름을 유지하는 것이 중요하다는 점을 배웠습니다. Firebase Firestore를 사용해 위치 데이터를 저장·조회하는 과정을 통해 데이터 구조 설계와 성능을 함께 고려하는 연습이 되었습니다.",
                    },
                  ],
                })
              }
            >
              <h3>화장실 위치 공유 앱</h3>
              <p>사용자가 근처 화장실 위치를 등록하고 조회할 수 있는 웹 프로젝트입니다.</p>
              <span className="project-tag">React · Firebase</span>
            </div>

            <div
              className="project-card"
              onClick={() =>
                setSelectedProject({
                  title: "KBO FA 성적 예측",
                  summary: "KBO FA 선수의 계약 후 첫 시즌 WAR 예측",
                  period: "2025.09 ~ 진행",
                  stack: "Python · Pandas · ML",
                  description:
                    "KBO FA 선수의 나이, 포지션, 직전 시즌 및 최근 3년 스탯을 입력 데이터로 사용해 계약 후 첫 시즌 WAR를 예측하는 머신러닝 모델을 구현한 프로젝트입니다.",
                  slides: [
                    {
                      title: "프로젝트 개요",
                      subtitle: "KBO FA 계약 후 첫 시즌 WAR 예측 모델",
                      body: "이 프로젝트는 KBO 리그 FA 계약 선수의 데이터를 기반으로, FA 계약 이후 첫 시즌의 WAR를 예측하는 회귀 모델을 구축하는 것이 목표입니다. 단순히 계약 규모만 보는 것이 아니라, 나이·포지션·직전 시즌 및 최근 3년 성적·팀 변경 여부·계약 정보 등을 함께 고려해 FA 계약이 실제 성적과 얼마나 연결되는지 분석하려고 합니다. 이를 통해 어떤 유형의 선수가 FA 이후에도 성과를 유지하거나 개선하는지를 데이터로 설명하는 것을 지향합니다."
                    },
                    {
                      title: "데이터 및 입력 변수",
                      subtitle: "계약 정보 + 최근 3년 성적 + 선수 특성",
                      body: "KBO 보도자료와 기록 사이트를 활용해 연도별 FA 승인 선수 중 실제로 계약한 선수들을 대상으로 데이터를 구축하고 있습니다. 입력 변수로는 계약 총액, 계약 연수, 나이, 포지션, 팀 변경 여부, 최근 3년 WAR_z와 wRC+_z/FIP_z 가중 평균, 출전 기회(PA 또는 IP), 성적 기울기(slope) 등을 사용합니다. 출력 값은 FA 계약 이후 첫 시즌의 WAR이며, 투수와 타자를 구분해 각각 적절한 지표를 사용하도록 설계하고 있습니다."
                    },
                    {
                      title: "진행 상황 및 향후 계획",
                      subtitle: "선수 리스트 정리 → 스탯 수집 → 모델 학습",
                      body: "현재는 FA 승인 선수 중 실제 계약 선수를 선별하고, 연도별 리스트를 정리하는 단계까지 진행되었습니다. 이후 각 선수별로 직전 시즌 및 최근 3년 성적 데이터를 크롤링하여 하나의 데이터셋으로 통합할 예정입니다. 데이터 정리가 완료되면 Python과 Pandas를 활용해 전처리를 수행하고 회귀 기반 머신러닝 모델을 여러 개 시도할 계획입니다. 단순 선형 회귀뿐 아니라 규제 회귀나 트리 계열 모델도 비교해 예측 성능을 평가할 예정이며, 최종적으로 어떤 변수들이 WAR에 가장 큰 영향을 주는지 해석하는 것까지를 목표로 하고 있습니다."
                    }
                  ]
                })
              }
            >
              <h3>KBO FA 성적 예측</h3>
              <p>
                FA 선수의 나이, 포지션, 최근 3년 스탯을 기반으로 계약 후 첫
                시즌 WAR를 예측하는 머신러닝 프로젝트입니다.
              </p>
              <span className="project-tag">Python · Machine Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT 섹션 */}
      <section id="contact" className="section contact-section">
        <div className="contact-inner">
          <h2 className="section-title">Contact</h2>
          <p className="contact-text">
            포트폴리오나 프로젝트 관련해서 언제든지 연락 주세요.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:ywjeongjeong@naver.com" className="contact-link">
                ywjeongjeong@naver.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">GitHub</span>
              <a
                href="https://github.com/wonovar"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                github.com/wonovar
              </a>
            </div>
          </div>
          <div className="contact-buttons">
            <a href="/assets/resume.pdf" className="download-btn" download>
              <span className="download-label">이력서 다운로드</span>
            </a>
            <a href="/assets/coverletter.pdf" className="download-btn" download>
              <span className="download-label">자기소개서 다운로드</span>
            </a>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <p className="modal-pill">Project Detail</p>
            <h3 className="modal-title">{selectedProject.title}</h3>
            {selectedProject.period && (
              <p className="modal-meta">
                <span className="meta-label">기간</span>
                <span className="meta-value">{selectedProject.period}</span>
              </p>
            )}
            {selectedProject.stack && (
              <p className="modal-meta">
                <span className="meta-label">기술 스택</span>
                <span className="meta-value">{selectedProject.stack}</span>
              </p>
            )}
            {selectedProject.github && (
              <p className="modal-meta">
                <span className="meta-label">GitHub</span>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-value"
                >
                  {selectedProject.github}
                </a>
              </p>
            )}
            {selectedProject.slides && selectedProject.slides.length > 0 ? (
              <div
                className="modal-slider"
                onMouseEnter={() => {
                  if (autoplayRef.current) clearInterval(autoplayRef.current);
                }}
                onMouseLeave={() => {
                  if (selectedProject && selectedProject.slides && selectedProject.slides.length > 1) {
                    autoplayRef.current = setInterval(() => {
                      setCurrentSlide(prev => (prev + 1) % selectedProject.slides.length);
                    }, 3000);
                  }
                }}
              >
                <div className="modal-slide">
                  <h4 className="slide-title">
                    {selectedProject.slides[currentSlide].title}
                  </h4>
                  {selectedProject.slides[currentSlide].subtitle && (
                    <p className="slide-subtitle">
                      {selectedProject.slides[currentSlide].subtitle}
                    </p>
                  )}
                  {selectedProject.slides[currentSlide].body && (
                    <p className="slide-body">
                      {selectedProject.slides[currentSlide].body}
                    </p>
                  )}
                  {/* 이미지는 추후 추가 예정 */}
                </div>
                <div className="slide-controls">
                  <button
                    type="button"
                    className="slide-arrow"
                    onClick={() => {
                      const total = selectedProject.slides.length;
                      setCurrentSlide((prev) => (prev - 1 + total) % total);
                    }}
                  >
                    ‹
                  </button>
                  <div className="slide-dots">
                    {selectedProject.slides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`slide-dot ${
                          index === currentSlide ? "active" : ""
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="slide-arrow"
                    onClick={() => {
                      const total = selectedProject.slides.length;
                      setCurrentSlide((prev) => (prev + 1) % total);
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            ) : (
              selectedProject.description && (
                <p className="modal-description">
                  {selectedProject.description}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}