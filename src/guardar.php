<?php
// Iniciamos sesion por si queremos usar variables de sesion mas adelante
session_start();

// Datos de conexion por defecto que usamos en XAMPP
$servidor = "localhost";
$usuario = "root";
$password = "";
$dbname = "uady_bd";

// Nos conectamos a la base de datos MySQL usando mysqli
$conexion = new mysqli($servidor, $usuario, $password, $dbname);

// Verificamos si hubo un error de conexion
if ($conexion->connect_error) {
    die("Error de conexion: " . $conexion->connect_error);
}

// Verificamos que los datos hayan llegado por el metodo POST del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Limpiamos los datos para evitar inyecciones o errores de caracteres especiales
    $nickname = $conexion->real_escape_string($_POST['nickname']);
    $campus = $conexion->real_escape_string($_POST['campus']);
    
    // Como los intereses vienen en un arreglo de checkboxes, los unimos en un solo texto separado por comas
    $intereses_array = isset($_POST['intereses']) ? $_POST['intereses'] : [];
    $intereses = $conexion->real_escape_string(implode(", ", $intereses_array));
    
    $correo = $conexion->real_escape_string($_POST['correo']);

    // Preparamos la sentencia SQL para insertar los datos en la tabla 'users'
    $sql = "INSERT INTO users (nickname, campus, intereses, correo) VALUES ('$nickname', '$campus', '$intereses', '$correo')";

    // Ejecutamos la consulta y validamos si se guardo correctamente
    if ($conexion->query($sql) === TRUE) {
        
        // Guardamos algunos datos en variables de sesion (util para mostrar bienvenida en el index)
        $_SESSION['user_nickname'] = $nickname;
        $_SESSION['user_campus'] = $campus;

        // Redireccionamos al index.html principal de su pagina como pide el diagrama de la libreta
        header("Location: index.html");
        exit();
        
    } else {
        echo "Error al guardar los datos: " . $conexion->error;
    }
}

// Cerramos la conexion a la base de datos
$conexion->close();
?>