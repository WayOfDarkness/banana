<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Illuminate\Database\Capsule\Manager as DB;


function updateProductPublishStatus(array $values)
{
    $table = Product::getModel()->getTable();

    $cases = [];
    $ids = [];
    $params = [];

    foreach ($values as $id => $value) {
        $id = (int) $id;
        $cases[] = "WHEN {$id} then ?";
        $params[] = $value;
        $ids[] = $id;
    }

    $ids = implode(',', $ids);
    $cases = implode(' ', $cases);
    $params[] = date('Y-m-d H:i:s');

    return DB::update("UPDATE `{$table}` SET `stop_selling` = CASE `id` {$cases} END, `updated_at` = ? WHERE `id` in ({$ids})", $params);
}


class CustomAdminController extends adminController {

}


class CustomStoreFrontController extends Controller {
  // get review count number
}


// TODO: add custom admin routes
function add_custom_admin_routes($app) {

}

// TODO: add custom store front routes
function add_custom_store_front_routes($app) {

}

//register modul publish product
registerButtonStopSelling();


function parse_raw_product($data) {
  $text = $data['title'] . ' ' . ($data['description'] ?: '')
            . ' ' . ($data['content'] ? strip_tags($data['content']) : '')
            . ' ' . $data['option_2'];
  $text = vn_to_str($text);
  $text = strtolower($text);
  return $text;
}

registerCustomField("Outline","article","checkbox");