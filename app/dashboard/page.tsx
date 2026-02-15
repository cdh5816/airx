import Link from 'next/link';
import AppShell from '@/components/AppShell';

const tabs = [
  { key: 'sales', label: '영업현장' },
  { key: 'contract', label: '계약완료' },
  { key: 'construction', label: '공사현장' },
  { key: 'done', label: '완료현장' },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">
            현장 상태를 기준으로 업무를 관리합니다.
          </p>
        </div>

        <Link
          href="/sites/new"
          className="h-9 px-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 flex items-center"
        >
          현장 생성
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <span
            key={t.key}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-800 border border-gray-200"
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">미처리 요청</div>
          <div className="mt-2 text-2xl font-semibold">0</div>
          <div className="mt-3">
            <Link href="/notifications" className="text-sm text-blue-600 hover:underline">
              알람 보기
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">공사 진행 현장</div>
          <div className="mt-2 text-2xl font-semibold">0</div>
          <div className="mt-3 text-xs text-gray-400">
            다음 단계에서 DB 연동으로 자동 집계됩니다.
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">출하 확정 누적</div>
          <div className="mt-2 text-2xl font-semibold">0</div>
          <div className="mt-3 text-xs text-gray-400">
            다음 단계에서 Shipment CONFIRMED 합계로 표시됩니다.
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">현장 목록</h2>
          <div className="text-sm text-gray-500">검색/탭 필터는 다음 단계에서 구현</div>
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-medium px-4 py-3">상태</th>
                <th className="text-left font-medium px-4 py-3">현장명</th>
                <th className="text-left font-medium px-4 py-3">주소</th>
                <th className="text-left font-medium px-4 py-3">계약물량</th>
                <th className="text-left font-medium px-4 py-3">판넬코드</th>
                <th className="text-left font-medium px-4 py-3">최근 출하확정일</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3 text-gray-400" colSpan={6}>
                  아직 현장이 없습니다. 우측 상단 “현장 생성”을 눌러 시작하세요.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
