window.onload = function () {
  const circlularProgress = document.querySelectorAll('.circularProgressMAF');
  const progressColor = ['#31A68E', '#FF5630', '#4B89FF'];
  const rad = Math.PI / 180;
  const fontSize = 14; // smaller for compact center text
  const strokeWidth = 8; // thicker ring

  circlularProgress.forEach((canvas, i) => {
    const ctx = canvas.getContext('2d');
    const size = 80; // fixed compact size
    canvas.width = canvas.height = size;

    const center = size / 2;
    const radius = center - strokeWidth;
    const value = parseFloat(canvas.getAttribute('data-progress-value'));
    const endAngle = (value / 100) * 360;

    // Background circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#E5EAF2';
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.arc(center, center, radius, -90 * rad, (endAngle - 90) * rad);
    ctx.strokeStyle = progressColor[i % progressColor.length];
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Text in center
    ctx.fillStyle = progressColor[i % progressColor.length];
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value + '%', center, center);
  });
};



      
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Day', 'Week', 'Month'],
    ['May5',  99,     180],
    ['May6',  100,    220],
    ['May7',  180,    400],
    ['May8',  230,    500],
    ['May9',  260,    510],
    ['May10', 150,    300],
    ['May11', 50,     210],
    ['May12', 0,      220]
  ]);

  var options = {
    title: 'Task Summary',
    curveType: 'function',
    legend: { position: 'top'},
    chartArea: { width: '90%', height: '70%' },
    width: '100%',
    height: '300px',
    colors: ['#FBAE08','#3CD856']
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}