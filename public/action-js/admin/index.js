console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-dashboard').addClass('active');

  if($('#isRole').val() != '100'){
    loadmaster()
  }

    var options = {
      series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 1400, 1401, 1459, 1567, 1678]
    }],
      chart: {
      type: 'bar',
      height: 380,
      events: {
          dataPointSelection: (event, chartContext, config) => {
            let kab = parseInt(config.dataPointIndex) + 1;
            loadmaster(kab);
          }
        }
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
      series: [{
      data: [25, 25, 10, 5, 5, 5, 5, 5, 5, 5, 5]
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
    colors: ['#33b2df', '#33b2df', '#d4526e', '#f48024', '#f48024', '#f48024', '#f48024', '#f48024',
      '#f48024', '#f48024', '#f48024'
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
        'Tidak ada SPAM Belum Berfungsi',
        'Idle Capacity (< 50% dari Kapasitas Terpasang, max. 150 L/det)',
        'Rencana Induk SPAM (RISPAM)',
        'Studi Kelayakan/Justifikasi Teknis',
        'Detailed Engineering Design (DED)',
        'Rencana Anggaran Biaya (RAB)',
        'Izin Pemanfaatan Air Baku',
        'Sertifikat Kesiapan Lahan',
        'Kesiapan Lembaga Pengelola',
        'Surat Usulan Kepala Daerah',
        'Surat Pernyataan Kepala Daerah'
      ],
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
        text: 'Total Detail RC',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: 'Data Detail RC',
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

    var chart_1 = new ApexCharts(document.querySelector("#chart_1"), options_1);
    chart_1.render();
  // }

  var options_time = {
    series: [
    {
      data: [
        {
          x: 'Studi Kelayakan/Justifikasi Teknis',
          y: [
            new Date('2021-07-02').getTime(),
            new Date('2021-07-04').getTime()
          ]
        },
        {
          x: 'Detailed Engineering Design (DED)',
          y: [
            new Date('2021-07-04').getTime(),
            new Date('2021-07-08').getTime()
          ]
        },
        {
          x: 'Izin Pemanfaatan Air Baku',
          y: [
            new Date('2021-07-08').getTime(),
            new Date('2021-07-12').getTime()
          ]
        }
      ]
    }
  ],
    chart: {
    height: 350,
    type: 'rangeBar'
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  xaxis: {
    type: 'datetime'
  }
  };

  // var chart_time = new ApexCharts(document.querySelector("#chart_time"), options_time);
  // chart_time.render();
  
});

function loadmaster(param){
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#all-kegiatan").offset().top
}, 2000);
  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadkegiatandash',
      data : {
              param      : param,
      },
      success: function(result){
          let code = result.code;

         
        if(code == '1'){

          var table = $('#all-kegiatan').DataTable({
            destroy: true,
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: false,
            pageLength: 10,
            aaData: result.data,
            aoColumns: [
                { 'mDataProp': 'nama_ro'},
                { 'mDataProp': 'nama_rc'},
                { 'mDataProp': 'skor'},
                { 'mDataProp': 'due_date'},
                { 'mDataProp': 'due_date'},
            ],
            order: [[0, 'ASC']],
            
            fixedColumns: true,
            aoColumnDefs:[
              // { "visible": false, "targets": [0 , 1, 2] },
              
              {
                mRender: function ( data, type, row ) {

                  var el = row.kode_ro+'-'+row.nama_ro;

                    return el;
                },
                aTargets: [0]
              },
              {
                mRender: function ( data, type, row ) {
                  
                  var el = '<span class="editable editable-click" id="demo'+row.id+'"></span>';
                  duedate(data, row.id);

                    return el;
                },
                aTargets: [4]
              },
            ],
          //   "drawCallback": function ( settings ) {
          //     var api = this.api();
          //     var rows = api.rows( {page:'current'} ).nodes();
          //     var last=null;
              
          //     api.rows({page:'current'} ).data().each( function (data, i ) {
          //         let nama_kegiatan = data.nama_kegiatan;
          //         let nama_kro = data.nama_kro;
          //         let nama_ro = data.nama_ro;

          //         if ( last !== nama_kegiatan ) {
          //             $(rows).eq( i ).before(
          //                 `<tr class="group bg-default" >
          //                     <td rowspan="2">`+nama_kegiatan+`</td>
          //                     <td rowspan="2">`+nama_kro+`</td>
          //                     <td rowspan="2">`+nama_ro+`</td>
          //                     <td></td>
          //                     <td >100</td>
          //                 </tr>`
          //             );
  
          //             last = nama_kegiatan;
          //         }
          //     } );
          // },
            fnInitComplete: function () {

                var that = this;
                var td ;
                var tr ;
                this.$('td').click( function () {
                    td = this;
                });
                this.$('tr').click( function () {
                    tr = this;
                });
            }
          });
          
        }else{
          var table = $('#all-kegiatan').DataTable();          
          table.clear().draw();
        }

        }
      })
    }


    function duedate(duedate, id){
      var countDownDate = new Date(duedate).getTime();
          
      // Memperbarui hitungan mundur setiap 1 detik
      window.x = setInterval(function() {

        // Untuk mendapatkan tanggal dan waktu hari ini
        var now = new Date().getTime();
          
        // Temukan jarak antara sekarang dan tanggal hitung mundur
        var distance = countDownDate - now;
          
        // Perhitungan waktu untuk hari, jam, menit dan detik
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
        // Keluarkan hasil dalam elemen dengan id = "demo"
        document.getElementById("demo"+id).innerHTML = days + "Hari " + hours + "Jam "
        + minutes + "Menit " + seconds + "Detik ";
          
        // Jika hitungan mundur selesai, tulis beberapa teks 
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("demo"+id).innerHTML = "Expired";
        }
      }, 1000);
    }
