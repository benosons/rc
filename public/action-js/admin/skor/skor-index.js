"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  //
    // Define variables
    //

    $('.date-picker').datepicker({
      autoclose: true,
      todayHighlight: true,
    })
    //show datepicker when clicking on the icon
    .next().on(ace.click_event, function(){
      $(this).prev().focus();
    });

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

  $('#modal_skor').on('shown.bs.modal', function (e) {
    
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

  $('#modal_skor').on('hidden.bs.modal', function (e) {
    $('#update_user').prop('disabled', false)
  })

  $('#modal_kegiatan').on('hidden.bs.modal', function (e) {
    $('.fileinput-remove').trigger('click');
    $('#save_kegiatan').prop('disabled', false)
  })

  $('#form-tanggal-revisi').hide();

  $('#group-upload-edit').css('display', 'none');

  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-skor').addClass('active');

  $('#all-kegiatan').DataTable();

  if($('#isRole').val() == '200'){
    loadparam('data_kegiatan');
    loadmaster();
  }else{
    loadparam('kabupaten_kota');
  }

  $('#kab_kota').chosen().on('change', function(){
    loadmaster($('#kab_kota').val());
  })

  $('input[name="status"]').on('click', function(){
    $(this).attr('checked');
    if($(this).val() == 2){
      $('#form-tanggal-revisi').show();
    }else{
      $('#form-tanggal-revisi').hide();
      $('.date-picker').val('');
    }
  })
  // $('#all-kegiatan').DataTable();
  window.file = []
  window.file_edit = []

  $('#save_kegiatan').on('click', function(){
      var id_kegiatan = $('#data_kegiatan').val();
      var id_kro = $('#data_kro').val();
      var id_ro = $('#data_ro').val();
      var id_rc = $('#data_rc').val();
      var judul_kegiatan = $('#judul_kegiatan').val();

      var formData = new FormData();
      formData.append('param', 'data_master');
      formData.append('id_kegiatan', id_kegiatan);
      formData.append('id_kro', id_kro);
      formData.append('id_ro', id_ro);
      formData.append('id_rc', id_rc);
      formData.append('judul_kegiatan', judul_kegiatan);

      for (let i = 0; i < window.file.length; i++) {
        formData.append('file[]', window.file[i]);
      }
      
      save(formData);
  });

  $('#save_skor').on('click', function(){
      var id_master = $('#id_master').val();
      
      var keterangan = $('#keterangan').val();
      var status = $('[name="status"]:checked').val();
      var skor = '';
      var skor1 = $('#skor_flag_1').val();
      var skor2 = $('#skor_flag_2').val();
      var skor3 = $('#skor_flag_3').val();

      if(skor1 != '0'){
        skor = skor1;
      }else if(skor2 != '0'){
        skor = skor2;
      }else if(skor3 != '0'){
        skor = skor3;
      }
      console.log(skor);
      var formData = new FormData();
      formData.append('param', 'data_master');
      formData.append('id_master', id_master);
      formData.append('skor', skor);
      formData.append('keterangan', keterangan);
      formData.append('status', status);

      if(status == '2'){
        formData.append('duedate', $('#duedate').val());
      }
      
      updateskor(formData);
  });

  $('#update_user').on('click', function(){
    var id_master = $('#id_master').val();
    var keterangan_user = $('#keterangan_user').val();
    var path_delete = $('#download').attr('href');
    
    var formData = new FormData();
    formData.append('param', 'data_master');
    formData.append('id_master', id_master);
    formData.append('keterangan_user', keterangan_user);
    formData.append('path_delete', path_delete);

    for (let i = 0; i < window.file_edit.length; i++) {
      formData.append('file[]', window.file_edit[i]);
    }
    
    updateskor(formData);
});

  $('#data_upload').on('fileloaded', function(event, file, previewId, fileId, index, reader) {  
        
      if(file.size < '100000')  {
          $('.kv-fileinput-error').html('<b class="text-danger">File harus lebih besar dari 100 KB.<b>');
          $('.kv-fileinput-error').css({display: 'block'});
          $('#save_kegiatan').prop('disabled', true)
      }else{
        window.file.push(file);
      }
  });

  $('#data_upload_edit').on('fileloaded', function(event, file, previewId, fileId, index, reader) {      
    if(file.size < '100000')  {
      $('.kv-fileinput-error').html('<b class="text-danger">File harus lebih besar dari 100 KB.<b>');
      $('.kv-fileinput-error').css({display: 'block'});
      $('#update_user').prop('disabled', true)
    }else{
      window.file_edit.push(file);
    }
  });

  $('#data_upload').on('filecleared', function(event) {
      window.file = [];
      $('#save_kegiatan').prop('disabled', false)
  });
  $('#data_upload_edit').on('filecleared', function(event) {
      window.file_edit = [];
  });

  $('#data_kegiatan').chosen().on('change', () => {
    // $('option:selected', this).val()
      loadparam('data_kro', $("#data_kegiatan").val());
  })

  $('#data_kro').chosen().on('change', () => {
      loadparam('data_ro', $('data_kro').val());
  })

  $('#data_ro').chosen().on('change', () => {
      loadparam('data_rc', $('data_ro').val());
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
                { 'mDataProp': 'create_date'},
                { 'mDataProp': 'status'},
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

                  var el = '';
                  switch (data) {
                    case '1':
                      el = '<span class="label label-success arrowed">valid</span>'
                      break;
                    case '2':
                      el = '<span class="label label-danger arrowed">tidak valid</span>'
                      break;
                    case '3':
                      el =  '<span class="label label-warning arrowed">menunggu validasi</span>'
                      break;
                  
                    default:
                      el =  '<span class="label label-warning arrowed">menunggu validasi</span>'
                      break;
                  }

                    return el;
                },
                aTargets: [6]
            },
              {
                  mRender: function ( data, type, row ) {

                    var el = `<button onclick="skor(`+row.id+`,'`+row.skor+`','`+row.filename+`','`+row.path+`','`+row.size+`','`+row.keterangan+`','`+row.keterangan_user+`',`+row.status+`, '`+row.due_date+`','`+row.create_date+`',`+row.flag+`,'`+row.judul_kegiatan+`')" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal_skor"><i class="fa fa-edit"></i></button>`;
                    if($('#isRole').val() == '200'){
                      el += `<button onclick="deleteya(`+row.id+`)" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i></button>`;
                    }
                      return el;
                  },
                  aTargets: [7]
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

          var child = $(table.table().header()).children();
          if(child.length > 1){
            $(child[1]).remove();
            $(table.columns(0).header()).removeAttr('rowspan');
            $(table.columns(1).header()).removeAttr('rowspan');
            $(table.columns(2).header()).removeAttr('rowspan');
            $(table.columns(3).header()).removeAttr('colspan');
            $(table.columns(4).header()).removeAttr('rowspan');
            $(table.columns(5).header()).removeAttr('rowspan');
            $(table.columns(6).header()).removeAttr('rowspan');
          }
          // table.clear().draw();

          $(table.table().header()).append(`<tr>
            <th class="text-center">Nama RC</th>
            <th class="text-center">Skor</th>
          </tr>`)

          $(table.columns(0).header()).attr('rowspan', 2);
          $(table.columns(1).header()).attr('rowspan', 2);
          $(table.columns(2).header()).attr('rowspan', 2);
          $(table.columns(3).header()).attr('colspan', 2);
          $(table.columns(4).header()).attr('rowspan', 2);
          $(table.columns(5).header()).attr('rowspan', 2);
          $(table.columns(6).header()).attr('rowspan', 2);
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
            $(table.columns(5).header()).removeAttr('rowspan');
            $(table.columns(6).header()).removeAttr('rowspan');
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
            // location.reload();
            loadmaster();
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
            // location.reload();
            loadmaster($('#kab_kota').val());
          });
        })
      }
    });
  };

  function skor(id, skor,  filename, path, size, keterangan, keterangan_user, status, duedate , createdtm, flag, judul){
    
    if(flag == 1){
      $("#skor_flag_1_chosen").css('display','block');
      $("#skor_flag_2_chosen").css('display','none');
      $("#skor_flag_3_chosen").css('display','none');

      $("#skor_flag_2").val(0);
      $("#skor_flag_3").val(0);

      $("#skor_flag_2").trigger('chosen:updated');
      $("#skor_flag_3").trigger('chosen:updated');

      if(skor){
        $("#skor_flag_1").val(skor);
        $("#skor_flag_1").trigger('chosen:updated');

        if($('#isRole').val() == '200'){
          $("#skor_flag_1").prop('disabled', true);
          $("#skor_flag_1").trigger('chosen:updated');
        }
      }
    }else if(flag == 2){
      $("#skor_flag_1_chosen").css('display','none');
      $("#skor_flag_2_chosen").css('display','block');
      $("#skor_flag_3_chosen").css('display','none');

      $("#skor_flag_1").val(0);
      $("#skor_flag_3").val(0);

      $("#skor_flag_1").trigger('chosen:updated');
      $("#skor_flag_3").trigger('chosen:updated');

      if(skor){
        $("#skor_flag_2").val(skor);
        $("#skor_flag_2").trigger('chosen:updated');

        if($('#isRole').val() == '200'){
          $("#skor_flag_2").prop('disabled', true);
          $("#skor_flag_2").trigger('chosen:updated');
        }
      }

    }else if(flag == 3){
      $("#skor_flag_1_chosen").css('display','none');
      $("#skor_flag_2_chosen").css('display','none');
      $("#skor_flag_3_chosen").css('display','block');

      $("#skor_flag_1").val(0);
      $("#skor_flag_2").val(0);

      $("#skor_flag_1").trigger('chosen:updated');
      $("#skor_flag_2").trigger('chosen:updated');

      if(skor){
        $("#skor_flag_3").val(skor);
        $("#skor_flag_3").trigger('chosen:updated');

        if($('#isRole').val() == '200'){
          $("#skor_flag_3").prop('disabled', true);
          $("#skor_flag_3").trigger('chosen:updated');
        }
      }
    }


    $('#id_master').val(id);
    $('#tgl_upload').html(createdtm)
    $('#ini_judul').html('<b>'+judul+'</b>')
    if($('#isRole').val() == '200'){
      $('input#skor').replaceWith('<span>'+skor+'</span>');
      $('#keterangan').replaceWith('<span id="keterangan" value="">'+keterangan+'</span>');
    }else{
      $('#skor').val(skor);
      $('#keterangan').val( keterangan=='null' ? '' :keterangan );
      $('#filename').nextAll().remove();
    }

    $('#filename').html(filename);
    $('#size').html('<code>'+bytesToSize(size)+'</code>');
    $('#download').attr('href', 'public/'+path+'/'+filename);
    $('#delete-file').attr('href', 'public/'+path+'/'+filename);

    if($('#isRole').val() == '200'){
      
        if(duedate == 'null'){
          $('#duedate').css('display', 'none');
        }else{
          $('#duedate').removeAttr('style');
        }

      $('.fileinput-remove').trigger('click');
      $('#group-upload-edit').css('display', 'none');
      
      var st = '';
      window.x ;

      if( keterangan == 'null' || keterangan == '' || keterangan == null ){
        
        $('#ket_admin').css('display', 'none');
      }else{
        $('#ket_admin').show();
      }
      
      if(keterangan_user == 'null' || keterangan_user == null || keterangan_user == '' ){
        $('#ket_user').css('display', 'none');
      }else{
        $('#ket_user').show();
      }
    }else{
      
      if( keterangan == 'null' || keterangan == '' || keterangan == null ){
        
        $('#ket_admin').css('display', 'none');
      }else{
        $('#ket_admin').show();
      }
      
      if(keterangan_user == 'null' || keterangan_user == null || keterangan_user == '' ){
        $('#ket_user').css('display', 'none');
      }else{
        $('#keterangan_user').html(keterangan_user);
        $('#ket_user').show();
      }
    }

    if($('#isRole').val() == '200'){
      if(status){
        if(status == 1){
          $('#update_user').hide();
          // $('#ket_user').hide();
          $('#filename').show();
          $('#filename').nextAll().remove();
          st = '<span class="text-success"> Data Valid </span>';
          clearInterval(window.x);
        }else{
          
          $('#update_user').show();
          // $('#ket_user').show();
          $('#filename').show();
          $('#filename').nextAll().remove();
          let del = `<a id="new-upload" onclick="newFile( `+id+`,'`+'public/'+path+'/'+filename+`')" class="btn btn-xs btn-warning" type="button">
                      <i class="ace-icon fa fa-file"></i> Upload Baru
                    </a>`;
          $('#filename').after(del);
          st = '<span class="text-danger"> Data Tidak Valid </span>';
                // Mengatur waktu akhir perhitungan mundur
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
              document.getElementById("demo").innerHTML = days + "Hari " + hours + "Jam "
              + minutes + "Menit " + seconds + "Detik ";
                
              // Jika hitungan mundur selesai, tulis beberapa teks 
              if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "Expired";
              }
            }, 1000);
        }

        if($('#isRole').val() == '100'){
          $('#filename').nextAll().remove();
        }

        if(status == '3'){
          st = '<span class="text-warning"> Mengunggu Validasi </span>';
          $('#update_user').hide();
          $('#filename').nextAll().remove();
          $('#keterangan_user').replaceWith('<span id="keterangan_user" value="">'+keterangan_user+'</span>');
          // $('#ket_admin').show();
          // $('#ket_user').show();
        }

        $('#stat').html(st);

      }else{
        $('[name="status"]').removeAttr('checked');
        $('#stat').html('');
        $('#filename').nextAll().remove();

        if(status == null){
          st = '<span class="text-warning"> Mengunggu Validasi </span>';
          $('#stat').html(st);
          $('#keterangan').html('');
          $('#keterangan').replaceWith('<span id="keterangan" value=""></span>');
          $('#keterangan_user').replaceWith('<span id="keterangan_user" value=""></span>');
          // $('#ket_admin').hide();
          // $('#ket_user').hide();
        }
      }
    }else{
      if(status == 1){
       $('#st_'+status).prop('checked', true);
       $('#st_1').prop('disabled', true);
       $('#st_2').prop('disabled', true);
       $('#keterangan').prop('disabled', true);
       $('#keterangan_user').prop('disabled', true);


        $("#skor_flag_1").prop('disabled', true);
        $("#skor_flag_1").trigger('chosen:updated');
        $("#skor_flag_2").prop('disabled', true);
        $("#skor_flag_2").trigger('chosen:updated');
        $("#skor_flag_3").prop('disabled', true);
        $("#skor_flag_3").trigger('chosen:updated');
      }else if(status == 2){
        $('#st_'+status).prop('checked', false);
        $('#st_1').prop('disabled', false);
        $('#st_2').prop('disabled', false);
        $('#keterangan').prop('disabled', false);
        $('#keterangan_user').prop('disabled', true);

 
         $("#skor_flag_1").prop('disabled', false);
         $("#skor_flag_1").trigger('chosen:updated');
         $("#skor_flag_2").prop('disabled', false);
         $("#skor_flag_2").trigger('chosen:updated');
         $("#skor_flag_3").prop('disabled', false);
         $("#skor_flag_3").trigger('chosen:updated');
      }else{
        $('#st_1').prop('checked', false);
        $('#st_2').prop('checked', false);
        $('#st_1').prop('disabled', false);
        $('#st_2').prop('disabled', false);

        $('#keterangan').prop('disabled', false);

        $("#skor_flag_1").prop('disabled', false);
        $("#skor_flag_1").trigger('chosen:updated');
        $("#skor_flag_2").prop('disabled', false);
        $("#skor_flag_2").trigger('chosen:updated');
        $("#skor_flag_3").prop('disabled', false);
        $("#skor_flag_3").trigger('chosen:updated');
      }
      
    }

  };

  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

 function newFile(id, path){
   $('#group-upload-edit').show();
   $('#filename').nextAll().remove();
   $('#filename').hide();
 }

 function deleteya(id){
      bootbox.confirm({
        message: "Yakin <b>Hapus</b> data kegiatan ini ?",
        buttons: {
        confirm: {
            label: '<i class="fa fa-check"></i> Yes',
            className: 'btn-success btn-xs',
        },
        cancel: {
            label: '<i class="fa fa-times"></i> No',
            className: 'btn-danger btn-xs',
        }
      },
        callback : function(result) {
        if(result) {
            isDelete(id);
          }
        }
    });
 }

 function isDelete(id){
  var formData = new FormData();
      formData.append('id', id);
  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'deletekegiatan',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Data Terhapus !',
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