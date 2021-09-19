# Doc
NODEJS  + EXPRESSJS + MONGODB

# Deployed : https://trello-lamnntug.web.app/
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


28/08/2021
- Mongoose vs Mongodb native => Lookup vs Popular 
  + Cau hinh trong config/mongodb.js
    tao 1 file export tat ca cac bien trong config
  + MongoDB alast / cluster 
  + Sử dụng mongodb => quản lý  = long polling để dụng lại intance mongodb
  + Sử dụng Joi validate và khai báo schema của mongoDB 

02/09/2021
- Validate request khai bao model 
- to chuc folow HttpRequest -> router ->( Middleware + validation ) -> controller -> service -> Models -> database

12/09/2021
- Api get full board -> handle data giống với mock data bên react
- Sử dụng query của mongodb : .insertOne, .findOneAndUpdate, .aggregate { .$match . $lookUp , ...} 
