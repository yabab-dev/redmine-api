const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

rollup.rollup({
    entry: 'src/redmine-api.js',
    plugins: [
      babel({
        runtimeHelpers: true,
        presets: [
          ['env', { modules: false }],
        ],
        plugins: [
          'external-helpers',
          ['transform-es2015-classes', { loose:true } ],
        ],
      }),
    ],
  })
  .then(function (bundle) {
    bundle.write({
      format: "umd",
      moduleName: "RedmineAPI",
      dest: "./dist/redmine-api.js",
      sourceMap: true
    });
  })
