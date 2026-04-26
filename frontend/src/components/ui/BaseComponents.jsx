import React from 'react';

export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'font-semibold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    const variants = {
      primary:
        'bg-active hover:bg-active-soft text-text-primary hover:shadow-glow-blue active:scale-97',
      destructive:
        'bg-anomaly hover:bg-anomaly-soft text-text-primary hover:shadow-glow-red active:scale-97',
      ghost:
        'bg-transparent hover:bg-bg-hover text-text-secondary hover:text-text-primary border border-border',
      icon: 'bg-transparent hover:bg-bg-hover text-text-secondary hover:text-text-primary',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs h-7',
      md: 'px-4 py-2 text-sm h-9',
      lg: 'px-6 py-3 text-base h-11',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  },
);

export const Badge = ({
  children,
  variant = 'neutral',
  pulse = false,
  className = '',
}) => {
  const variants = {
    anomaly: 'bg-anomaly-soft text-anomaly-text border border-anomaly',
    normal: 'bg-normal-soft text-normal-text border border-normal',
    uncertain: 'bg-uncertain-soft text-uncertain-text border border-uncertain',
    ood: 'bg-ood-soft text-ood-text border border-ood',
    active: 'bg-active-soft text-active-text border border-active',
    inactive: 'bg-bg-elevated text-text-muted border border-border',
    neutral: 'bg-bg-elevated text-text-secondary border border-border',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${pulse ? 'animate-pulse-badge' : ''} ${className}`}
    >
      {pulse && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

export const Panel = ({
  title,
  subtitle,
  children,
  variant = 'default',
  header = true,
  className = '',
  headerStripColor,
}) => {
  const variants = {
    default: 'bg-bg-panel border border-border',
    elevated: 'bg-bg-elevated border border-border-strong',
    'bordered-accent': 'bg-bg-panel border-2 border-active',
    ghost: 'bg-transparent',
  };

  return (
    <div
      className={`rounded-lg overflow-hidden ${variants[variant]} ${className}`}
    >
      {header && (
        <div
          className={`px-4 py-3 ${headerStripColor || 'bg-bg-elevated'} border-b border-border`}
        >
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {subtitle && (
            <p className="text-xs text-text-muted mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export const StatCard = ({
  label,
  value,
  subtext,
  trend,
  icon: Icon,
  className = '',
}) => {
  return (
    <Panel className={`min-w-[200px] ${className}`} header={false}>
      <div className="space-y-2">
        <div className="text-xs uppercase font-semibold text-text-muted tracking-wider">
          {label}
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-text-primary">{value}</div>
          {trend && (
            <div
              className={`text-sm ${trend > 0 ? 'text-normal' : 'text-anomaly'}`}
            >
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </div>
          )}
        </div>
        {subtext && (
          <div className="text-xs text-text-secondary">{subtext}</div>
        )}
      </div>
    </Panel>
  );
};

export const Table = ({
  columns,
  data,
  onRowClick,
  selectedRow,
  sortable = true,
}) => {
  const [sort, setSort] = React.useState({ key: null, dir: 'asc' });

  const sorted = [...data].sort((a, b) => {
    if (!sort.key) return 0;
    const aVal = a[sort.key];
    const bVal = b[sort.key];
    if (aVal < bVal) return sort.dir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-bg-elevated border-b border-border">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left font-semibold text-text-secondary text-xs uppercase tracking-wider cursor-pointer hover:bg-bg-hover"
                onClick={() => {
                  if (sortable) {
                    setSort({
                      key: col.key,
                      dir:
                        sort.key === col.key && sort.dir === 'asc'
                          ? 'desc'
                          : 'asc',
                    });
                  }
                }}
              >
                {col.label}{' '}
                {sort.key === col.key && (sort.dir === 'asc' ? '▲' : '▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-border hover:bg-bg-hover cursor-pointer transition-colors ${
                selectedRow === idx
                  ? 'bg-bg-selected border-l-2 border-l-active'
                  : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-text-secondary">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ProgressBar = ({ value, color, height = 'h-1.5' }) => {
  const colors = {
    teal: 'bg-normal',
    blue: 'bg-active',
    amber: 'bg-uncertain',
    red: 'bg-anomaly',
  };

  let barColor = colors.blue;
  if (value < 0.33) barColor = colors.teal;
  else if (value < 0.66) barColor = colors.amber;
  else barColor = colors.red;

  return (
    <div className={`w-full ${height} bg-bg-elevated rounded overflow-hidden`}>
      <div
        className={`${barColor || color} h-full transition-all`}
        style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
      />
    </div>
  );
};

export const Tooltip = ({ children, content, delay = 300 }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => {
          const timeout = setTimeout(() => setShow(true), delay);
          return () => clearTimeout(timeout);
        }}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-bg-elevated border border-border-strong rounded text-xs text-text-secondary whitespace-nowrap z-tooltip">
          {content}
        </div>
      )}
    </div>
  );
};

export const Divider = ({ orientation = 'horizontal', label }) => {
  if (orientation === 'vertical') {
    return <div className="w-px h-full bg-border" />;
  }

  if (label) {
    return (
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-text-muted">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }

  return <div className="h-px bg-border my-4 w-full" />;
};
