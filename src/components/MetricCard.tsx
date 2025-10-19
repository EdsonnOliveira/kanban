import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className={`text-xs ${color}`}>{change} este mês</p>
        </div>
        <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
