<?php
$name = filter_input(INPUT_POST, 'name');
$useragent = filter_input(INPUT_SERVER, 'HTTP_USER_AGENT');
$scores = filter_input(INPUT_POST, 'scores');
$tb = filter_input(INPUT_POST, 'turboboost', FILTER_VALIDATE_BOOLEAN);

/* MongoDB */
try {
    $m = new MongoClient();
    $db = $m->selectDB('turbo');
} catch(MongoConnectionException $e) {
    exit();
}
$collection = $db->selectCollection('statics');
$data = array(
    'name' => $name,
    'useragent' => $useragent,
    'scores' => json_decode($scores, true),
    'tb' => $tb,
    'date' => new MongoDate(time())
);
$collection->save($data);

/* SQLite */
// $db = new SQLite3('tbd.sqlite');
// $db->exec('CREATE TABLE tbd (id INTEGER PRIMARY KEY, name TEXT, useragent TEXT, scores TEXT, turboboost TEXT, date TEXT, note TEXT);');
// $stmt = $db->prepare('INSERT INTO tbd (name, useragent, scores, turboboost, date, note) VALUES (:name, :useragent, :scores, :turboboost, :date, :note);');
// $stmt->bindValue(':name', $name);
// $stmt->bindValue(':useragent', $useragent);
// $stmt->bindValue(':scores', $scores);
// $stmt->bindValue(':turboboost', $turboboost);
// $stmt->bindValue(':date', $date);
// $stmt->bindValue(':note', $note);
// $stmt->execute();
