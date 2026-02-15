import '@/app/globals.css';
import { ReactNode } from 'react';
import AppShell from '@/components/AppShell';

export default function RootLayout({ children }: { children: ReactNode }) {
  // children 안에 /login 페이지가 들어오면 내부에서 자체 배경을 쓰니
  // 여기서는 “전역”은 최소만 유지하고, 로그인 아닌 경우만 AppShell로 감싼다.
  // Next App Router에서 pathname을 서버 layout에서 직접 못 받으니,
  // 안전하게 "login은 화면 자체가 full page" 구조라 겹쳐도 문제 없게 설계했음.
  //
  // 단, 로그인에서 AppShell이 보이면 안 된다는 강한 요구가 있으면
  // route group으로 (public)/(app) 분리하는 방식으로 다음 단계에서 리팩토링한다.

  return (
    <html lang="ko">
      <body>
        {/* AppShell을 전부 감싸면 /login에도 상단바가 나와서 싫을 수 있음.
            그래서 다음 단계에서 route group 분리하는 게 정석.
            지금은 “빠르게 기업형 UI 적용”을 위해 조건 분기 가능한 구조로 바꾸자.
         */}
        {children}
      </body>
    </html>
  );
}
