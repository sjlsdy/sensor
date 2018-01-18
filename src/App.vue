<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo">树莓派传感器</div>
					<div class="layout-nav">
						<MenuItem name="1">
						<Icon type="ios-navigate"></Icon>
						Item 1
						</MenuItem>
						<MenuItem name="2">
						<Icon type="ios-keypad"></Icon>
						Item 2
						</MenuItem>
						<MenuItem name="3">
						<Icon type="ios-analytics"></Icon>
						Item 3
						</MenuItem>
						<MenuItem name="4">
						<Icon type="ios-paper"></Icon>
						Item 4
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Layout>
				<Sider hide-trigger :style="{background: '#fff'}">
					<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
						<MenuItem name="1">
						<Icon type="ios-speedometer"></Icon>
						传感器概览
						</MenuItem>
						<Submenu name="1">
							<template slot="title">
								<Icon type="ios-navigate"></Icon>
								Item 1
							</template>
							<MenuItem name="1-1">Option 1</MenuItem>
							<MenuItem name="1-2">Option 2</MenuItem>
							<MenuItem name="1-3">Option 3</MenuItem>
						</Submenu>
						<Submenu name="2">
							<template slot="title">
								<Icon type="ios-keypad"></Icon>
								Item 2
							</template>
							<MenuItem name="2-1">Option 1</MenuItem>
							<MenuItem name="2-2">Option 2</MenuItem>
						</Submenu>
						<Submenu name="3">
							<template slot="title">
								<Icon type="ios-analytics"></Icon>
								Item 3
							</template>
							<MenuItem name="3-1">Option 1</MenuItem>
							<MenuItem name="3-2">Option 2</MenuItem>
						</Submenu>
					</Menu>
				</Sider>
				<Layout :style="{padding: '0 24px 24px'}">
					<Breadcrumb :style="{margin: '24px 0'}">
						<BreadcrumbItem>首页</BreadcrumbItem>
						<BreadcrumbItem>概览</BreadcrumbItem>
					</Breadcrumb>
					<Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
						<router-view/>
						<g2-line :charData="serverData" :id="'c1'" id="c1"></g2-line>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>

<script>
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from './utils/requestHttp.js'
	import { getLocalTime } from './utils/common.js'

	import G2Line from './components/G2Line.vue';
	export default {
		components: {
			G2Line
		},
		data() {
			return {
				serverData: [],
			}
		},
		created() {
			this.saveService('10000');
		},
		methods: {
			saveService(id) {
				let _self = this;
				let tempArr = [];
				fetchPostUrlencoded('/www/?m=api&c=api&a=datasteamlist', {
					id: id,
				}).then((res) => {
					if(res.status !== 0) {
						_self.$Message.error(res.msg);
					} else {
						_self.$Message.success(res.message);
						/*
						let ge = parseInt(res.data.data.length / 10);
						for(var i = 0; i < res.data.data.length; i++) {
							res.data.data[i]['strftime'] = (res.data.data[i]['datetime']);
							res.data.data[i]['value'] = res.data.data[i]['data'];
						}
						//_self.serverData = res.data.data;
						for(let i = 0; i < res.data.data.length; i++) {
							if(i % ge == 0) {
								tempArr.push(res.data.data[i]);
							}
						}
						tempArr.pop();
						tempArr.push(res.data.data[res.data.data.length - 1]);
						*/
						_self.serverData = res.data.data;
					}
				});
			},
		}
	}
</script>

<style scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}
	
	.layout-logo {
		width: 100px;
		height: 30px;
		background: none;
		float: left;
		/*
		position: relative;
		top: 15px;
		left: 20px;
		*/
		color: #FFFFFF;
	}
	
	.layout-nav {
		width: 420px;
		margin: 0 auto;
		margin-right: 20px;
	}
</style>