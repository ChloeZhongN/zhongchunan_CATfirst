// 等HTML文档完全加载后再执行JavaScript代码
//实现封面幻灯片轮播
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    //querySelector 是 JavaScript 中用来查找网页元素的方法
    
    let currentIndex = 0;//记录当前显示的是哪一张幻灯片（从0开始计数）
    let slideInterval;//用于存储自动轮播的定时器
    const slideIntervalTime = 10000; // 10秒自动切换

    // 更新轮播位置
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        //通过修改transform属性的translateX值来左右移动轮播轨道
    }

    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        //slaides.length是我用querySelectorAll找到的所有幻灯片元素
        updateCarousel();
        //(currentIndex + 1) % slides.length：计算下一张的索引
        //%是取模运算符，用于循环（到最后一张后回到第一张）
        //然后调用updateCarousel()移动轨道
    }

    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        //加slides.length是为了处理从第一张回最后一张的情况
    }

    // 初始化自动轮播
    function startCarousel() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
        //setInterval：每隔一定时间重复执行函数
        //这里设置每5秒自动调用nextSlide切换到下一张
        //slideInterval保存定时器ID，后面可以用来停止自动轮播
    }

    // 按钮点击事件
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);//停止轮播
            prevSlide();//切换到上一张
            startCarousel();//重开始轮播
        });
        
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            startCarousel();
        });
    } else {
        console.error('导航按钮未找到！');
    }

    // 鼠标悬停时暂停轮播
    carousel.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });

    // 鼠标离开时恢复轮播
    carousel.addEventListener('mouseleave', startCarousel);

    // 开始自动轮播
    startCarousel();

    // 初始位置设置
    updateCarousel();
});
//第二次轮播,其实跟第一次几乎是一样的，只是改了个名字
document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播元素
    const picShoubox = document.querySelector('.pic-shoubox');
    const picList = picShoubox.querySelector('.pic-list');
    const picItems = picShoubox.querySelectorAll('.pic-item');
    const prevBtn = picShoubox.querySelector('.prev-btn');
    const nextBtn = picShoubox.querySelector('.next-btn');
    
    // 轮播状态
    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 10000;
    
    // 更新轮播位置
    function updateCarousel() {
        //每个pic-item宽度为40%
        picList.style.transform = `translateX(-${currentIndex * 40}%)`;
    }
    
    // 下一张
    function nextSlide() {
        // 计算可显示的项目数（100%/40%=2.5，取整为2）
        const visibleItems = Math.floor(100 / 40);
        if (currentIndex + visibleItems < picItems.length) {
            currentIndex++;
        } else {
            currentIndex = 0; // 循环回到第一张
        }
        updateCarousel();
    }
    
    // 上一张
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // 循环到最后
            //Math.floor() → 向下取整函数，2.5取整后得到2
            currentIndex = Math.max(picItems.length - Math.floor(100 / 40), 0);
        }
        updateCarousel();
    }
    
    // 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 事件监听
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
        
        nextBtn.addEventListener('click', function() {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    // 鼠标交互
    picShoubox.addEventListener('mouseenter', stopAutoPlay);
    picShoubox.addEventListener('mouseleave', startAutoPlay);
    
    // 初始化
    updateCarousel();
    startAutoPlay();
});