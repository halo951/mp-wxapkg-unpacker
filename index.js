#!/usr/bin/env node

const np = require("path");
const cp = require("child_process");
const fs = require("fs");
const unpack = require("unpack-wxapkg/index");
const { Command } = require("commander");
const program = new Command();

program
  .command("unpack")
  .description("解包 wxapkg (如果失败, 先执行 unp decrypt 命令 解密 pc 端需要)")
  .requiredOption("-s, --src <src path>", "wxapkg 原始包地址")
  .option("-d, --dist <dist path>", "解压后文件存放路径")
  .action(({ src, dist }) => {
    if (!dist) {
      dist = src.replace(np.extname(src), "");
    }
    console.log("> src", src);
    console.log("> dist", dist);
    unpack(src, dist);
  });

program
  .command("decrypt")
  .description("解密 pc 端被压缩过的 wxapkg")
  .requiredOption("-s, --src <origin .wxapkg file>", "wxapkg 原始文件")
  .option(
    "-d, --dist <output file or directory>",
    `输出目录
      > 如果传入目录, 则执行 解密 + 解包
      > 如果传入'.wxapkg', 则仅执行解密
      > 如果不传, 则于传入目录执行操作相同
    `
  )
  .option(
    "-w --wxid <wechart mp appId>",
    "小程序/小游戏 的 appId (解密使用), 如果不传, 则会尝试通过src路径中查找"
  )
  .action(({ src, dist, wxid }) => {
    if (!wxid) {
      const fp = np.resolve(src);
      if (/wx\w+/.test(fp)) {
        wxid = fp.match(/(wx\w+)/)[1];
      }
    }
    if (!dist) {
      dist = src.replace(np.extname(src), "");
    }
    let isDir = !/\.wxapkg/.test(dist);

    console.log("> src", src);
    console.log("> dist", dist);
    console.log("> wxid", wxid);
    console.log("> isDir", isDir);
    if (isDir) {
      cp.execSync(
        [
          `pc_wxapkg_decrypt.exe`,
          `-in ${src}`,
          `-out dec.wxapkg`,
          `-wxid ${wxid}`,
        ].join(" ")
      );
      unpack(`dec.wxapkg`, dist);
      fs.unlinkSync("dec.wxapkg");
    } else {
      cp.execSync(
        [
          `pc_wxapkg_decrypt.exe`,
          `-in ${src}`,
          `-out ${dist}`,
          `-wxid ${wxid}`,
        ].join(" ")
      );
    }
    console.log("> success");
  });

program.parse();
