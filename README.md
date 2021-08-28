# Doc
NODEJS  + EXPRESSJS + MONGODB

#Package

"eslint"
"@babel eslint"

package.json: type:"module", không cần dùng type: module vì đã convert bằng babel

if you use window and babel to compile then you can try:

{
  ...
  "start": "nodemon --exec ./node_modules/.bin/babel-node ./src/index.js",
  ...
}

npm install --save express
npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env @babel/plugin-transform-runtime
npm install --save @babel/runtime

cấu hình relative import for babel
https://www.npmjs.com/package/babel-plugin-module-resolver
-   Cau hinh trong config/mongodb.js
    tao 1 file export tat ca cac bien trong config 
- Mongoose vs Mongodb native => Lookup vs Popular 

  MongoDB alast / cluster 


  