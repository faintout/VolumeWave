class VolumeWave{
    areaId:string
    heighChart:any
    charCount:number
    chart:any
    constructor(heighChart:object,areaId:string){
        this.areaId = areaId
        this.heighChart = heighChart
        this.charCount = 1000
        this.chart = undefined
        this.init()
    }
    //初始化加载图表
    init(){
        var options = {
            chart: {
                renderTo: this.areaId,
                type: 'area',
                marginRight: 10,
                animation:false,
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            exporting: { //Highcharts 图表导出功能模块。
                enabled: false
            },
            xAxis: {
                visible: false,
                labels:{  
                    enabled:false  
                  }  
            },
            yAxis: {
                visible: false,
                tickPositions: [-96, 0, 96], 
                labels:{  
                    enabled:false  
    
                  }  
            },
            tooltip: {
                enabled:false,
            },
            legend: {
                enabled: false,
            },
            //禁止图例点击
            plotOptions: {
                series: {
                    events: {
                        legendItemClick: function () {
                            return false; // 直接 return false 即可禁用图例点击事件
                        }
                    },
                    enableMouseTracking: false,
                    marker: {
                        enabled: false
                    },
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }
            },
            series: [{
                name: '',
                color:'#aaaa00',
                data: (function () {
                    //上半部分、赋值长度1000数组，
                    return ([...new Array(1000).keys()].map((a,index) => {
                        return { x: index+1, y: null}
                    }));
                })()
            }, {
                name: '',
                color:'#00c800',
                data: (function () {
                    //下半部分、赋值长度1000数组，
                    return ([...new Array(1000).keys()].map((a,index) => {
                        return { x: index+1, y: null }
                    }));
                })()
            }]
        };
        this.chart = new this.heighChart.Chart(options);
        //强制设置黑颜色
        document.querySelector('.highcharts-background').style.fill = "#000"
    }
    /**
     * @description 设置音量值方法
     * @param {valueArr} 音量值二维数组 [[1,2,3,4],[4,5,6,7]]
     * @return {void} 
     * @Date 2021-12-27 11:30:17
    */
    setVolumeVal(valueArr:Array<Array<number>>):void{
        let series = this.chart.series[0]
        let series1 = this.chart.series[1]
        for (let i = 0; i < valueArr[0].length-1; i++) {
            this.charCount ++
            //每组数据赋值长度-1位数据操作，这部分数据只赋值不进行视图渲染，。
            series.addPoint([this.charCount, valueArr[0][i]], false, true);
            series1.addPoint([this.charCount, valueArr[1][i] * -1], false, true);
        }
        this.charCount+=1
        //每组数据赋值最后一位数据，这部分数据进行视图渲染，
        series.addPoint([this.charCount, valueArr[0][valueArr[0].length-1]], true, true);
        series1.addPoint([this.charCount, valueArr[1][valueArr[1].length-1]* - 1], true, true);
    }
}
// export default VolumeWave