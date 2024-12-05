import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import url from 'node:url'
import mockjs from 'mockjs'

const viteMockServer = (): Plugin => {
  return {
    name: "vite-mock-server",
    //使用vite插件的钩子函数
    configureServer(server) {
      server.middlewares.use('/api/list', async (req, res) => {
        const parsedUrl = url.parse(req.originalUrl, true);
        //获取url参数 true表示返回对象 {keyWord: 'xx'}
        const query = parsedUrl.query;
        res.setHeader('Content-Type', 'application/json')
        const data = mockjs.mock({
          //返回1000条数据
          "list|1000": [
            {
              "id|+1": 1, //id自增
              "name": query.keyWord, //name为url参数中的keyWord
              'address': '@county(true)', //address为随机地址
            }
          ]
        })
        //返回数据
        res.end(JSON.stringify(data))
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServer()],
})
