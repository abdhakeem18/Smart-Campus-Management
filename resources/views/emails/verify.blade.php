<!DOCTYPE html>
<html>
<head>
    <title>Account Verification</title>
</head>
<body>
    <h1>Hello, {{ $user->name }}</h1>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="{{ $verificationUrl }}">Verify your email</a>
</body>
</html>
    