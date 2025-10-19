import { ReactNode } from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, item: T, index: number) => ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T, index: number) => void;
  onRowDoubleClick?: (item: T, index: number) => void;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((item: T, index: number) => string);
  loading?: boolean;
  loadingMessage?: string;
}

export default function Table<T = Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  onRowDoubleClick,
  emptyMessage = "Nenhum item encontrado",
  className = "",
  headerClassName = "",
  rowClassName = "",
  loading = false,
  loadingMessage = "Carregando..."
}: TableProps<T>) {
  const getRowClassName = (item: T, index: number) => {
    const baseClasses = "hover:bg-gray-50 transition-colors duration-200 cursor-pointer";
    const customClasses = typeof rowClassName === 'function' 
      ? rowClassName(item, index) 
      : rowClassName;
    return `${baseClasses} ${customClasses}`.trim();
  };

  const getColumnAlignment = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <div className={`h-full overflow-hidden ${className}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full">
        <div className="overflow-auto h-full">
          <table className="w-full">
            <thead className={`bg-gray-50 border-b border-gray-200 ${headerClassName}`}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${getColumnAlignment(column.align)}`}
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                    {loadingMessage}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => onRowClick?.(item, index)}
                    onDoubleClick={() => onRowDoubleClick?.(item, index)}
                    className={getRowClassName(item, index)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 ${getColumnAlignment(column.align)}`}
                      >
                        {column.render 
                          ? column.render((item as Record<string, unknown>)[column.key], item, index)
                          : String((item as Record<string, unknown>)[column.key] || '')
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
