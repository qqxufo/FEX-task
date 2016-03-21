(function() {
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     */
    function addAqiData() {
        var city = document.querySelector('#aqi-city-input').value.trim(),
            value = document.querySelector('#aqi-value-input').value.trim(),
            err = document.querySelector('#err');
        if (city === '' || city.length === 0) {
            err.innerHTML = '请输入城市名!';
            return;
        }
        if (/[^\u4e00-\u9fa5a-zA-Z]/.test(city)) {
            err.innerHTML = '城市名必须为中英文字符!';
            return;
        }
        if (value === '' || value.length === 0) {
            err.innerHTML = '请输空气质量指数!';
            return;
        }
        if (!/^[1-9][0-9]*$/.test(value)) {
            err.innerHTML = '空气质量指数必须为整数!';
            return;
        }
        err.innerHTML = '';
        aqiData[city] = value;
    }

    /**
     * 检查Object是否为空
     */
    function isEmptyObject(object) {
        for (var o in object) {
            return true;
        }
        return false;
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var table = document.querySelector('#aqi-table'),
            content;
        if (isEmptyObject(aqiData)) {
            content = '<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>';
            for (var city in aqiData) {
                content += '<tr><td>' + city + '</td><td>' + aqiData[city] + '</td><td><button data-city=' + city + '>删除</button></td></tr>';
            }
            table.innerHTML = content;
        } else {
            table.innerHTML = '';
        }

    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(city) {
        delete aqiData[city];
        renderAqiList();
    }

    function init() {
        var add_btn = document.querySelector('#add-btn'),
            aqi_table = document.querySelector('#aqi-table');

        // 给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        add_btn.onclick = function() {
            addBtnHandle();
        };

        // 给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        aqi_table.addEventListener('click', function(event) {
            if (event.target.nodeName.toLowerCase() === 'button') {
                delBtnHandle(event.target.dataset.city);
            }
        }, false);
    }

    init();

})();