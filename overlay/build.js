#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('用法: node replace-html.js <模板JS文件> <HTML文件> [输出文件]');
    console.error('示例: node replace-html.js inject.js panel.html inject-output.js');
    process.exit(1);
}
const [templatePath, htmlPath, outputPath] = args;
// 读取文件
if (!fs.existsSync(templatePath)) {
    console.error(`❌ 模板文件不存在: ${templatePath}`);
    process.exit(1);
}
if (!fs.existsSync(htmlPath)) {
    console.error(`❌ HTML 文件不存在: ${htmlPath}`);
    process.exit(1);
}
let template = fs.readFileSync(templatePath, 'utf-8');
let html = fs.readFileSync(htmlPath, 'utf-8');
// 1. 压缩为一行：统一换行符 → 移除换行 → 合并连续空白
html = html
    .replace(/\r\n/g, '\n')      // Windows 换行符统一
    .replace(/\n/g, ' ')         // 换行变空格
    .replace(/\s+/g, ' ')        // 多个空白（制表符、空格等）合并为一个
    .trim();
// 2. 转义：目标位置是模板字符串 `` `...` `` 内部
// 必须处理反斜杠、反引号、${ 插值语法，否则会导致生成的 JS 语法错误或注入
html = html
    .replace(/\\/g, '\\\\')      // 反斜杠最先处理，避免重复转义
    .replace(/`/g, '\\`')        // 转义反引号
    .replace(/\$\{/g, '\\${');   // 转义 ${ 防止模板字符串表达式注入
// 3. 替换模板中的占位符
if (!template.includes('__HTML_REPLACE_STR__')) {
    console.error('❌ 模板中未找到占位符 __HTML_REPLACE_STR__');
    process.exit(1);
}
const result = template.replace(/__HTML_REPLACE_STR__/g, html);
// 4. 输出
if (outputPath) {
    fs.writeFileSync(outputPath, result, 'utf-8');
    console.log(`✅ 成功写入: ${path.resolve(outputPath)}`);
} else {
    // 未指定输出文件时打印到 stdout，可配合重定向使用
    console.log(result);
}