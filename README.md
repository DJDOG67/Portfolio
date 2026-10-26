# Portfolio

Automotive design portfolio — https://djdog67.github.io/Portfolio/

## 내용 수정은 `js/data.js` 하나만
- `name`, `title`, `tagline`: GNB 브랜드, 메인 타이틀, 소개 문장
- `contact`: 푸터와 MY INFO에 표시 (비우면 숨김)
- `carousel`: 메인 자동 슬라이드 — 16:9, 2560×1440px, WebP 권장
- `profile`: MY INFO 페이지 내용
- `items`: 메뉴별 카드. `cat`(3d / sketch / portfolio / etc), `type`(model / image / pdf)

## 파일 넣는 위치
- 3D 모델(.glb, 20MB 이하 권장), 이미지(.webp), PDF → `assets/works/`
- 썸네일 → 4:3, 1200×900px
- 프로필 사진 → `assets/info/`

## 페이지
- `index.html` 메인 (GNB · 타이틀 · 캐러셀 · 푸터)
- `works.html?cat=3d` 메뉴별 3열 카드 그리드
- `view.html?id=...` 상세 (3D 뷰어 / 이미지 / PDF + 설명)
- `info.html` MY INFO
