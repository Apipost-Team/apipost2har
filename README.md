<p align="center">
  <a href="https://adesign.apipost.cn/" target="_blank">
    <img alt="A-Design Logo" width="360" src="https://img.cdn.apipost.cn/cdn/opensource/apipost-opensource.svg" />
  </a>
</p>
apipost2har 是一个apipost JSON 到 Har 数据 的转换器。

# 🎉 特性

- 支持格式 
- Apipost JSON
# 安装

```shell
npm i apipost2har
```

# 基础使用
需引入：

```js
import apipost2har from 'apipost2har';
const converter = new apipost2har();
const convertResult= converter.convert(ApipostJson);
```
**检查结果:**

```js
convertResult.status === "error"
```
**对于不成功的转换。检查 convertResult.message**

```js
convertResult.status === "success"
```
**成功转换,结果在convertResult.data中**

# 开源协议

apipost2har 遵循 [MIT 协议](https://github.com/Apipost-Team/apipost2har)。
