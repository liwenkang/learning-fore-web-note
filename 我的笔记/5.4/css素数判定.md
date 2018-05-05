# 利用 css 伪类 进行素数判断

## 一. 10 以内的素数判定

为了完成大喵老师的小作业(自己确实没想到实现方法)...遂"借鉴"了一下大喵老师的[博客](https://zhuanlan.zhihu.com/p/24718254),写了这个笔记.

css 如下所示

```css
    ul {
        background-color: black;
    }

    li {
        /* 素数高亮 */
        color: yellow;
    }
    /* 
    首先把 1 ~ 10 范围内不是素数的部分找出来, 由于 1 和 2 属于特殊值, 所以特殊处理  
    */
    li:first-child,
        /* li:nth-child(2n + 2) */
    li:nth-child(2n + 4),
    li:nth-child(3n + 6),
    li:nth-child(4n + 8),
    li:nth-child(5n + 10) {
        /* 非素数灰 */
        color: gray;
    }
```

页面结构如下所示

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
</ul>
```

显示效果为

![效果图](https://github.com/liwenkang/learning-fore-web-note/blob/master/%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/5.4/pic1.png)

## 二. 扩大判定范围后的分析

通过观察我们可以发现,我们需要列出的条件大概是这样的:

```
    li:first-child,
    /* li:nth-child(2n + 2) */
    li:nth-child(2n + 4),
    li:nth-child(3n + 6),
    li:nth-child(4n + 8),
    li:nth-child(5n + 10),
    li:nth-child(6n + 12),
    li:nth-child(7n + 14),
    li:nth-child(8n + 16),
    li:nth-child(9n + 18),
    li:nth-child(10n + 20),
    li:nth-child(11n + 22),
    li:nth-child(12n + 24),
    li:nth-child(13n + 26),
    ......
```

我们知道2是唯一是素数的偶数,那么观察下面的条件:
```
    li:nth-child(2n + 4),
    li:nth-child(4n + 8),
    li:nth-child(6n + 12),
    li:nth-child(8n + 16),
    li:nth-child(10n + 20),
    li:nth-child(12n + 24),
    ......
```

可以发现条件:
```
    li:nth-child(2n + 4)
```
实际上包含了所有此类偶数的判断.

同理可以推导出条件:
```
    li:nth-child(3n + 6)
```
包含了
```
    li:nth-child(6n + 12),
    li:nth-child(9n + 18),
    li:nth-child(12n + 24),
    ......
```
通过多次简化后,可以发现,剩下的规则为:
```
    li:first-child,
    /* li:nth-child(2n + 2) */
    li:nth-child(2n + 4),
    li:nth-child(3n + 6),
    li:nth-child(5n + 10),
    li:nth-child(7n + 14),
    li:nth-child(11n + 22),
    li:nth-child(13n + 26),
    li:nth-child(17n + 34),
    li:nth-child(19n + 38),
    ......
```
根据[试除法](https://zh.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0#%E8%A9%A6%E9%99%A4%E6%B3%95),可以在数学上证明,如果我们想要筛选出 N 以内所有的素数，只需要将它分别除以 [2 ~ 根号N] 之间的整数,将完全不能整除的数字找出来.

也就表明,为了得到 [2 ~ N] 范围内的素数,把所有[2 ~ 根号N] 之间素数的所有倍数筛选掉即可.

## 三. 100 以内的素数判定

因为小于等于根号100的最小整数为10,1到10范围内最大的素数为7,所以只需要将[2,3,5,7]以及它们的倍数筛除掉即可.

```css
    ul {
        background-color: black;
    }

    li {
        /* 素数高亮 */
        color: yellow;
        display: inline-block;
        width: 30px;
    }
    /*
    首先把 1 ~ 10 范围内不是素数的部分找出来, 由于 1 和 2 属于特殊值, 所以特殊处理
    */
    li:first-child,
        /* li:nth-child(2n + 2) */
    li:nth-child(2n + 4),
    li:nth-child(3n + 6),
    li:nth-child(5n + 10),
    li:nth-child(7n + 14){
        /* 非素数灰 */
        color: gray;
    }
```

显示效果为

![效果图](https://github.com/liwenkang/learning-fore-web-note/blob/master/%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/5.4/pic2.png)

## 四. 结语

最后...看起来这个算法还是靠人算出小部分的素数,然后再推广到更多的范围,如果你能算出[2 ~ n]范围内的素数的话,就可以推导出[2 ~ n * n]范围内的素数.该文章预计分为两部分,第一部分介绍css判定素数,第二部分将使用 CSS 计数器来完成素数数量的统计.(抄也要抄完整)
