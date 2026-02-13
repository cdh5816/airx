import { prisma } from '@/lib/db';

export default async function ProductionPage() {
  const plans = await prisma.productionPlan.findMany({ include: { site: true } });
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Production Management</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Site</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Production</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Paint</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shipment</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan) => (
            <tr key={plan.siteId}>
              <td className="px-3 py-2 whitespace-nowrap">{plan.site.name}</td>
              <td className="px-3 py-2">{plan.plannedProductionVolume ?? '-'}</td>
              <td className="px-3 py-2">{plan.plannedPaintVolume ?? '-'}</td>
              <td className="px-3 py-2">{plan.plannedShipmentVolume ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}