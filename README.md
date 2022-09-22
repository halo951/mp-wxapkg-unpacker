# 微信小程序(小游戏) wxapkg 包 解包工具, 支持 pc 端加密包解包

> 感谢:
>
> [pc_wxapkg_decrypt](https://github.com/BlackTrace/pc_wxapkg_decrypt)
>
> [unpack-wxapkg](https://github.com/qwerty472123/wxappUnpacker)

# 使用方式

```
yarn global add mp-wxapkg-unpakcer
```

- 首先尝试直接解包 (解压出来打包好的目录)

```
unp-unpack <src>.wxapkg <dist path>
```

- 如果失败, 则按下面顺序执行

```
# 解密
unp-decrypt <src>.wxapkg <decrypt>.wxapkg

# 解包
unp-unpack <decrypt>.wxapkg <dist path>
```