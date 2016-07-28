<?php
$to="co2AjnEL7AY:APA91bGFj0OufwDYCo3J8AI-GJPZhS3JYWYlYu0_0833xlSFNZ-Q7Tnbs_OXEeTC-nViZUZ7ge0LChFjoBnOxICen1D73D0Aman23SUqxV-6YvS78n8eMfZ5FOqoI7OR0iSB0Ei-0h9j";
$title="Push Notification Title";
$message="Push Notification Message";
sendPush($to,$title,$message);

function sendPush($to,$title,$message)
{
    define('API_ACCESS_KEY', 'AIzaSyArIVaDQEPRQe8Tl5t69uuw9x0JQw6OWiU');
    $registrationIds = array($to);
    $msg = array(
        'title' => $title,
        'message' => $message,
        'vibrate' => 0,
        'sound' => 0,
        'content-available' => 1
    );
    $fields = array(
        'registration_ids' => $registrationIds,
        'data' => $msg);

    $headers = array(
        'Authorization: key=' . API_ACCESS_KEY,
        'Content-Type: application/json');

    $ch = curl_init();
    curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
    curl_setopt( $ch,CURLOPT_POST, true );
    curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
    curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
    curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
    $result = curl_exec($ch );
    curl_close( $ch );
    echo $result;
}
?>
