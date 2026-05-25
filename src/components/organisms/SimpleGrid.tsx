import { Grid } from '@mui/material';

/*
usage:
  <SimpleGrid
    spacing={6}
    items={[
      { content: <component />, size: 4 },
      { content: <component />, size: 4 },
      { content: <component />, size: 4 },
      { content: <component />, size: 4 },
      { content: <component />, size: 4 },
      { content: <component />, size: 4 },
    ]}
  />
*/

const size_props = (size: any) => {
  if (typeof size === 'object') {
    return size;
  }
  switch (size) {
    case 3:
    case 4:
      return { lg: size, md: 6, sm: 12, xs: 12 };
    default:
      return { lg: size, md: 12, sm: 12, xs: 12 };
  }
};

interface GridItem {
  content: any;
  size?: number;
}
interface SimpleGridProps {
  items: GridItem[];
  spacing?: number;
}

const SimpleGrid = ({ items, spacing = 3 }: SimpleGridProps) => {
  return (
    <Grid container spacing={spacing}>
      {items
        .filter((t: any) => !!t.content)
        .map((it: any, i: number) => {
          const size = size_props(it.size || 12);
          return (
            <Grid key={`grid_item_${i}`} size={size}>
              {it.content}
            </Grid>
          );
        })}
    </Grid>
  );
};

export default SimpleGrid;
