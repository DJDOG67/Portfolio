/* =========================================================
   SITE DATA — 사이트 내용은 이 파일만 고치면 됩니다.
   - 텍스트, 연락처, 캐러셀 이미지, 작품 카드를 여기서 관리
   - 이미지 경로는 index.html 기준 상대 경로 (예: assets/works/car01.webp)
   ========================================================= */

window.SITE = {
  /* GNB 왼쪽 브랜드 + 푸터에 표시 */
  name: "YOUR NAME",

  /* 메인 화면 큰 타이틀 (로고 자리) */
  title: "AUTOMOTIVE DESIGN PORTFOLIO",
  eyebrow: "Automotive · Mobility · Product",
  tagline: "Minimal surfaces, one strong character line. Concepts for mobility between vehicle and product.",

  /* 푸터 + MY INFO 연락처 (비워두면 표시 안 됨) */
  contact: {
    email: "your@email.com",
    instagram: "",          // 예: "https://instagram.com/yourid"
    behance: "",            // 예: "https://behance.net/yourid"
  },

  /* 메인 캐러셀 — 권장: 16:9, 2560×1440px, WebP, 장당 1MB 안팎 */
  carousel: [
    { src: "assets/placeholder/slide-01.svg", caption: "Project 01 — Side view" },
    { src: "assets/placeholder/slide-02.svg", caption: "Project 02 — Speedform" },
    { src: "assets/placeholder/slide-03.svg", caption: "Project 03 — User scene" },
    { src: "assets/placeholder/slide-04.svg", caption: "Project 04 — Rear view" },
  ],

  /* MY INFO 페이지 */
  profile: {
    photo: "",              // 예: "assets/info/profile.webp" (비우면 빈 프레임)
    statement: "I design mobility that sits between vehicle and product — starting from a persona, finding form in sculpture, and developing it through speedform and sketch.",
    education: [
      { period: "20XX — Present", text: "B.A. Automotive Design, University Name" },
    ],
    experience: [
      { period: "20XX", text: "Exhibition / Competition / Internship" },
    ],
    skills: ["Blender", "Photoshop", "Vizcom", "Hard-surface modeling", "Ballpoint sketching"],
  },

  /* =======================================================
     작품 카드
     cat:   "3d" | "sketch" | "portfolio" | "etc"
     type:  "model" (3D 뷰어, .glb) | "image" (이미지 여러 장) | "pdf"
     thumb: 카드 썸네일 (4:3 권장, 1200×900px)
     src:   model → "assets/works/xxx.glb"
            image → ["a.webp", "b.webp"]
            pdf   → "assets/works/xxx.pdf"
     위에 있는 카드가 먼저 보입니다. 새 작품은 맨 위에 추가하세요.
     ======================================================= */
  items: [
    {
      id: "speedform-01", cat: "3d", type: "model",
      title: "Speedform 01", year: "2026",
      thumb: "assets/placeholder/thumb-01.svg",
      src: "",
      description: "Sample card. Replace with your .glb file and a short description of the form intent.",
    },
    {
      id: "speedform-02", cat: "3d", type: "model",
      title: "Speedform 02", year: "2026",
      thumb: "assets/placeholder/thumb-02.svg",
      src: "",
      description: "Sample card.",
    },
    {
      id: "side-study", cat: "sketch", type: "image",
      title: "Side Study", year: "2026",
      thumb: "assets/placeholder/thumb-03.svg",
      src: ["assets/placeholder/slide-01.svg", "assets/placeholder/slide-04.svg"],
      description: "Sample card. A3 ballpoint sketches, scanned and refined in Photoshop.",
    },
    {
      id: "front-rear-study", cat: "sketch", type: "image",
      title: "Front & Rear Study", year: "2026",
      thumb: "assets/placeholder/thumb-04.svg",
      src: ["assets/placeholder/slide-02.svg"],
      description: "Sample card.",
    },
    {
      id: "project-01", cat: "portfolio", type: "pdf",
      title: "Project 01", year: "2026",
      thumb: "assets/placeholder/thumb-05.svg",
      src: "",
      description: "Sample card. Persona → Sculpture → Speedform → Side / Front / Rear → User scene.",
    },
    {
      id: "misc-01", cat: "etc", type: "image",
      title: "Mockup Fabrication", year: "2026",
      thumb: "assets/placeholder/thumb-06.svg",
      src: ["assets/placeholder/slide-03.svg"],
      description: "Sample card.",
    },
  ],
};
