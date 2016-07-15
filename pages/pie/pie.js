define(['jquery', 'knockout', 'text!pages/pie/pie.html', 'echarts'], function($, ko, template, echarts){
	var viewModel = {
		pieData: ko.observableArray([]),

		setData: function(data){
			this.pieData(data);
		},

		viewPie: function(){
			//提取name
			var names = [];
			for(var val of this.pieData())
				names.push(val.name);

			// 基于准备好的dom，初始化echarts实例
	        var myChart = echarts.init(document.getElementById('main'));
	
	        // 指定图表的配置项和数据
	        var option = {
			    title : {
			        text: '某站点用户访问来源',
			        subtext: '纯属虚构',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: names
			    },
			    series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data: this.pieData(),
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
	        myChart.setOption(option);
		},

		load: function(){
			var self = this;
			$.ajax({
				type: 'post',
				url: 'pages/pie/data.txt',
				dataType: 'json',
				success: function(data){
					self.setData(data.pieData);
					self.viewPie();
				},
				error: function(data){
					alert("error: " + JSON.stringify(data));
				}
			});
		}
	}
	

	var init = function(){
		viewModel.load();
	}

	return {
		'model' : viewModel,
		'template' : template,
		'init' : init
	};
});