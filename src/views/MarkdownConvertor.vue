<template>
  <div class="h-screen flex bg-gray-50">
    <!-- 左侧输入框 -->
    <div class="w-1/2 p-4 bg-white border-r overflow-auto">
      <h2 class="text-lg font-bold mb-2">📝 Markdown 输入</h2>
      <textarea v-model="markdownText"
        class="w-full h-[90%] p-4 border border-gray-300 rounded resize-none font-mono text-sm focus:outline-none focus:ring focus:ring-blue-200" />
    </div>

    <!-- 右侧渲染区 -->
    <div class="w-1/2 p-4 overflow-auto">
      <h2 class="text-lg font-bold mb-2">📄 HTML 渲染预览</h2>
      <div id="preview" class="prose prose-sm max-w-none bg-white p-6 rounded shadow" v-html="renderedHtml"></div>
    </div>
    <button
  @click="copyHtml"
  class="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 flex items-center justify-center text-xl"
  title="复制 HTML 到剪贴板"
>
  📋
</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { createMarkdownWeixinRenderer } from '@/utils/convert/useMarkdownWeixin'
import hljs from 'highlight.js'
//import 'highlight.js/styles/github.css' // 你也可以选别的样式
import '@/assets/wechat.css' // 你已有的CSS样式

const md = createMarkdownWeixinRenderer()

const copyHtml = () => {
  const el = document.getElementById('preview')
  if (!el) return

  const range = document.createRange()
  range.selectNodeContents(el)

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)

  const success = document.execCommand('copy')
  selection?.removeAllRanges()

  if (success) {
    alert('✅ 已复制富文本排版，可直接粘贴到公众号图文编辑器！')
  } else {
    alert('❌ 复制失败，请手动选择复制')
  }
}

const markdownText = ref(`>微信公众号：**[k8s技术圈]**
关注容器技术、关注\`Kubernetes\`。问题或建议，请公众号留言。

###Markdown-Weixin 简介
Markdown 转微信公众帐号内容神器，能让\`Markdown\`内容，无需作任何调整就能**一键复制**到微信公众号使用，特别针对代码展示做了优化。

GitHub 地址：[https://github.com/cnych/markdown-weixin](https://github.com/cnych/markdown-weixin)

> 使用微信公众号编辑器有一个十分头疼的问题——粘贴出来的代码，格式错乱，而且特别丑。

###代码块显示效果
注：markdown对代码块的语法是开始和结束行都要添加：\`\`\`,其中 \` 为windows键盘左上角那个，如下：
\`\`\`yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: haimaxy-sa-rolebinding
  namespace: kube-system
subjects:
- kind: ServiceAccount
  name: haimaxy-sa
  namespace: kube-system
roleRef:
  kind: Role
  name: haimaxy-sa-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`

要精确指定语言时，在头部直接指定，如：
\`\`\`javascript
function showSnackbar() {
  var $snackbar = $('#snackbar');
  $snackbar.addClass('show');
  setTimeout(() => {
    $snackbar.removeClass('show');
  }, 3000);
}
\`\`\`

###Markdown基本语法
####标题
#####H5
######H6
####行内代码
如：\`AppCompatActivity\`
####强调
**我是强调**
####斜体
试试*斜体*
####强调的斜体
试试***强调的斜体***
####删除
试试 ~~删除~~
####超链接
[我是外链的超链接](http://blog.qikqiak.com)
[我是页内的超链接](#jump_1)

####有序列表
1. 有序列表 1
2. 有序列表 2

####无序列表
- 无序列表 1
- 无序列表 2

####引用块
>我是引用块  
微信公众号：k8s技术圈

####分隔线
***

####表格
| 班级 | 男生 | 女生 |
|------|------|------|
| 一(7)班 | 30 | 25 |
| 一(8)班 | 25 | 30 |

###直接支持html,css
<a href="#jump_1">页内跳转</a>  
<span style="color:#5bdaed;">蓝色文字</span>  
<span style="font-size:1.2em;font-weight:bold;">大而粗的字</span>

<p style="text-align:center;color:#1e819e;font-size:1.3em;font-weight: bold;">
居中且样式复杂的段落<br/>第二行
</p>

###版本更新记录
***
#### TODO
- 自动保存
- 增加主题
#### Changelog
版本号：V1.2.1  
更新日期：2018-07-12

- 修复复制错误
- 优化样式

![qrcode](https://blog.qikqiak.com/img/posts/qrcode_for_gh_d6dd87b6ceb4_430.jpg)

***
<a id="jump_1">我是页内跳转到的位置</a>

### LICENSE
MIT.`)

const renderedHtml = computed(() => md.render(markdownText.value))
</script>
