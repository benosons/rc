<?php namespace App\Models;

use CodeIgniter\Model;

class ParamModel extends Model{

    public function getBerita($param = null, $role = null, $create_by = null, $update_by = null, $id = null)
    {
          return  $this->select(['data_berita.*', 'users.user_id', 'users.user_name', 'users.user_email', 'users.user_role', 'users.user_fullname'])->join('users','users.user_id = data_berita.create_by')->getWhere(['create_by' => $create_by])->getResult();
    }

    public function getparam($table = null, $id = null, $kota = null)
    {
          
          $builder = $this->db->table($table);
          if($id){
            if($table == 'data_rc'){
              $builder->where('id not in (select id_rc from data_master where id_rc = data_rc.id and kabupaten_kota = "'.$kota.'")');
            }
            $query   = $builder->getWhere(['id_parent' => $id]);
            
          }else{
            if($table == 'kabupaten_kota'){
              $builder->where('id in (select kabupaten_kota from data_master where kabupaten_kota = kabupaten_kota.id)');
            }else if($table == 'data_rc'){
              $builder->where('id not in (select id_rc from data_master where id_rc = data_rc.id)');
            }
            $query   = $builder->get();
          }
          // echo $this->db->getLastQuery();die;
          return  $query->getResult();
    }

    public function loadBerita($id)
    {
        $builder = $this->db->table('data_berita');
        $query   = $builder->getWhere(['satuan' => $id]);
        return  $query->getResult();
    }

    public function saveParam($table = null, $data = null)
    {
        return  $this->db->table($table)->insert($data);
    }

    public function getkota($param = null, $id = null )
    {
        if($param == 'kecamatan'){
          $sql = "select * from districts where regency_id = 3211";
        }else if($param == 'desa'){
          $sql = "select * from villages where district_id = $id";
        }
        
        $result = $this->db->query($sql);
        $row = $result->getResult();
        return $row;
    }

}
