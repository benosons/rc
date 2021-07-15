console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-dashboard').addClass('active');

  // if($('#isRole').val() == '100'){
    var options = {
      series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 1400, 1401, 1459, 1567, 1678]
    }],
      chart: {
      type: 'bar',
      height: 380
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
      '#f48024', '#69d2e7', '#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B',
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: [
        'Kabupaten Lampung Barat','Kabupaten Tanggamus','Kabupaten Lampung Selatan ','Kabupaten Lampung Timur ','Kabupaten Lampung Tengah','Kabupaten Lampung Utara','Kabupaten Way Kanan','Kabupaten Tulang Bawang ','Kabupaten Pesawaran','Kabupaten Pringsewu ','Kabupaten Mesuji','Kabupaten Tulang Bawang Barat ','Kabupaten Pesisir Barat','Kota Bandar Lampung ','Kota Metro ',
      ],
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
        text: 'Total Skor kabupaten Kota',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: 'Data Skor Kabupaten Kota',
        align: 'center',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  // }else{
    var options_1 = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      chart: {
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

    var chart_1 = new ApexCharts(document.querySelector("#chart_1"), options_1);
    chart_1.render();
  // }
  
});
