import { PropsWithChildren, useState } from "react";

// 调用渲染属性以自定义渲染
interface TabSwitcherProps extends PropsWithChildren{
  tabIds: string[];
  getHeader: (tabId: string) => string;
  renderContent: (tabId: string) => React.ReactNode;
}

function TabSwitcher(props: TabSwitcherProps) {
  const { tabIds, getHeader, renderContent } = props;
  const [ selectedId, setSelectedId ] = useState(tabIds[0]);
  return (
    <>
      {tabIds.map((tabId) => (
        <button
          key={tabId}
          onClick={() => setSelectedId(tabId)}
        >
          {getHeader(tabId)}
        </button>
      ))}
      <hr />
      <div key={selectedId}>
        <h3>{getHeader(selectedId)}</h3>
        {renderContent(selectedId)}
      </div>
    </>
  );
}

export default function App() {
  return (
    <TabSwitcher
      tabIds={['first', 'second', 'third']}
      getHeader={tabId => {
        return tabId[0].toUpperCase() + tabId.slice(1);
      }}
      renderContent={tabId => {
        return <p>This is the {tabId} item.</p>;
      }}
    />
  );
}
