# Pokemon Card Flip

**포켓몬 카드 매칭 게임 + 도감(Pokedex)**

Pokemon Card Flip은 동일한 포켓몬 카드를 매칭하는 메모리(카드 뒤집기) 방식의 게임입니다. 난이도별 게임 규칙(시간 제한, 점수/콤보 시스템)이 적용되며, 게임 기록과 도감의 북마크 정보는 전역 상태 관리 라이브러리인 **Zustand**로 관리합니다. 하이 스코어와 플레이 기록, 북마크는 브라우저의 `localStorage`에 저장되어 재접속 시에도 유지됩니다.

---

**배포 링크**

https://poke-card-flip.vercel.app/

---

## 주요 기능

### 1. 카드 매칭 게임

* 카드를 뒤집어 동일한 포켓몬을 매칭
* 난이도(📌 Easy / Normal / Hard)에 따라 카드장수 달라짐
* 콤보 보너스 
* 게임 결과(점수, 콤보, 시간 등)를 로컬에 저장하여 하이 스코어 기록
* 게임 플레이 상태는 Zustand Store에서 관리

### 2. 도감 (Pokedex)

* 포켓몬 목록 및 상세 페이지 제공
* 타입, 이름 등으로 정렬 기능
* 북마크(즐겨찾기) 기능 — Store로 상태 공유
* 북마크는 페이지 이동 및 새로고침 후에도 유지

### 3. 다크 모드

* Tailwind CSS 기반
* 다크/라이트 테마 선택을 Store에서 관리
* 테마 변경 시 UI가 동적으로 반영됨

---

## 기술 스택

* **Framework**: React (+ Vite)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **데이터 저장**: 브라우저 localStorage
* **Design** : Figma
* **배포** : Vercel
  
---







