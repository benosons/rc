"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  //
    // Define variables
    //

    // Modal template
    var modalTemplate = '<div class="modal-dialog modal-lg" role="document">\n' +
        '  <div class="modal-content">\n' +
        '    <div class="modal-header">\n' +
        '      <div class="kv-zoom-actions btn-group">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
        '      <h6 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h6>\n' +
        '    </div>\n' +
        '    <div class="modal-body">\n' +
        '      <div class="floating-buttons btn-group"></div>\n' +
        '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n';

    // Buttons inside zoom modal
    var previewZoomButtonClasses = {
        toggleheader: 'btn btn-default btn-icon btn-xs btn-header-toggle',
        fullscreen: 'btn btn-default btn-icon btn-xs',
        borderless: 'btn btn-default btn-icon btn-xs',
        close: 'btn btn-default btn-icon btn-xs'
    };

    // Icons inside zoom modal classes
    var previewZoomButtonIcons = {
        prev: '<i class="icon-arrow-left32"></i>',
        next: '<i class="icon-arrow-right32"></i>',
        toggleheader: '<i class="icon-menu-open"></i>',
        fullscreen: '<i class="icon-screen-full"></i>',
        borderless: '<i class="icon-alignment-unalign"></i>',
        close: '<i class="icon-cross3"></i>'
    };

    // File actions
    var fileActionSettings = {
        zoomClass: 'btn btn-link btn-xs btn-icon',
        zoomIcon: '<i class="icon-zoomin3"></i>',
        dragClass: 'btn btn-link btn-xs btn-icon',
        dragIcon: '<i class="icon-three-bars"></i>',
        removeClass: 'btn btn-link btn-icon btn-xs',
        removeIcon: '<i class="icon-trash"></i>',
        indicatorNew: '<i class="icon-file-plus text-slate"></i>',
        indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
        indicatorError: '<i class="icon-cross2 text-danger"></i>',
        indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>'
    };

  $('#modal_kegiatan').on('shown.bs.modal', function (e) {
    $('.file-input').fileinput({
        browseLabel: 'Pilih File',
        removeLabel: 'Hapus',
        showUpload : false,
        showRemove : true,
        showZoom: false,
        browseIcon: '<i class="icon-file-plus"></i>',
        removeIcon: '<i class="icon-trash"></i>',
        layoutTemplates: {
            icon: '<i class="icon-file-check"></i>',
            modal: modalTemplate
        },
        initialCaption: "No file selected",
        previewZoomButtonClasses: previewZoomButtonClasses,
        previewZoomButtonIcons: previewZoomButtonIcons,
        fileActionSettings: fileActionSettings
    });
  })

  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-skor').addClass('active');

  $('#all-kegiatan').DataTable();

  if($('#isRole').val() == '200'){
    loadparam('data_kegiatan');
    loadmaster();
  }else{
    loadparam('kabupaten_kota');
  }

  $('#kab_kota').chosen().on('change', () => {
    loadmaster($('option:selected', this).val());
  })
  // $('#all-kegiatan').DataTable();
  window.file = []
  $('#save_kegiatan').on('click', function(){
      var id_kegiatan = $('#data_kegiatan').val();
      var id_kro = $('#data_kro').val();
      var id_ro = $('#data_ro').val();
      var id_rc = $('#data_rc').val();

      var formData = new FormData();
      formData.append('param', 'data_master');
      formData.append('id_kegiatan', id_kegiatan);
      formData.append('id_kro', id_kro);
      formData.append('id_ro', id_ro);
      formData.append('id_rc', id_rc);

      for (let i = 0; i < window.file.length; i++) {
        formData.append('file[]', window.file[i]);
      }
      
      save(formData);
  });

  $('#save_skor').on('click', function(){
      var id_master = $('#id_master').val();
      var skor = $('#skor').val();
      var keterangan = $('#keterangan').val();
      
      var formData = new FormData();
      formData.append('param', 'data_master');
      formData.append('id_master', id_master);
      formData.append('skor', skor);
      formData.append('keterangan', keterangan);
      
      updateskor(formData);
  });

  $('#data_upload').on('fileloaded', function(event, file, previewId, fileId, index, reader) {      
      window.file.push(file);
  });

  $('#data_upload').on('filecleared', function(event) {
      window.file = [];
  });

  $('#data_kegiatan').chosen().on('change', () => {
      loadparam('data_kro', $('option:selected', this).val());
  })

  $('#data_kro').chosen().on('change', () => {
      loadparam('data_ro', $('option:selected', this).val());
  })

  $('#data_ro').chosen().on('change', () => {
      loadparam('data_rc', $('option:selected', this).val());
  })

});

function loadmaster(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadkegiatan',
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
                { 'mDataProp': 'nama_kegiatan'},
                { 'mDataProp': 'nama_kro'},
                { 'mDataProp': 'nama_ro'},
                { 'mDataProp': 'nama_rc'},
                { 'mDataProp': 'skor'},
                { 'mDataProp': 'id', 'className' : 'text-center'},
            ],
            order: [[0, 'ASC']],
            
            fixedColumns: true,
            aoColumnDefs:[
              // { "visible": false, "targets": [0 , 1, 2] },
              {
                  mRender: function ( data, type, row ) {

                    var el = row.kode_kegiatan+'-'+row.nama_kegiatan;

                      return el;
                  },
                  aTargets: [0]
              },
              {
                  mRender: function ( data, type, row ) {

                    var el = row.kode_kro+'-'+row.nama_kro;

                      return el;
                  },
                  aTargets: [1]
              },
              {
                mRender: function ( data, type, row ) {

                  var el = row.kode_ro+'-'+row.nama_ro;

                    return el;
                },
                aTargets: [2]
            },
              {
                  mRender: function ( data, type, row ) {

                    var el = `<button onclick="skor(`+row.id+`,'`+row.skor+`','`+row.filename+`','`+row.path+`','`+row.size+`','`+row.keterangan+`')" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal_skor"><i class="fa fa-edit"></i></button>`;

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

          $(table.table().header()).append(`<tr>
            <th class="text-center">Nama RC</th>
            <th class="text-center">Skor</th>
          </tr>`)

          $(table.columns(0).header()).attr('rowspan', 2);
          $(table.columns(1).header()).attr('rowspan', 2);
          $(table.columns(2).header()).attr('rowspan', 2);
          $(table.columns(3).header()).attr('colspan', 2);
          $(table.columns(4).header()).attr('rowspan', 2);
        }else{
          var table = $('#all-kegiatan').DataTable();
          var child = $(table.table().header()).children();
          if(child.length > 1){
            $(child[1]).remove();
            $(table.columns(0).header()).removeAttr('rowspan');
            $(table.columns(1).header()).removeAttr('rowspan');
            $(table.columns(2).header()).removeAttr('rowspan');
            $(table.columns(3).header()).removeAttr('colspan');
            $(table.columns(4).header()).removeAttr('rowspan');
          }
          table.clear().draw();
        }

        }
      })
    }

function loadparam(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadparam',
      data : {
              param   : param,
              id      : id,
      },
      success: function(result){
          let data = result.data;
          let el   = '<option value="">  </option>';
          if(param == 'data_kegiatan'){
            for (var i = 0; i < data.length; i++) {
              el += '<option value="'+data[i].id+'">'+data[i].code+'-'+data[i].name+'</option>';
            }
            $('#data_kegiatan').append(el);
            $('#data_kegiatan').trigger("chosen:updated");
          }else if(param == 'data_kro'){
            for (var i = 0; i < data.length; i++) {
              el += '<option value="'+data[i].id+'">'+data[i].code+'-'+data[i].name+'</option>';
            }
            $('#data_kro').append(el);
            $('#data_kro').trigger("chosen:updated");
          }else if(param == 'data_ro'){
            for (var i = 0; i < data.length; i++) {
              el += '<option value="'+data[i].id+'">'+data[i].code+'-'+data[i].name+'</option>';
            }
            $('#data_ro').append(el);
            $('#data_ro').trigger("chosen:updated");
          }else if(param == 'data_rc'){
            for (var i = 0; i < data.length; i++) {
              el += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
            }
            $('#data_rc').append(el);
            $('#data_rc').trigger("chosen:updated");
          }else if(param == 'kabupaten_kota'){
            for (var i = 0; i < data.length; i++) {
              el += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
            }
            $('#kab_kota').append(el);
            $('#kab_kota').trigger("chosen:updated");
          }

        }
      })
    }

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addKegiatan',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Kegiatan !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){
            location.reload();
          });
        })
      }
    });
  };

function updateskor(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'udpateSkor',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Skor !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){
            location.reload();
          });
        })
      }
    });
  };

  function skor(id, skor,  filename, path, size, keterangan){
    $('#id_master').val(id);
    $('#skor').val(skor);
    $('#filename').html(filename);
    $('#size').html('<code>'+bytesToSize(size)+'</code>');
    $('#download').attr('href', 'public/'+path+'/'+filename);

    $('#keterangan').val(keterangan=='null'?'':keterangan);
  };

  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }
