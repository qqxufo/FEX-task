(function() {
    var map = document.querySelector('#game-map'),
        ctx = map.getContext('2d'),
        canvasWidth = 550,
        canvasHeight = 550,
        rectState = {
            x: 6,
            y: 6,
            direction: 2
        };

    // 设置画布宽高
    map.width = canvasWidth;
    map.height = canvasHeight;

    // 绘制基础地图
    function drawMap() {
        ctx.fillStyle = '#000';
        ctx.font = '20px Microsoft YaHei';
        ctx.lineWidth = 1;

        // 绘制网格
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (var i = 0; i < 12; i++) {
            // 绘制水平线
            ctx.moveTo(0, i * 50);
            ctx.lineTo(canvasWidth, i * 50);

            // 绘制垂直线
            ctx.moveTo(i * 50, 0);
            ctx.lineTo(i * 50, canvasHeight);
        }
        ctx.stroke();

        // 绘制文字       
        var x = 20,
            y = 35,
            dist = 50;
        for (var i = 1; i <= 10; i++) {
            ctx.fillText(i, x + i * dist, y);
            ctx.fillText(i, x, y + i * dist);
        }
    }

    //重置地图
    function cleanMap() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    // 绘制小方块
    // direction: 1:左,2:上,3:右,4:下
    function drawRect(x, y, direction) {
        // 绘制方块体
        ctx.fillStyle = '#37ACCB';
        ctx.fillRect(x * 50, y * 50, 50, 50);
        ctx.fillStyle = '#FB9100';

        // 根据方向绘制方块头部
        switch (direction) {
            case 1:
                ctx.fillRect(x * 50, y * 50, 15, 50);
                break;
            case 2:
                ctx.fillRect(x * 50, y * 50, 50, 15);
                break;
            case 3:
                ctx.fillRect(x * 50 + 35, y * 50, 15, 50);
                break;
            case 4:
                ctx.fillRect(x * 50, y * 50 + 35, 50, 15);
                break;
        }
    }

    // 渲染游戏场景
    function render() {
        cleanMap();
        drawMap();
        drawRect(rectState.x, rectState.y, rectState.direction);
    }

    // 前进
    // direction: 1:左,2:上,3:右,4:下
    function goAhead() {
        switch (rectState.direction) {
            case 1:
                rectState.x = (rectState.x - 1) > 0 ? rectState.x - 1 : rectState.x;
                break;
            case 2:
                rectState.y = (rectState.y - 1) > 0 ? rectState.y - 1 : rectState.y;
                break;
            case 3:
                rectState.x = (rectState.x + 1) < 11 ? rectState.x + 1 : rectState.x;
                break;
            case 4:
                rectState.y = (rectState.y + 1) < 11 ? rectState.y + 1 : rectState.y;
                break;
        }
        render();
    }

    // 左转
    // direction: 1:左,2:上,3:右,4:下
    function turnLeft() {
        rectState.direction = rectState.direction - 1 ? rectState.direction - 1 : 4;
        render();
    }

    // 右转
    // direction: 1:左,2:上,3:右,4:下
    function turnRight() {
        rectState.direction = (rectState.direction + 1) != 5 ? rectState.direction + 1 : 1;
        render();
    }

    // 转身(向右180度)
    // direction: 1:左,2:上,3:右,4:下
    function turnBack() {
        turnRight();
        turnRight();
        render();
    }

    // 执行输入框的指令
    function execute() {
        var order = document.querySelector('#order').value.toLocaleUpperCase();
        switch (order) {
            case 'GO':
                goAhead();
                break;
            case 'TUN LEF':
                turnLeft();
                break;
            case 'TUN RIG':
                turnRight();
                break;
            case 'TUN BAC':
                turnBack();
                break;
        }
    }

    // 绑定按钮事件
    function bindBtn() {
        var go = document.querySelector('#go-btn'),
            lef = document.querySelector('#lef-btn'),
            rig = document.querySelector('#rig-btn'),
            bac = document.querySelector('#bac-btn'),
            exec = document.querySelector('#exec-btn');

        go.addEventListener('click', goAhead, false);
        lef.addEventListener('click', turnLeft, false);
        rig.addEventListener('click', turnRight, false);
        bac.addEventListener('click', turnBack, false);
        exec.addEventListener('click', execute, false);
    }

    function initGame() {
        render();
        bindBtn();
    }

    initGame();
})();