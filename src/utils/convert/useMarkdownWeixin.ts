import MarkdownIt from "markdown-it";
// utils/convert/useMarkdownWeixin.js
import hljs  from 'highlight.js'

export const createMarkdownWeixinRenderer = () =>{
  const styleMap = {
    p: 'font-size:14px;line-height:30px;margin:0 0 16px;padding:0;color:#4a4a4a',
    strong: 'font-weight: bold;',
    h1: 'font-size:22px;font-weight:bold;color:#222222;margin:24px 0 16px;padding:0;color:#f85f48',
    h2: 'font-size:20px;font-weight:bold;color:#222222;margin:20px 0 14px;padding:0;color:#f85f48',
    h3: 'font-size:18px;font-weight:bold;color:#222222;margin:18px 0 12px;padding:0;color:#f85f48',
    h4: 'font-size:16px;font-weight:bold;color:#222222;margin:16px 0 10px;padding:0;color:#f85f48',
    h5: 'font-size:14px;font-weight:bold;color:#222222;margin:14px 0 8px;padding:0;color:#f85f48',
    h6: 'font-size:12px;font-weight:bold;color:#222222;margin:12px 0 6px;padding:0;color:#f85f48',
    code_inline: 'font-family:Menlo,monospace;background:#f3f1f1;border-radius:4px;padding:2px 4px;font-size:14px;',
    pre: 'background:#f6f8fa;padding:12px 16px;border-radius:6px;overflow:auto;margin:16px 0;',
    code_block: 'font-family:Menlo,monospace;font-size:14px;color:#2d2d2d;line-height:1.6;',
    li: 'margin:6px 0;',
    table_open: 'width:100%;border-collapse:collapse;margin:16px 0;',
    th: 'background:#f0f0f0;border:1px solid #ddd;padding:8px;text-align:left;',
    td: 'border:1px solid #ddd;padding:8px;text-align:left;font-size:14px;',
    blockquote: 'background-color: #f1f7fc; border-left: 4px solid #2b6cb0;padding: 12px 16px;margin: 16px 0;color: #333;font-size: 16px;line-height: 1.75;font-style: normal;quotes:none',
  }

  const md = new MarkdownIt({
    html: true,
    breaks: true,
    highlight: (str, lang) => {
      const codeStyle = styleMap.code_block || ''
      const preStyle = styleMap.pre || ''
      const code = hljs.getLanguage(lang)
        ? hljs.highlight(str, { language: lang }).value
        : MarkdownIt().utils.escapeHtml(str)
      return `<pre style="${preStyle}"><code style="${codeStyle}" class="language-${lang}">${code}</code></pre>`
    }
  })

  // 段落
  md.renderer.rules.paragraph_open = () => `<p style="${styleMap.p}">`

  // 标题（h1~h3）
  md.renderer.rules.heading_open = (tokens, idx) => {
    const tag = tokens[idx].tag
    return `<${tag} style="${styleMap[tag as keyof typeof styleMap] || ''}">`
  }

  // 行内代码
  md.renderer.rules.code_inline = (tokens, idx) =>
    `<span style="${styleMap.code_inline}">${md.utils.escapeHtml(tokens[idx].content)}</span>`
  md.renderer.rules.strong_open = () => `<strong style="${styleMap.strong}">`

  // 列表项
  md.renderer.rules.list_item_open = () =>
    `<li style="${styleMap.li}">`

  // 引用块
  md.renderer.rules.blockquote_open = () =>
    `<blockquote style="${styleMap.blockquote}">`

  // 表格
  md.renderer.rules.table_open = () => `<table style="${styleMap.table_open}">`
  md.renderer.rules.th_open = () => `<th style="${styleMap.th}">`
  md.renderer.rules.td_open = () => `<td style="${styleMap.td}">`


  const render = (markdown: string) => {
    let fixed = fixMarkdownHeadings(markdown)
    
    return md.render(fixed)
  }
  
  function fixMarkdownHeadings(md: string): string {
    return md.replace(/^(#{1,6})([^\s#])/gm, '$1 $2')
  }
  return {
    md,           // 原始 markdown-it 实例
    render,       // 渲染函数（自动修复标题格式）
    fixMarkdownHeadings, // 可选独立调用修复函数
  }
}

