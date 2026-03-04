/**
 * SectionPlaceholder Component
 *
 * Fallback placeholder shown while lazy-loaded sections are loading.
 * Provides visual continuity during code splitting.
 */

interface SectionPlaceholderProps {
  height?: string;
  backgroundColor?: string;
}

export function SectionPlaceholder({
  height = '400px',
  backgroundColor = '#000000',
}: SectionPlaceholderProps) {
  return (
    <div
      style={{
        height,
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
      className="animate-pulse"
    >
      <div className="text-gray-700 text-sm">Loading...</div>
    </div>
  );
}
