<?php	// UTF-8 marker üüüüääääöööö

require_once $_SERVER['DOCUMENT_ROOT'].'/../../files/config.php';

class SoundRequestHelper {
	
	
	public static function main() {
		if(isset($_GET['key'])) {
			echo SoundRequestHelper::getSoundValue($_GET['key']);
		} else {
			echo SoundRequestHelper::getSoundKey();
		}
	}
	
	public static function getSoundValue($key) {
		$returnValue = 'ERROR: No sound for key '.$key.' found!';
		$db = getDBConnect();
		if(preg_match('/^[a-zA-Z0-9]{3,100}$/',$key)) {
			if($result = $db->query('SELECT soundvalues FROM Soundboard WHERE soundkey = "'.$key.'"')) {
				if($result->num_rows > 0) {
					$returnValue = $result->fetch_row()[0];
				}
			}
		} else {
			$returnValue = 'ERROR: passed key does not match regex!';
		}
		mysqli_close($db);
		return $returnValue;
	}

	public static function getSoundKey() {
		$insertQuery = "INSERT INTO Soundboard(soundkey, soundvalues, timestamp) VALUES(?, ?, ?)";
		try {
			$res = '';
			foreach($_GET as $arg => $value) {
				if(preg_match('/^[a-zA-Z0-9\.\s]{3,100}$/',$value)) {
					$res = $res.$value.';';
				}
			}
			if(strlen($res) > 0) {
				$res = substr($res,0,strlen($res)-1);
				$key = SoundRequestHelper::simpleHash($res);
				$db = getDBConnect();
				
				if($result = $db->query('SELECT soundvalues FROM Soundboard WHERE soundkey = "'.$key.'"')) {
					if($result->num_rows < 1) {	// sound was never requested before -> insert in db
						$prepStm = $db->prepare($insertQuery);
						$date = date("D M d, Y G:i");
						$prepStm->bind_param("sss", $key, $res, $date);
						$prepStm->execute();
						$prepStm->close();	
					}
					$result->free_result();
				} else {
					return "ERROR: No select query result. DB might be unavailable.";
				}
				mysqli_close($db);
				return $key;
			}
			return 'ERROR: No valid sound arguments given.';
		} catch(Exception $e) {
			return 'ERROR: '.$e;
		}
	}
	
	public static function simpleHash($str) {
		$hash = 1;
		$cnt = 0;
		if (strlen($str) > 0) {
			while (strlen($str) > $cnt) {
				$char = ord($str[$cnt]);
				$hash = $hash * 31 + $char;
				$hash = ($hash % 10000000);
				$cnt = $cnt + 1;
			}
		}
		return $hash;
	}
	
}

SoundRequestHelper::main();