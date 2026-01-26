interface MobileListProps {
  items: string[];
}

export default function MobileList({ items }: MobileListProps) {
  return (
    <div className="block sm:hidden">
      <ul className="list-decimal pl-6 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-xl mb-4 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
