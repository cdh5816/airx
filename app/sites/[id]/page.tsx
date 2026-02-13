import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

interface SitePageProps {
  params: { id: string };
}

export default async function SitePage({ params }: SitePageProps) {
  const site = await prisma.site.findUnique({ where: { id: params.id } });
  if (!site) {
    notFound();
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{site.name}</h1>
      <p>Address: {site.address}</p>
      <p>Contract Volume: {site.contractVolume} m²</p>
      <p>Panel Type: {site.panelType}</p>
      <p>Status: {site.status}</p>
      {/* TODO: Render tabs for overview, shipments, notes, requests, documents */}
    </div>
  );
}