import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { hasRole } from '../../utils/token';
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
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={tab}
        onChange={(e, i) => {
          setTab(i);
          onChange && onChange(i);
        }}
        textColor="primary">
        {tabs.map((t: any, i: number) => {
          if (t.role && !hasRole(t.role)) return null;
          return <Tab label={t.label} key={`simpletab${i}`} />;
        })}
      </Tabs>
      {tabs[tab].content}
    </AppBar>
  );
};

export default SimpleTabs;
