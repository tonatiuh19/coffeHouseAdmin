<?php
require_once('db_cnn/cnn.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
	$requestBody=file_get_contents('php://input');
	$params= json_decode($requestBody);
	$params = (array) $params;

	if ($params['email']) {
		$email = $params['email'];
        $name = $params['name'];
        $description = $params['description'];
        $long_description = $params['long_description'];
        $id_country = $params['id_country'];
        $price = $params['price'];
        $quantity = $params['quantity'];
        $id_products = $params['id_products'];
        $todayVisit = date("Y-m-d H:i:s");

		$sql = "UPDATE products SET name='$name', description='$description', long_description='$long_description', id_country='$id_country' WHERE id_products=".$id_products."";

        if ($conn->query($sql) === TRUE) {
            $sql2 = "INSERT INTO prices (id_products, price, date)
            VALUES ('$id_products', '$price', '$todayVisit')";

            if ($conn->query($sql2) === TRUE) {
                $sql3 = "INSERT INTO stock (quantity, id_products, email_user, date)
                VALUES ('$quantity', '$id_products', '$email', '$todayVisit')";

                if ($conn->query($sql3) === TRUE) {
                    echo "1";
                } else {
                    echo "Error: " . $sql3 . "<br>" . $conn->error;
                }
            } else {
                echo "Error: " . $sql2 . "<br>" . $conn->error;
            }
        } else {
            echo "Error updating record: " . $conn->error;
        }
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>