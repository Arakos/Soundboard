<?php	// UTF-8 marker üüüüääääöööö

class FileHelper
{

	protected $source_dir = null;
	protected $properties_file = "name";
	
	public function __construct($source_dir) 
    {
		if(!isset($source_dir))
			throw new Exception('No source directory specified while constructing filehelper!');
		$this->source_dir = $_SERVER['DOCUMENT_ROOT'].$source_dir.'/';
	}

    public function __destruct() 
    {
		
    }

	/* function:  returns files from dir */
	public function get_files($exts = array('mp3'), $sort = "time") {
		try {
			$files = array();
			$sortBy = array();
			if($handle = opendir($this->source_dir)) {
				while(false !== ($file = readdir($handle))) {
					$extension = strtolower($this->get_file_extension($file));
					if($extension && in_array($extension,$exts)) {
						$files[] = $file;
						$sortBy[] = $this->sorter($file, $sort);
					}
				}
				closedir($handle);
			}
			array_multisort($files, SORT_ASC, $sortBy);
			return $files;
		} catch (Exception $e) {
			echo '<p>Ein Fehler in filehelper ist aufgetreten!</p><br><p>',$e,'</p>';
		}
	}
	
	public function get_dirs($current_dir) {
		if(!isset($current_dir)) {
			echo 'get_dirs in filehelper.php with empty source dir';
			return 0;
		}
		$tmp = $_SERVER['DOCUMENT_ROOT'].$current_dir;
		$directories = glob($tmp.'*' , GLOB_ONLYDIR);
		
		$test = str_replace($tmp, '', $directories);
		return $test;
	}

	/* function:  returns a file's extension */
	public function get_file_extension($file_name) {
		try {
			return substr(strrchr($file_name,'.'),1);
		} catch (Exception $e) {
			echo '<p>Ein Fehler in filehelper ist aufgetreten!</p><br><p>',$e,'</p>';
		}
	}
	
	/* function to search a directory for a .name file, and exclude the string ../abc/EXCLUDED.name and return it */
	public function get_dir_name($dir = "x") {
		$tmp = "x";
		if(strcmp($dir, $tmp) == 0) {
			$tmp = $this->source_dir;
		} else {
			$tmp = $_SERVER['DOCUMENT_ROOT'].$dir.'/';
		}
		$dir = $tmp;
		
		try {
			$propfile = null;
			if($handle = opendir($dir)) {
				while(false !== ($file = readdir($handle))) {
					$extension = strtolower($this->get_file_extension($file));
					if(strcmp($extension, $this->properties_file) == 0) {
						$propfile = $file;
					}
				}
				closedir($handle);
			}
			if(!isset($propfile)) {
				throw new Exception('No properties file (.name file) found in directory');
			}
			return substr($propfile, 0, -5);
		} catch (Exception $e) {
			return null;
		}
	}
	
	private function sorter($file, $sort) {
		if(strcmp($sort, "time") == 0)
			return filemtime($this->source_dir.'/'.$file);
	}
	

} // end of class
