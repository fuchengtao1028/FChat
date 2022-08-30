# FChat
聊天交友平台 作者：傅成涛



项目由作者一人开发完成
部署方式如下：


1.请于application.yml配置相应mysql与redis信息
2.请于entity包下config.java配置榛子云平台信息 若采用其他第三方平台，请自行引入相关依赖
3.本项目采用druid数据源，请于config包下DruidConfig.java下完成相应配置 若采用其他数据源，请自行引入相关依赖
4.目前文件传输相关功能被禁用 若需启用，请于index.html相应方法中更改相应逻辑
5.若不采用springboot内嵌tomcat请去除config包下的websocket相关配置



欢迎交流 2022/8/30