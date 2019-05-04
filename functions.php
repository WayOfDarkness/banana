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
  public function gotoUserAccount(Request $request, Response $response) {
    return $this->view->render($response, 'user_account');
  }

  public function uploadAvatar(Request $request, Response $response) {
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
      return $response->withJson([
        'code' => -1,
        'message' => 'Người dùng chưa đăng nhập'
      ]);
    }
    $customer = json_decode($_SESSION['customer']);
    $customer_id = $customer->id;
    $customer = Customer::find($customer_id);
    $name = 'avatar';
    if (!is_dir(ROOT . '/public/uploads')) {
      mkdir(ROOT . '/public/uploads');
    }
    $path = ROOT . '/public/uploads/';
    if (!is_dir(ROOT . '/public/uploads/origin')) {
      mkdir(ROOT . '/public/uploads/origin');
    }
    if ($name == 'tab-home') $originPath = ROOT . '/public/uploads/origin/';
    else $originPath = ROOT . '/public/uploads/origin/' . $name . '/';
    $result = array();
    $total = count($_FILES['upload']['name']);
    global $size;
    global $quantity;
    for ($i = 0; $i < $total; $i++) {
      $tmp_name = $_FILES['upload']['tmp_name'][$i];
      $origin = $_FILES['upload']['name'][$i];
      $newName = time() . '_' . createHandleImage($origin);
      $newFilePath = $path . $newName;
      $mime = mime_content_type($tmp_name);
      $mime = strtolower($mime);
      $allowFileTypes = array(
        "image/png","image/jpg","image/jpeg","image/gif","image/svg+xml","image/vnd.microsoft.icon"
      );
      if (in_array($mime,$allowFileTypes)) {
        if ($mime == "image/svg+xml" || $mime == "image/vnd.microsoft.icon") {
          move_uploaded_file($tmp_name, $newFilePath);
          copy($newFilePath, $originPath . $newName);
          for ($j = 0; $j < count($size); $j++) {
            $new_name = convertImage($newFilePath, $size[$j]);
            copy($newFilePath, $new_name);
          }
          array_push($result, $newName);
        } else {
          if (moveAndReduceSize($tmp_name, $newFilePath, $quantity)) {
            array_push($result, $newName);
            for ($j = 0; $j < count($size); $j++) {
              moveAndReduceSize($tmp_name, $newFilePath, $quantity, $size[$j]);
            }
            copy($newFilePath, $originPath . $newName);
          }
        }
      }
    }
  
    if (count($result)) {
      $avatar = $result[0];
      $customerLogin = json_decode($_SESSION['customer']);
      $customer = Customer::where('email',$customerLogin->email)->first();
      $customer->avatar = $avatar;
      $customer->save();
      $_SESSION['customer'] = json_encode($customer);
      return $response->withJson([
        'code' => 0,
        'data' => $result,
        'total' => $total
      ]);
    }
    return $response->withJson([
      'code' => -1,
      'message' => 'error'
    ]);
  }
}


// TODO: add custom admin routes
function add_custom_admin_routes($app) {

}

// TODO: add custom store front routes
function add_custom_store_front_routes($app) {
  $app->get('/user_account', 'CustomStoreFrontController:gotoUserAccount');
  $app->post('/api/uploadAvatar', '\CustomStoreFrontController:uploadAvatar');
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
registerCustomField("Author","article","select", ['Sigma', 'Phi']);
registerCustomField("Theme","gallery","select", ['Starting', 'Spring', 'Summer', 'Autumn', 'Winter', 'Final']);
registerCustomField("Riddle Point","gallery","input");
registerCustomField("Solved Riddle","gallery","input");
registerCustomField("Current Riddle","gallery","input");
registerCustomField("Next Riddle","gallery","input");
registerCustomField("Set Role To 1","gallery","select-multiple","blog");
registerCustomField("Set Role To 2","gallery","select-multiple","blog");

registerCustomField("Mật mã","page","editor");
registerCustomField("Điểm","page","editor");
registerCustomField("Gợi ý","page","editor");
registerCustomField("Phần thưởng","page","editor");