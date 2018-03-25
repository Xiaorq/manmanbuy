# manmanbuy
慢慢买项目

# git协作开发
### 准备工作
1. 新建一个文件夹，然后克隆仓库 git clone -b dev https://github.com/Organ-manmanbuy/manmanbuy.git
2. 转到开发分支 git checkout dev

### 提交代码
1. 添加 git add 自己写的文件（<b>不要用git add .或git add *！！会覆盖掉其他人的文件</b>）
2. 提交到本地暂存区 git commit -m '认真写的提交说明'
3. 拉取远程仓库的最新版本 git pull origin dev
4. 推送到远程仓库 git push origin dev



# 规范
### 文件规范
1. 除了首页以外，其他html文件一律放在html文件夹中
2. less,css,js文件分别放在根目录下对应的文件夹中，图片保存在images
3. 不同模块下的子页面可能会有重名，所有模块下面的子页面一律添加前缀，前缀统一用‘-’分隔，前缀名自己拟定，保证语义清晰明了且不与他人重复即可，比如折扣页面加前缀‘discount-’，折扣页下的商品列表页面命名为‘discount-productlist.html’，分类页面下的功能页面命名为‘category-function.html’
4. less文件、js文件等命名同样遵循第3条规范，如‘discount-productlist.js’
5. 不统一公共样式文件base.less或公共脚本文件common.js，如果需要在自己模块中提取公共文件，请加上前缀名，如discount-base.less和discount-common.js

### 开发规范
1. git的clone和pull会使每个人本地都存了一份完整的项目目录，这也方便了我们链接其他页面和测试，<b>请每个人写自己的模块，不要在其他人不知情的情况下随意改动别人的页面</b>，以免引起不必要的版本冲突，影响开发效率。
2. 预处理用less，UI框架使用mui
3. 统一使用px作为长度单位，不使用rem、vw/vh等相对单位
4. 统一使用iPhone 6/7/8 plus的视口作为参照视口(414*736)



# 个人进度记录
每晚上github仓库的issues中发帖记录当天进度，不需要多详细，表达清楚即可，格式如下:
> 黄*（xxx页面）

> 当天进度：
> 1. 完成xxx页面主体html结构
> 2. 完成xxx页面样式
> 3. 完成yyy页面header细部样式

> 问题记录及解决方案（可选）：
> 1. xxx页面轮播图无法显示，解决方案：xxx
> 2. yyy页面header无法固定，解决方案：yyy
> 3. zzz页面zzz问题，无法解决
