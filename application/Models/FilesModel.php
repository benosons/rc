<?php namespace App\Models;

use CodeIgniter\Model;

class FilesModel extends Model{
    protected $table = 'data_file';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_parent','filename','type','path','size','create_date','create_by'];

    public function updateFile($id = null, $data = null)
    {

      $builder = $this->db->table('data_file');
      $query   = $builder->where('id_parent', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;
      return true;
    }

}
