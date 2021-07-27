module.exports = function createPackageJson({ name = 'richmedia-temple' }) {
  return {
    name,
    version: '1.0.0',
    description: '',
    homepage: '',
    author: '',
    engines: {
      npm: '>= 14.9.0',
    },
    scripts: {
      dev: "rds-dev",
      build: "rds-build",
      preview: './node_modules/.bin/henk',
    },
    license: 'ISC',
    dependencies: {
      "@mediamonks/richmedia-temple-server": "^7.3.13",
      "@mediamonks/temple": "^6.0.2",
      "@mediamonks/henk": "^1.1.1",
    },
  };
};
