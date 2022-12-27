# 学生选课管理系统

本系统分为前端和后台两个部分。

前端项目文件夹为：course_selection_front

使用 Vue + element-ui 搭建的项目。



后台项目文件夹为 ： course_selection_server

后台使用 Node.js + Express 搭建的项目

数据库使用 Mysql



## 依赖安装

分别进入 course_selection_front 和 course_selection_server

文件夹，

命令行执行：`yarn`

或者 ： `npm install`



数据库需要下载 Mysql ，并打开数据库，提前建立好数据库和表。



## 运行

启动数据库



前端通过 命令

`yarn dev` 或者 `npm run dev` 进行运行



后台通过

`node app.js` 来运行



## 仅运行后台服务

进入 course_selection_server 文件夹

命令行执行 `yarn` or `npm install`

再执行 `node app.js`

访问 ： `http://localhost:3000` 即可打开页面



