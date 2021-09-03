# Getting Start

## 1. 安装依赖

> `npm install`

## 2. 启动react项目

> `npm start`

## 3. 启动electron项目

> `npm run electron`

## 4. 打包项目

> **第一步**
>
> 确保`package.json`中`DEV`值为false
>
> `npm run build` 

> **第二步**
>
> 管理员身份打开cmd，输入以下指令
>
> ```
> npm run package appName --platform=win32 --arch=x64 --download.mirror=https://npm.taobao.org/mirrors/electron/ --out=outName --overwrite --no-package-manager --ignore="(.git|node_modules)"
> ```

## DEV tool
打开调试工具
Windows： ctrl+shift+I
Mac： Cmd+Option+I