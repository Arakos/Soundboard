<?php	// UTF-8 marker üüüüääääöööö

require_once $_SERVER['DOCUMENT_ROOT'].'/php/FileHelper.php';

class mymain {
	
	
	public static function main() {
		
		include('html/head.html');
		
		echo '
		
		<script>window.addEventListener("DOMContentLoaded", function() {init('.mymain::processGetArguments().');}, false);</script>
		
		';
		
		$filehelper = new FileHelper('/sounds');
		$colors = array();
		$sounds = $filehelper->get_files();
		if(count($sounds)) {
			foreach($sounds as $sound) {
				$tmp = split('\.',$sound);
				$category = $tmp[0];
				$name = $tmp[1];
				if(!isset($colors[$category])) {
					$colors[$category] = rand(0,255).','.rand(0,255).','.rand(0,255);
				}
				echo '
				<div name="soundwrapper" class="center-align sound">
					<div 
						id="'.$category.'.'.$name.'"
						category="'.$category.'" 
						draggable="true" 
						ondragstart="dragStart(event)"
						class="waves-effect truncate soundchip tooltip" 
						style="background-color: rgba('.$colors[$category].',0.6)"
						onclick="return play(\'sounds/'.$sound.'\');">
							<span class="tooltiptext">'.$name.'</span>
							<img validplaytarget="true" alt="" draggable="false" id="soundimg" src="img/category/'.$category.'.jpg">
							<div validplaytarget="true" class="soundname truncate">'.$name.'</div>
							<a class="chipbutton" onclick="addCopy(this.parentNode)">
								<i name="soundchipbuttonicon" class="soundchipbuttonicon material-icons">add</i>
							</a>
					</div>
				</div>
				';
			}
		}
		echo '
		
		';
		include('html/bottom.html');
	}
	
	public static function processGetArguments() {
		if(isset($_GET['key'])) {
			return '"'.$_GET['key'].'"';
		}
		return mymain::processGetArgumentsOLD();
	}

	
	public static function processGetArgumentsOLD() {
		try {
			$res = 'new Array( ';
			foreach($_GET as $arg => $value) {
				if(preg_match('/^[a-zA-Z0-9\.\s]{3,100}$/',$value)) {
					$res = $res.'"'.$value.'",';
				}
			}
			return substr($res,0,strlen($res)-1).')';
		} catch(Exception $e) {/*ignore*/}
		return 'new Array()';
	}
	
}

mymain::main();