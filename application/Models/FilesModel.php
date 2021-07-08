<?php namespace App\Models;

use CodeIgniter\Model;

class FilesModel extends Model{
    protected $table = 'data_file';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_parent','filename','type','path','size','create_date','create_by'];

}
