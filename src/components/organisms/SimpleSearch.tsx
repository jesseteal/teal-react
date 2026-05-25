import { Box, InputBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Icon from '../atoms/Icon';

export default function SimpleSearch({
  onFilter,
  initialFilter = '',
}: {
  onFilter: any;
  initialFilter?: string;
}) {
  const [term, setTerm] = useState<string>(initialFilter);
  useEffect(() => {
    onFilter(term);
    // eslint-disable-next-line
  }, [term]);
  return (
    <Box sx={{ mx: 2, my: 1 }}>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Icon.Search />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Filter results"
        slotProps={{ input: { 'aria-label': 'filter results' } }}
        value={term}
        onChange={(e: any) => setTerm(e.target.value)}
      />
      {term && (
        <IconButton
          onClick={() => setTerm('')}
          type="button"
          sx={{ p: '10px' }}
          aria-label="search">
          <Icon.Clear />
        </IconButton>
      )}
    </Box>
  );
}
