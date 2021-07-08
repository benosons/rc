<?php namespace App\Models;

use CodeIgniter\Model;

class KegiatanModel extends Model{
    protected $table = 'data_kegiatan';
    protected $primaryKey = 'id';
    protected $allowedFields = ['kode_program','kode_kegiatan','nama_kegiatan','created_by','updated_by','create_date','update_date'];
    protected $createdField  = 'create_date';
    protected $updatedField  = 'update_date';

    public function getKegiatan($code = null)
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

          if($code){
            $query   = $builder->getWhere(['kode_program' => $code]);
          }else{
            $query   = $builder->get();
          }
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

}
