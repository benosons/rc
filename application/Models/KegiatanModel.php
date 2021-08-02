<?php namespace App\Models;

use CodeIgniter\Model;

class KegiatanModel extends Model{
    protected $table = 'data_kegiatan';
    protected $primaryKey = 'id';
    protected $allowedFields = ['kode_program','kode_kegiatan','nama_kegiatan','created_by','updated_by','create_date','update_date'];
    protected $createdField  = 'create_date';
    protected $updatedField  = 'update_date';

    public function getKegiatan($code = null, $userid = null, $kota = null)
    {
        
          $builder = $this->db->table('data_master mas');
          $builder->select('mas.*, 
                            ke.name as nama_kegiatan, 
                            ke.code as kode_kegiatan, 
                            
                            kr.name as nama_kro,
                            kr.code as kode_kro,

                            ro.name as nama_ro,
                            ro.code as kode_ro,

                            rc.name as nama_rc,
                            rc.code as kode_rc,
                            rc.flag,
                            fl.filename,
                            fl.path,
                            fl.size');

          $builder->join('data_kegiatan ke', 'ke.id = mas.id_kegiatan');
          $builder->join('data_kro kr', 'kr.id = mas.id_kro');
          $builder->join('data_ro ro', 'ro.id = mas.id_ro');
          $builder->join('data_rc rc', 'rc.id = mas.id_rc');
          $builder->join('data_file fl', 'fl.id_parent = mas.id');
          
          if($code == 'user'){
            $query   = $builder->getWhere(['kabupaten_kota' => $kota, 'mas.create_by' => $userid]);
          }else if($code == 'admin'){
            $query   = $builder->getWhere(['kabupaten_kota' => $kota]);
          }else{
            $query   = $builder->get();
          }
                    // echo $this->db->getLastQuery();die;

          return  $query->getResult();
    }

    public function getKegiatandash($code = null, $userid = null, $kota = null)
    {
        
          $builder = $this->db->table('data_master mas');
          $builder->select('mas.*, 
                            ke.name as nama_kegiatan, 
                            ke.code as kode_kegiatan, 
                            
                            kr.name as nama_kro,
                            kr.code as kode_kro,

                            ro.name as nama_ro,
                            ro.code as kode_ro,

                            rc.name as nama_rc,
                            rc.code as kode_rc,
                            fl.filename,
                            fl.path,
                            fl.size');

          $builder->join('data_kegiatan ke', 'ke.id = mas.id_kegiatan');
          $builder->join('data_kro kr', 'kr.id = mas.id_kro');
          $builder->join('data_ro ro', 'ro.id = mas.id_ro');
          $builder->join('data_rc rc', 'rc.id = mas.id_rc');
          $builder->join('data_file fl', 'fl.id_parent = mas.id');
          
          if($code == 'user'){
            $query   = $builder->getWhere(['kabupaten_kota' => $kota, 'mas.create_by' => $userid, 'mas.status' => '2']);
          }else if($code == 'admin'){
            $query   = $builder->getWhere(['kabupaten_kota' => $kota, 'mas.status' => '2']);
          }else{
            $query   = $builder->get();
          }
                    // echo $this->db->getLastQuery();die;

          return  $query->getResult();
    }

    public function saveParam($table = null, $data = null)
    {
        return  $this->db->table($table)->insert($data);
    }

    public function update($table = null, $id = null, $data = null)
    {

      $builder = $this->db->table($table);
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;
      return true;
    }

    public function checknotif($code = null, $userid = null, $kota = null)
    {
        
          $builder = $this->db->table('data_master mas');
          $builder->select('count(*) as total');
          
          if($code == 'user'){
            $query   = $builder->getWhere(['status' => '2', 'mas.create_by' => $userid]);
          }else if($code == 'admin'){
            $query   = $builder->getWhere(['status' => '2']);
          }else{
            $query   = $builder->get();
          }
                    // echo $this->db->getLastQuery();die;

          return  $query->getResult();
    }

    public function getdashrc($code = null, $userid = null, $kota = null)
    {
        
          $builder = $this->db->table('data_master mas');
          $builder->select('mas.*, 
                            ke.name as nama_kegiatan, 
                            ke.code as kode_kegiatan, 
                            
                            kr.name as nama_kro,
                            kr.code as kode_kro,

                            ro.name as nama_ro,
                            ro.code as kode_ro,

                            rc.name as nama_rc,
                            rc.code as kode_rc,
                            fl.filename,
                            fl.path,
                            fl.size,
                            rc.flag');

          $builder->join('data_kegiatan ke', 'ke.id = mas.id_kegiatan');
          $builder->join('data_kro kr', 'kr.id = mas.id_kro');
          $builder->join('data_ro ro', 'ro.id = mas.id_ro');
          $builder->join('data_rc rc', 'rc.id = mas.id_rc');
          $builder->join('data_file fl', 'fl.id_parent = mas.id');
          
          if($code == 'user'){
            $query   = $builder->getWhere(['mas.create_by' => $userid]);
          }else if($code == 'admin'){
            $query   = $builder->getWhere(['kabupaten_kota' => $kota]);
          }else{
            $query   = $builder->get();
          }
                    // echo $this->db->getLastQuery();die;

          return  $query->getResult();
    }

    public function kabupatendash($code = null, $userid = null, $kota = null)
    {
        
          $builder = $this->db->table('kabupaten_kota kk ');
          $builder->select('name, sum(IF(skor is null , 0, CONVERT(skor,UNSIGNED INTEGER))) as skor');
          $builder->join('data_master dm', 'dm.kabupaten_kota = kk.id');
          
          if($code == 'user'){
            $builder->getWhere(['kabupaten_kota' => $kota, 'mas.create_by' => $userid]);
            $query = $builder->groupBy("name");
          }else if($code == 'admin'){
            $builder->groupBy("name");
            $query = $builder->get();
          }else{
            $builder->get();
            $query = $builder->groupBy("name");
          }
                    // echo $this->db->getLastQuery();die;

          return  $query->getResult();
    }

}
