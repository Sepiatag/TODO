<?php
header("Access-Control-Allow-Origin: *");

$dsn = "mysql:host=localhost;dbname=todo";
$username = "root";Monstruos1.";
$password = "

try{
    $connection = new PDO($dsn, $username, $password);
} catch(Exception $exception){
    print_r($exception);

}

$content = file_get_contents("php://input");
$task = json_decode($content);

$id = $task->id;    
$name = $task->name;
$description =$task->description;
$date =$task->date;

$sqlQuery = "UPDATE tasks  SET 
    name = '$name', description= '$description', date='$date' 
    WHERE id =$id"

$result = $connection->query($sqlQuery);
if($result){
    echo 'El Registro se guardo correctamente';
}else{
    echo 'ERROR, no se pudo registrar';
} 