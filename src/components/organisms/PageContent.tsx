import { Box } from '@mui/material';
import PageHeader, { PageHeaderProps } from './PageHeader.js';
import PageTabs, { PageTabProps } from './PageTabs.js';
import Loading from '../molecules/Loading.js';

export default function PageContent({
  children,
  header,
  loading,
  tabs,
}: {
  children: any;
  header?: PageHeaderProps;
  loading?: boolean;
  tabs?: PageTabProps;
}) {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Loading />
      </Box>
    );
  }
  return (
    <>
      {header && <PageHeader {...header} />}
      {tabs && <PageTabs {...tabs} />}
      <Box component="main" sx={{ flex: 1, py: 2, px: 2, bgcolor: '#eaeff1' }}>
        {children}
      </Box>
    </>
  );
}
