var VolumeWave = /** @class */ (function () {
    function VolumeWave(parentId, canvasId, charCount) {
        if (charCount === void 0) { charCount = 1000; }
        this.canvasId = canvasId;
        this.parentId = parentId;
        //数据长度，
        this.charCount = charCount;
        this.charArrList = [[], []];
        this.ctx = undefined;
        this.init();
    }
    /**
     * @description 初始化布局方法
     * @param {}
     * @return {void}
    */
    VolumeWave.prototype.init = function () {
        var myCanvas = document.createElement("canvas");
        var canvasArea = document.getElementById(this.parentId);
        var canvasHeight = canvasArea.offsetHeight;
        var canvasWidth = canvasArea.offsetWidth;
        myCanvas.setAttribute("height", canvasHeight.toString());
        myCanvas.setAttribute("width", canvasWidth.toString());
        myCanvas.setAttribute("id", this.canvasId);
        myCanvas.style.position = "absolute";
        canvasArea.style.position = "relative";
        //添加数组数据
        // this.charArrList = [Array(this.charCount).fill(0),Array(this.charCount).fill(0)]
        this.charArrList = [Array(this.charCount).fill(-96), Array(this.charCount).fill(-96)];
        canvasArea.appendChild(myCanvas);
        this.ctx = myCanvas.getContext("2d");
        window.addEventListener("resize", resizeCanvas, false);
        //画面变化重新设置
        function resizeCanvas() {
            myCanvas.width = canvasArea.offsetWidth;
            myCanvas.height = canvasArea.offsetHeight;
        }
    };
    /**
     * @description 设置音量值方法
     * @param {valueArr} 音量值二维数组 [[1,2,3,4],[4,5,6,7]]
     * @return {void}
    */
    VolumeWave.prototype.setVolumeVal = function (valueArr) {
        var _a, _b;
        var _this = this;
        (_a = this.charArrList[0]).push.apply(_a, valueArr[0]);
        (_b = this.charArrList[1]).push.apply(_b, valueArr[1]);
        var canvasArea = document.getElementById(this.parentId);
        var canvasHalfHeight = canvasArea.offsetHeight / 2;
        //重置画布
        this.ctx.clearRect(0, 0, canvasArea.offsetWidth, canvasArea.offsetHeight);
        //如超过长度则去除
        this.charArrList.map(function (char) {
            if (char.length > _this.charCount) {
                char.splice(0, char.length - _this.charCount);
            }
        });
        //画布宽度基数
        let canvasBaseWidth = canvasArea.offsetWidth/this.charCount
        console.log('this.charArrList[0]',this.charArrList[0]);
        for (var i = 0; i < this.charArrList[0].length; i++) {
            this.ctx.fillStyle = '#aaaa00';
            //从中向下
            var bottomHeight = volumeScaleMap[this.charArrList[1][i]];
            // 100%
            console.log('i*canvasBaseWidth',i*canvasBaseWidth);
            this.ctx.fillRect(i*canvasBaseWidth, canvasHalfHeight, 1, (canvasHalfHeight / 20) * bottomHeight);
            //从中向上
            var topHeight = volumeScaleMap[this.charArrList[0][i]] * -1;
            this.ctx.fillStyle = '#009600';
            this.ctx.fillRect(i*canvasBaseWidth, canvasHalfHeight, 1, (canvasHalfHeight / 20) * topHeight);
        }
    };
    return VolumeWave;
}());
//音量比例映射
// key----value
//db----H(高度)，总高度为20
var volumeScaleMap = {
    "0": 20,
    "-1": 19,
    "-2": 19,
    "-3": 18,
    "-4": 18,
    "-5": 17,
    "-6": 17,
    "-7": 16,
    "-8": 16,
    "-9": 15,
    "-10": 15,
    "-11": 14,
    "-12": 14,
    "-13": 13,
    "-14": 13,
    "-15": 12,
    "-16": 12,
    "-17": 11,
    "-18": 11,
    "-19": 10,
    "-20": 10,
    "-21": 9,
    "-22": 9,
    "-23": 8,
    "-24": 8,
    "-25": 7,
    "-26": 7,
    "-27": 6,
    "-28": 6,
    "-29": 5,
    "-30": 5,
    "-31": 4,
    "-32": 4,
    "-33": 3,
    "-34": 3,
    "-35": 2,
    "-36": 2,
    "-37": 2,
    "-38": 2,
    "-39": 2,
    "-40": 2,
    "-41": 2,
    "-42": 2,
    "-43": 2,
    "-44": 2,
    "-45": 2,
    "-46": 2,
    "-47": 2,
    "-48": 2,
    "-49": 2,
    "-50": 2,
    "-51": 2,
    "-52": 2,
    "-53": 2,
    "-54": 2,
    "-55": 2,
    "-56": 2,
    "-57": 2,
    "-58": 2,
    "-59": 2,
    "-60": 2,
    "-61": 2,
    "-62": 2,
    "-63": 2,
    "-64": 1,
    "-65": 1,
    "-66": 1,
    "-67": 1,
    "-68": 1,
    "-69": 1,
    "-70": 1,
    "-71": 1,
    "-72": 1,
    "-73": 1,
    "-74": 1,
    "-75": 1,
    "-76": 1,
    "-77": 1,
    "-78": 1,
    "-79": 1,
    "-80": 1,
    "-81": 1,
    "-82": 1,
    "-83": 1,
    "-84": 1,
    "-85": 1,
    "-86": 1,
    "-87": 1,
    "-88": 1,
    "-89": 1,
    "-90": 1,
    "-91": 1,
    "-92": 1,
    "-93": 1,
    "-94": 1,
    "-95": 1,
    "-96": 1
};
// export default VolumeWave
