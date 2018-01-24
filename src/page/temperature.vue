<template>
	<div>
		<Form label-position="left" :label-width="150">
			<FormItem label="选择日期查看温度">
				<DatePicker type="date" :options="options" placeholder="Select date" :transfer="true" style="width: 200px" @on-change="setDate"></DatePicker>
			</FormItem>
			<FormItem label="当前温度">
				{{currentVal['data']}}&#176;C
			</FormItem>
			<FormItem label="当前温度更新时间">
				{{currentVal['datetime']}}
			</FormItem>
			<FormItem label="温度趋势来自">
				<span v-for="item in dateArray" style="margin-right: 20px;">{{item}}</span>
			</FormItem>
			<FormItem label="查看前几天的温度">
				<RadioGroup v-model="fordays" type="button" @on-change="getThreeDays">
					<Radio label="0">一天</Radio>
					<Radio label="1">二天</Radio>
					<Radio label="2">三天</Radio>
					<Radio label="3">四天</Radio>
					<Radio label="4">五天</Radio>
					<Radio label="5">六天</Radio>
					<Radio label="6">七天</Radio>
				</RadioGroup>
			</FormItem>
		</Form>
		<g2-line :charData="serverData" :id="'c1'" id="c1"></g2-line>
	</div>
</template>

<script>
	import G2Line from '../components/G2Line.vue';

	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	import { getLocalTime, turnTimeStamp } from '../utils/common.js'

	export default {
		components: {
			G2Line
		},
		data() {
			return {
				id: 10000,
				setDateVal: new Date(),
				currentVal: {
					data: '',
					datetime: '',
				},
				fordays: 0,
				serverData: [],
				startDate: '',
				endDate: '',
				dateArray: [],
				options: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now();
					}
				},
			}
		},
		created() {
			this.getThreeDays(new Date());
			this.initData();
		},
		methods: {
			// 获取传感器数据
			initData() {
				let _self = this;
				_self.serverData = [];
				let tempArr = [];
				fetchPostUrlencoded('/www/?m=api&c=api&a=datasteamlist', {
					id: _self.id,
					startDate: _self.dateArray[0],
					endDate: _self.dateArray[_self.dateArray.length - 1],
				}).then((res) => {
					if(res.status !== 0) {
						_self.$Message.error(res.msg);
					} else {
						_self.$Message.success(res.message);
						_self.serverData = res.data.data;
						_self.currentVal.data = res.data.current[0]['data'];
						_self.currentVal.datetime = res.data.current[0]['datetime'];
					}
				});
			},
			// 客户选中想查看日期
			setDate(e) {
				if(e == '') {
					this.$Message.warning('清空日期查看不了数据！');
				} else {
					this.setDateVal = new Date(e);
					this.getThreeDays();
					this.initData();
				}
			},
			// 获取之前多少天
			getThreeDays() {
				let _self = this;
				let myDate = new Date(_self.setDateVal);
				myDate.setDate(myDate.getDate() - _self.fordays);
				_self.dateArray = [];
				let dateTemp;
				let flag = 1;
				for(var i = 0; i <= _self.fordays; i++) {
					dateTemp = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
					_self.dateArray.push(dateTemp);
					myDate.setDate(myDate.getDate() + flag);
				}
			}
		}
	}
</script>

<style>

</style>