<?php
$name = filter_input(INPUT_POST, 'name');
$useragent = filter_input(INPUT_SERVER, 'HTTP_USER_AGENT');
$scores = filter_input(INPUT_POST, 'scores');
$turboboost = filter_input(INPUT_POST, 'turboboost');
$date = date('c');
$note = filter_input(INPUT_POST, 'note');

/* SQLite */
$db = new SQLite3('tbd.sqlite');
$db->exec('CREATE TABLE tbd (id INTEGER PRIMARY KEY, name TEXT, useragent TEXT, scores TEXT, turboboost TEXT, date TEXT, note TEXT);');
$stmt = $db->prepare('INSERT INTO tbd (name, useragent, scores, turboboost, date, note) VALUES (:name, :useragent, :scores, :turboboost, :date, :note);');
$stmt->bindValue(':name', $name);
$stmt->bindValue(':useragent', $useragent);
$stmt->bindValue(':scores', $scores);
$stmt->bindValue(':turboboost', $turboboost);
$stmt->bindValue(':date', $date);
$stmt->bindValue(':note', $note);
$stmt->execute();
