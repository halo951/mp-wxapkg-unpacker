# 微信小程序(小游戏) wxapkg 包 解包工具, 支持 pc 端加密包解包

> 感谢:
>
> [pc_wxapkg_decrypt](https://github.com/BlackTrace/pc_wxapkg_decrypt)
>
> [unpack-wxapkg](https://github.com/qwerty472123/wxappUnpacker)

# 使用方式

```
yarn global add mp-wxapkg-unpacker
```

- window环境微信小程序包目录

> C:\Users\Administrator\Documents\WeChat Files\Applet\

- 首先尝试直接解包 (解压出来打包好的目录)

```
# 解包
unp unpack -s <decrypt>.wxapkg
```

- 如果失败, 则按下面顺序执行

```
# 解密
unp decrypt -s <src>.wxapkg -d <decrypt>.wxapkg

# 解密并解包 (pc 端)
unp decrypt -s <src>.wxapkg

# 解包
unp unpack -s <decrypt>.wxapkg

# 解包 (指定输出目录)
unp unpack -s <decrypt>.wxapkg -d <dist path>
```
