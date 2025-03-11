# webpack-linters_template

Template repository which includes configurations files for Webpack, esLint and Prettier

# reference links

https://www.theodinproject.com/lessons/node-path-javascript-revisiting-webpack#template-repositories
https://webpack.js.org/guides/production/
https://www.theodinproject.com/lessons/node-path-javascript-linting
https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page

# scripts

- npm run build => npx webpack
- npm run dev => npx webpack serve
- npm run deploy => git subtree push --prefix dist origin gh-pages

## remember to run

npm init @eslint/config

I didn´t set a configuration in the template so it can be changed in the future

After running the command mentioned above run
npm install --save-dev eslint-config-prettier
