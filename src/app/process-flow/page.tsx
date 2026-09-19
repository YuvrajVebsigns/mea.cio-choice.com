import processFlowData from '@/data/process-flow.json';

export const metadata = {
  title: 'Process and Flow',
  description:
    'CIO CHOICE has a 3 stage easy and simple process for product, solution, and service recognition.',
};

interface ProcessStage {
  id: string;
  title: string;
  defaultOpen?: boolean;
  items?: string[];
  paragraphs?: string[];
}

interface ProcessFlowData {
  hero: {
    label: string;
    title: string;
    description: string;
  };
  stages: ProcessStage[];
}

function renderFormattedText(text: string) {
  if (!text.includes('**')) {
    return text;
  }

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export default function ProcessPage() {
  const data: ProcessFlowData = processFlowData;

  return (
    <main className="process-page">
      <section className="process-container">
        <div className="process-hero">
          <p className="process-label">{data.hero.label}</p>

          <h1>{data.hero.title}</h1>

          <p>{data.hero.description}</p>
        </div>

        {data.stages.map((stage) => (
          <details key={stage.id} open={stage.defaultOpen} className="process-card">
            <summary>{stage.title}</summary>

            <div>
              {stage.items && stage.items.length > 0 && (
                <ol>
                  {stage.items.map((item, index) => (
                    <li key={index}>{renderFormattedText(item)}</li>
                  ))}
                </ol>
              )}

              {stage.paragraphs && stage.paragraphs.length > 0 && (
                <>
                  {stage.paragraphs.map((paragraph, index) => (
                    <p key={index}>{renderFormattedText(paragraph)}</p>
                  ))}
                </>
              )}
            </div>
          </details>
        ))}
      </section>
    </main>
  );
}
