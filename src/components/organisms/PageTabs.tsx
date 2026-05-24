import { AppBar, Tabs, Tab } from '@mui/material';

export interface PageTabProps {
  tabs: string[];
  tabIndex: number;
  onTabSelect: (i: number) => void;
}
//
export default function PageTabs({
  tabs,
  tabIndex,
  onTabSelect,
}: PageTabProps) {
  return (
    <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
      <Tabs
        value={tabIndex}
        textColor="inherit"
        onChange={(e, val) => onTabSelect(val)}>
        {tabs.map((tab, i) => (
          <Tab key={`tab${i}`} label={tab} />
        ))}
      </Tabs>
    </AppBar>
  );
}
