const entrypoints = [
  '@jesseteal/teal-react',
  '@jesseteal/teal-react/components',
  '@jesseteal/teal-react/hooks',
  '@jesseteal/teal-react/mui',
  '@jesseteal/teal-react/utils',
];

await Promise.all(entrypoints.map((entrypoint) => import(entrypoint)));

console.log(`Validated ${entrypoints.length} package entrypoints.`);
