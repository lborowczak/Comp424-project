<?php


if (isset($_POST['submitted']))  {

$servername = "localhost";
$username = "web";
$password = "webpassword";
$dbname = "highscores";

$conn = new mysqli($servername, $username, $password, $dbname);


		//include('testphp.php');
		$un = $_POST['un'];
		$em = $_POST['em'];
		$sc = $_POST['sc'];
		$sqlinsert = "INSERT IGNORE INTO MYTABLE(UserName, Email, HIGHSCORE) VALUES ('$un','$em',$sc)";

		if(!mysqli_query($conn, $sqlinsert)) {
			die('error inserting new record');

		}//end of nested if

		$newrecord = "1 record added to the MYDB";

}// end of the main statement


?>

<!DOCTYPE html>
<html lang="en">
  <head>
   <meta charset="UTF-8">
    <!-- Add google webfont and css stylesheet-->
    <link href='https://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <title>
        HTML5 Typing Game
    </title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <meta charset="UTF-8">
  </head>
  <body>
    <header class="banner">
      <h1>Welcome to the game that is not named yet!</h1>
      <p>TEXTFORGAME</p>
    </header>

    <nav>
      <ul>
        <li><a href="archive.html">TUTORIAL</a></li>
      </ul>
    </nav>

    <main >
      <section>
        <h2>GAME</h2>
        <article id="mainDiv">
          <header>



          </header>
           <div id="gameElements">
        <canvas id="game" width="1000" height="500"></canvas>
        <br /> <br />
        <center><progress style="visibility:hidden" id="progressBar" value="5" max="10"></progress></center>
        <center><div id = "counter"></div></center>
    </div>
  </br>

        </article>

        <article>
          <header>
						<center>
            <button  id = 'startbtn' onclick="document.getElementById('mainDiv').style.visibility = 'visible'; begin(); document.getElementById('progressBar').style.visibility = 'visible' ">Click to begin</button>
						<button onclick= "location.reload();"> Click to reset </button>
            <form><input type = "text" id = 'searchForm'><button id = 'submitSN'>Click to search</button></form>
						 <td><input id = 'easy' type="radio">Easy</td>
						 <td><input id = 'hard' type="radio">Hard</td>
					 </center>
          </header>



        </article>
      </section>
			<article>
				<h3>Lyric Box </h3>
				<p id = "lyricbox"> </p>
			</article>


    </main>

    <aside>
      <h2>**HIGH::::::::::SCORES**</br>
        </br>




         <?php
$servername = "localhost";
$username = "web";
$password = "webpassword";
$dbname = "highscores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT UserName, HIGHSCORE FROM MYTABLE ORDER BY HIGHSCORE DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     // output data of each row
$x = 1;


for ($x = 0; $x <= 2; $x++) {
$row = $result->fetch_assoc();
    echo "<br> ". $row["UserName"]. " - Score: ". $row["HIGHSCORE"]. " <br>";
}
     while($row = $result->fetch_assoc()) {

     }
} else {
     echo "0 results";
}

$conn->close();
?>




        </br>

 </br>
 </br>
       </br>
       </br>

        </br>
       </br>
       </br>
</br>
       </br>



</h2>
      <p>-------------Thanks For Playing!--------------</p>
    </aside>



    <footer>
      <p>
        </br>
      </p>

        <form method="post" action="gameControls.php">
<input type= "hidden"  name= "submitted" value="true"/>

<fieldset>
  <label>UserName: <input type="text" name="un" /></label>

	<label>Email: <input type="text" name="em" /></label>
	<label>Score: <input type="int" name="sc" id="final_score" readonly></label>
</fieldset>

</br>

<input type="submit" value="SAVE_SCORE"/>
</form>

<?php

echo $newrecord

?>
    </footer>

<script src="js/lyricsTools.js"></script>
<script src="js/game.js"></script>

  </body>
</html>
