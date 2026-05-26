import React from 'react';
import { AppBar, Tab, Tabs } from '@mui/material';
import { hasRole } from '../../utils/token.js';
/* usage
<SimpleTabs
  tabs={[
    {
      label: 'Org Info',
      content: (<x></x>)
    }
  ]}
/>
*/

const SimpleTabs = ({ tabs, activeTab = 0, onChange }: any) => {
  const [tab, setTab] = React.useState(Number(activeTab));
  React.useEffect(() => {
    setTab(Number(activeTab)); // update state when params change
  }, [activeTab]);

  const visibleTabs = tabs.filter((t: any) => !t.role || hasRole(t.role));

  return (
    <AppBar position="static" color="default">
      <Tabs
        value={tab}
        onChange={(e, i) => {
          setTab(i);
          onChange && onChange(i);
        }}
        textColor="primary">
        {visibleTabs.map((t: any, i: number) => {
          return <Tab label={t.label} key={`simpletab${i}`} />;
        })}
      </Tabs>
      {visibleTabs[tab]?.content}
    </AppBar>
  );
};

export default SimpleTabs;
