<?php
require_once('db_cnn/cnn.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
	$requestBody=file_get_contents('php://input');
	$params= json_decode($requestBody);
	$params = (array) $params;

	if ($params['email']) {
		$email = $params['email'];

		$sql = "SELECT d.id_products, e.price, d.name, d.description, d.id_country, i.country, y.quantity, y.email_user FROM products as d INNER JOIN countries as i on i.id_country=d.id_country INNER JOIN (SELECT a.id_prices, a.id_products, a.price FROM prices AS a WHERE date = ( SELECT MAX(date) FROM prices AS b WHERE a.id_products = b.id_products )) as e on d.id_products=e.id_products INNER JOIN (SELECT a.id_stock, a.id_products, a.quantity, a.date, a.email_user FROM stock AS a WHERE date = ( SELECT MAX(date) FROM stock AS b WHERE a.id_stock = b.id_stock ) and email_user='".$email."') as y on y.id_products=d.id_products WHERE d.active=1 and y.quantity>0 and d.id_country NOT IN ( SELECT id_country FROM countries WHERE id_country=10 ) ORDER BY y.quantity desc";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$array[] = array_map('utf8_encode', $row);
			}
			$res = json_encode($array, JSON_NUMERIC_CHECK);
			header('Content-Type: application/json;charset=UTF-8');
			echo $res;
		} else {
			echo "No results";
		}
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>