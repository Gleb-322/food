<?php
$_POST = json_decode(file_get_contents("php://input"), true); /* для JSON данных */
echo var_dump($_POST);