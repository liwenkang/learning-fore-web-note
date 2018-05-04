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

![效果图][img1]

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
    li:nth-child(17n + 26),
    li:nth-child(19n + 26),
    ......
```
根据[试除法](https://zh.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0#%E8%A9%A6%E9%99%A4%E6%B3%95),可以在数学上证明,如果我们想要筛选出 N 以内所有的素数，只需要将它分别除以 [2~根号N] 之间的整数,将完全不能整除的数字找出来.

也就表明,为了得到 [2~N] 范围内的素数,把所有[2~根号N] 之间素数的所有倍数筛选掉即可.

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

![效果图][img2]

## 四. 结语

最后...看起来这个算法还是靠人算出小部分的素数,然后再推广到更多的范围,如果你能算出[2 ~ n]范围内的素数的话,就可以推导出[2 ~ n*n]范围内的素数.该文章预计分为两部分,第一部分介绍css判定素数,第二部分将使用 CSS 计数器来完成素数数量的统计.(抄也要抄完整)

[img1]:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAADkCAIAAACXCqRQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADtUlEQVR42u2d0XHqMBBF1QYpA6oI1MBQgmH4e19uIn+MO0nKgDKYSQM8ywYjGWeSp/WE56tzhg/gz3d2V9L6SnIOAAAAAAAAvuVlWZSbOTo4N9+ULcix2LQqzF4L5LijJsdqtfrTUH/JXY5agjIgQREpOeqgCOWofyIHcpAslFIGWuQAAAAAgKx4P7vL5fY55a3F/iOS4FgrcnZ7YuRK5WPkfYcQYnK8vbnPT/+pv5hy5+IOAlrcy+ElVZFKpZrWQRHKUf9MiwuROmqU4yg2ylqSpdVCbTRJK6WHk0TtHIs6NM4fyNCrGr3PCWEAAAAA4He5Lu2bT/YT9iqQoEKRGP+SgQWLoBz21rFI39jZumFtB0hqXW9vHUuV0nHk4D3LYIDwFk6umiaPrAe92mEh7B7z7h4AAAAAnkyzHa7cLFDCted3lMhxZb4uy21RIIenPcWjCRAROQy7rP3pLsXrzMnIYdiDP1tuy3I978qHghzJJzREm6tzl8OXjGL5Eg0u2SZLkybDBBrlV0rlomPEmRhyIAcAAAAAPJsjG+Hu7Nz54o4VUYEcX8khaPpJtMpVojvOE42UlWIdHdF1zPkdd1pf6eRzB9fxOKV0v1OMjmTq579POnAdu3A/C/MxAAAAAHgmN48tt8PhvX6IC7QIQmO7nOk9WJJVLvDYimmR5Dq+2q+9P1/GQunSXcfXu0a72iFSVk1yRMny+E9GyeJrh9+roFdN0lzHvmroRYdx3tEFSFNTJaqpge7yZu5vBgAAAIDfpxq6fgOLR0fuZw724PYa0dCwH9CpExp2I6VUaNhttlJVwyqHmFHfmCzeSyl2Da2llDK+9jMFgy0zUQAAAAD4f1gEfob1HC06u0vm1p/rEceBzbY95Rc51ORIPKAz8obdDj0W0CL1rGMXesNEvPq2s447q2BjKhVw7Ftcx3F2SORLYrIMbGbJ2XUce2ylqmn6QNurHeyFu6eZ5M4nAAAAAJgAQes439VKMEPv1iy5t44f1q+9257yYqDf4QUSue1qhH7HQAdkmlqktY6H+h3TlyO5dXxTpOukS3TDLHJ8V01ySpahOUjOb+HiWYjmUUD/Mg3bdLOMpojkfkJDcLMkfWMAAAAAeDJ+LTswQ4+X/1ko0TkH+3KEq5i4yazKbUXfPG0sR7/3kdN691GOx3+mtOQ19juGHz5e404mX+zdsJ/IMZm3MPZeKXKQLLZSOjD65FNK2zf7DLTx80fTsGway188bdBY5hhkAAAAAAAAAPgZfwHG6VCTJ6qhhQAAAABJRU5ErkJggg==


[img2]:data:image/png;base64,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