import React from 'react';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className = '', children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={`tabs ${className}`} data-active-tab={activeTab}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <div className="flex space-x-2 border-b border-gray-200 mb-4">
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }> = ({
  value,
  children,
  activeTab,
  setActiveTab
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === value
          ? 'text-glamour-gold border-b-2 border-glamour-gold'
          : 'text-gray-600 hover:text-glamour-gold'
      }`}
      onClick={() => setActiveTab?.(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({
  value,
  children,
  activeTab
}) => {
  if (activeTab !== value) return null;
  return <div className="pt-4">{children}</div>;
};