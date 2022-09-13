<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require_once('db_cnn/cnn.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
	$requestBody=file_get_contents('php://input');
	$params= json_decode($requestBody);
	$params = (array) $params;

	if ($params['email']) {
		$email = $params['email'];

		$sql = "SELECT a.id_orders, 
			a.email_user, 
			e.name as 'first_name',
            e.last_name,
			a.id_adress, 
			a.date, 
			a.complete, 
			a.track_id, 
			a.shipment_label_url,
			b.quantity,
			c.id_products,
			c.name
		FROM orders as a 
		INNER JOIN carts as b on b.id_orders=a.id_orders
		INNER JOIN products as c on c.id_products=b.id_products
		INNER JOIN users as d on d.email=c.email_user
		LEFT JOIN users as e on e.email = a.email_user
		WHERE d.email='".$email."'
		ORDER BY a.date ASC";
		
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$array[] = array_map('utf8_encode', $row);
			}
			$res = json_encode($array, JSON_NUMERIC_CHECK);
			header('Content-type: application/json; charset=utf-8');
			echo $res;
		} else {
			echo "0";
		}
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>