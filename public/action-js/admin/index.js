console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-dashboard').addClass('active');

  $('#data-detail-rc').hide();
  $('#data-detail-duedate').hide();
  if($('#isRole').val() != '100'){
    loadmaster()
    getrc()
    
  }else{
    getkab();
  }


  // }else{
    
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
  $('#data-detail-duedate').show();
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
                { 'mDataProp': 'judul_kegiatan'},
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
                aTargets: [5]
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

    function getrc(param){
      $('#data-detail-rc').show();
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: "getdashboardrc",
        data : {
          param      : param,
        },
        success: function(result){
          let categ = [];
          let skor = [];
          let col = [];
          for (let index = 0; index < result.data.length; index++) {
            categ.push(result.data[index]['nama_rc']);
            skor.push(result.data[index]['skor']);

            switch (result.data[index]['flag']) {
              case '1':
                col.push('#33b2df');
                break;
              case '2':
                col.push('#d4526e');
                break;
              case '3':
                col.push('#f48024');
                break;
            
              default:
                break;
            }
            
          }

          console.log(result.data);
          var options_1 = {
            series: [{
            data: skor
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
          colors: col,
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
            categories: categ,
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          title: {
              text: 'Total Skore RC per Kegiatan',
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

          var elementExists = document.getElementById("chart_1");
          if(elementExists){
            $('#chart_1 > div').remove();
          }
          var chart_1 = new ApexCharts(document.querySelector("#chart_1"), options_1);
          chart_1.render();
  
        }
      });
    }

    function getkab(param){
      $('#data-detail-rc').show();
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: "kabupatendash",
        data : {
          param      : param,
        },
        success: function(result){
          console.log(result.data);
          let categor = [];
          let skore = [];
          for (let index = 0; index < result.data.length; index++) {
            categor.push(result.data[index]['name']);
            skore.push(result.data[index]['skor']);
            
          }
          var options = {
            series: [{
            data: skore
          }],
            chart: {
            type: 'bar',
            height: 380,
            events: {
                dataPointSelection: (event, chartContext, config) => {
                  let kab = parseInt(config.dataPointIndex) + 1;
                  loadmaster(kab);
                  getrc(kab)
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
            categories: categor,
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
        }
      })
    }
