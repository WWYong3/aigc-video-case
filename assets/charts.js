(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var chart1 = echarts.init(document.getElementById('chart-timeline'), null, { renderer: 'svg' });
  chart1.setOption({
    title: { text: '各阶段耗时（秒）', left: 'center', top: 10, textStyle: { color: muted, fontSize: 14 } },
    tooltip: { trigger: 'axis', appendToBody: true, formatter: function(p) { return p[0].name + ': ' + p[0].value + 's'; } },
    grid: { left: '10%', right: '8%', bottom: '18%', top: '20%' },
    xAxis: {
      type: 'category',
      data: ['文案生成', '语音合成', '素材检索', '素材下载', '片段拼接', '最终合成'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12, interval: 0, rotate: 20 }
    },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: rule } }, axisLabel: { color: muted, fontSize: 12 }, splitLine: { lineStyle: { color: rule, type: 'dashed' } } },
    series: [{
      name: '耗时',
      type: 'bar',
      data: [139, 9, 21, 1160, 180, 470],
      itemStyle: {
        color: function(p) {
          var colors = [accent, accent2, accent, accent2, accent, accent2];
          return colors[p.dataIndex];
        },
        borderRadius: [6, 6, 0, 0]
      },
      barWidth: '45%',
      label: { show: true, position: 'top', color: ink, fontSize: 12, formatter: '{c}s' }
    }],
    animation: false
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  var chart2 = echarts.init(document.getElementById('chart-materials'), null, { renderer: 'svg' });
  chart2.setOption({
    title: { text: '各搜索词素材数量', left: 'center', top: 10, textStyle: { color: muted, fontSize: 14 } },
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}个 ({d}%)' },
    legend: { bottom: 5, textStyle: { color: muted, fontSize: 11 } },
    series: [{
      type: 'pie',
      radius: ['35%', '62%'],
      center: ['50%', '48%'],
      data: [
        { value: 18, name: 'AI large model' },
        { value: 20, name: 'AI intelligent agent' },
        { value: 15, name: 'AI future tech' },
        { value: 19, name: 'AI innovation' },
        { value: 20, name: 'AI future' }
      ],
      itemStyle: { borderColor: bg2, borderWidth: 2 },
      color: [accent, accent2, accent + 'cc', accent2 + 'cc', muted],
      label: { color: ink, fontSize: 11 }
    }],
    animation: false
  });
  window.addEventListener('resize', function() { chart2.resize(); });
})();
