/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

"use client";

import React, { useMemo, useState } from "react";
import { TopBar } from "@/components/topbar/TopBar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useFavorites } from "@/lib/hooks/useFavorites";

type SiteStatus = "영업중" | "계약완료" | "공사중" | "준공" | "종료";
type Site = {
  id: string;
  name: string;
  address: string;
  status: SiteStatus;
  manager?: string;
  // 출하 임박순 정렬 기준(없으면 null)
  nextShipmentDue?: string | null; // ISO
};

const TABS: { key: "ALL" | SiteStatus; label: string }[] = [
  { key: "ALL", label: "전체" },
  { key: "영업중", label: "영업중" },
  { key: "계약완료", label: "계약완료" },
  { key: "공사중", label: "공사중" },
  { key: "준공", label: "준공" },
  { key: "종료", label: "종료" },
];

// 샘플 데이터 (Phase 1: UI 확정용)
const SAMPLE_SITES: Site[] = [
  {
    id: "s1",
    name: "평촌 도서관",
    address: "경기도 안양시 동안구 ...",
    status: "공사중",
    manager: "공사팀 최실장",
    nextShipmentDue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(), // 내일
  },
  {
    id: "s2",
    name: "MTW 근로자지원시설",
    address: "서울특별시 ...",
    status: "계약완료",
    manager: "수주팀 김대리",
    nextShipmentDue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "s3",
    name: "동두천 교육지원청",
    address: "경기도 동두천시 ...",
    status: "영업중",
    manager: "영업팀 박과장",
    nextShipmentDue: null,
  },
  {
    id: "s4",
    name: "대구 ○○빌딩",
    address: "대구광역시 ...",
    status: "준공",
    manager: "생산관리팀 이대리",
    nextShipmentDue: null,
  },
];

function formatDue(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}`;
}

function StatusBadge({ status }: { status: SiteStatus }) {
  // 상태색 남발 금지: 배경은 아주 연하게, 텍스트는 중성톤
  return (
    <span className="inline-flex items-center px-2.5 h-6 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
      {status}
    </span>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("ALL");
  const [onlyFav, setOnlyFav] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  const sites = useMemo(() => {
    let list = [...SAMPLE_SITES];

    // 탭 필터
    if (tab !== "ALL") list = list.filter((s) => s.status === tab);

    // 즐겨찾기만
    if (onlyFav) list = list.filter((s) => isFavorite(s.id));

    // 기본 정렬: 출하 임박순(B)
    list.sort((a, b) => {
      const ad = a.nextShipmentDue ? new Date(a.nextShipmentDue).getTime() : Number.POSITIVE_INFINITY;
      const bd = b.nextShipmentDue ? new Date(b.nextShipmentDue).getTime() : Number.POSITIVE_INFINITY;
      if (ad !== bd) return ad - bd;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [tab, onlyFav, isFavorite]);

  return (
    <div>
      <TopBar
        companyName="OREX"
        onOpenFavorites={() => setOnlyFav((v) => !v)}
        onOpenSearch={() => alert("검색 모달(Phase 1) — 다음 스텝에서 붙임")}
        onOpenNotifications={() => alert("알림 드롭다운(Phase 1) — 다음 스텝에서 붙임")}
        onLogout={() => alert("로그아웃(Phase 2) — 인증 붙일 때 연결")}
      />

      <main
        className="mx-auto max-w-6xl"
        style={{
          paddingLeft: "var(--pad-x)",
          paddingRight: "var(--pad-x)",
          paddingTop: 18,
          paddingBottom: 28,
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-[20px] font-semibold text-gray-900 leading-7">
              대시보드
            </h1>
            <p className="text-sm text-[var(--muted)]">
              기본 정렬: 출하 임박순 · 상태 탭으로 빠르게 필터링
            </p>
          </div>

          <button
            type="button"
            className="
              h-10 px-4 rounded-xl
              bg-[var(--cobalt-500)] text-white text-sm font-medium
              hover:bg-[var(--cobalt-600)]
              transition
              shadow-[var(--shadow-sm)]
            "
            onClick={() => alert("현장 생성(Phase 2) — 권한/DB 붙일 때 활성")}
          >
            현장 생성
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={[
                  "h-9 px-3 rounded-xl text-sm font-medium transition",
                  active
                    ? "bg-white text-[var(--cobalt-500)] shadow-[var(--shadow-sm)] border border-gray-100"
                    : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/70",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}

          <div className="flex-1" />

          {/* Favorites toggle */}
          <button
            type="button"
            onClick={() => setOnlyFav((v) => !v)}
            className={[
              "h-9 px-3 rounded-xl text-sm font-medium transition border",
              onlyFav
                ? "bg-white text-[var(--cobalt-500)] border-gray-100 shadow-[var(--shadow-sm)]"
                : "bg-transparent text-gray-600 border-transparent hover:bg-white/70 hover:border-gray-100",
            ].join(" ")}
            aria-pressed={onlyFav}
          >
            ⭐ 즐겨찾기만
          </button>
        </div>

        {/* KPI (샘플) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <Card>
            <CardHeader>
              <div className="text-xs text-[var(--muted)]">진행 현장</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">{SAMPLE_SITES.length}</div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700">
                코발트는 숫자/활성만 사용 (색 최소화)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-xs text-[var(--muted)]">오늘/임박 출하</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">
                {SAMPLE_SITES.filter((s) => s.nextShipmentDue).length}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700">출하 임박순 정렬로 실행 우선순위 고정</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-xs text-[var(--muted)]">미처리 요청</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">2</div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700">요청/문서/출하 확정 시 알림 트리거</div>
            </CardContent>
          </Card>
        </div>

        {/* Site Cards */}
        <div className="space-y-3">
          {sites.map((s) => (
            <Card key={s.id} className="hover:shadow-[var(--shadow-md)] transition">
              <div className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge status={s.status} />
                    <span className="text-xs text-[var(--muted)]">
                      출하 {formatDue(s.nextShipmentDue)}
                    </span>
                  </div>

                  <div className="text-[15px] font-semibold text-gray-900 truncate">
                    {s.name}
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-1 line-clamp-2">
                    {s.address}
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    담당: {s.manager ?? "—"}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={[
                      "h-9 w-9 rounded-xl border text-sm transition",
                      isFavorite(s.id)
                        ? "border-gray-100 bg-white text-[var(--cobalt-500)] shadow-[var(--shadow-sm)]"
                        : "border-transparent bg-transparent text-gray-500 hover:bg-white/70 hover:border-gray-100",
                    ].join(" ")}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(s.id);
                    }}
                    aria-label="즐겨찾기"
                    title="즐겨찾기"
                  >
                    ⭐
                  </button>

                  <button
                    type="button"
                    className="h-9 w-9 rounded-xl border border-transparent text-gray-500 hover:bg-white/70 hover:border-gray-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("QR 생성(Phase 1) — 다음 스텝에서 모달/토큰/공개범위 붙임");
                    }}
                    aria-label="QR 생성"
                    title="QR 생성"
                  >
                    📷
                  </button>

                  <button
                    type="button"
                    className="h-9 px-3 rounded-xl bg-white border border-gray-100 text-sm font-medium text-gray-700 hover:text-gray-900 hover:shadow-[var(--shadow-sm)] transition"
                    onClick={() => alert(`현장 상세(Phase 1) — 다음 스텝에서 /sites/${s.id} 탭 구조 붙임`)}
                  >
                    열기
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {sites.length === 0 && (
            <Card>
              <div className="px-5 py-10 text-center">
                <div className="text-sm text-gray-700 font-medium">표시할 현장이 없습니다</div>
                <div className="text-sm text-[var(--muted)] mt-1">
                  필터/즐겨찾기 조건을 확인하세요.
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
