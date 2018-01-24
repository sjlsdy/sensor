<template>
	<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		props: {
			className: {
				type: String,
				default: 'yourClassName'
			},
			id: {
				type: String,
				default: 'yourID'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '500px'
			},
			charData: {
				type: Array,
				default: function() {
					return {
						data: []
					};
				}
			},
			id: String
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			charData: function(val, oldVal) {
				console.log('new: %s, old: %s', val, oldVal);
				this.initChart(val);
			}
		},
		mounted() {},
		beforeDestroy() {
			if(!this.chart) {
				return
			}
			this.chart.dispose();
			this.chart = null;
		},
		methods: {
			initChart(data) {
				let xAxisData = [];
				let seriesData = [];
				for(let i = 0; i < data.length; i++) {
					xAxisData.push(data[i]['datetime']);
					seriesData.push(data[i]['data']);
				}
				this.chart = echarts.init(this.$refs.myEchart);
				// 把配置和数据放这里
				this.chart.setOption({
					title: {
						text: '我家卧室的温度',
						subtext: '来自我的树莓派'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['温度']
					},
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: xAxisData
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value} °C'
						},
						min: function(value) {
							return Math.floor(value.min);
						},
						max: function(value) {
							return Math.ceil(value.max);
						},
					}],
					series: [{
						name: '温度计',
						type: 'line',
						data: seriesData,
						markPoint: {
							data: [{
									type: 'max',
									name: '最大值'
								},
								{
									type: 'min',
									name: '最小值'
								}
							]
						},
					}]
				})
			}
		}
	}
</script>

<style>

</style>