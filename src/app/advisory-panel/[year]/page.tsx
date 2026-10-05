import { notFound } from 'next/navigation';
import AdvisoryPanelView from '@/components/AdvisoryPanelView';

type Props = {
  params: Promise<{ year: string }>;
};

export default async function AdvisoryPanelYearPage({ params }: Props) {
  const { year } = await params;

  if (year !== '2026' && year !== '2027') {
    notFound();
  }

  return <AdvisoryPanelView year={year} />;
}
