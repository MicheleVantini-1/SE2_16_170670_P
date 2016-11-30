<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
    	<!-- bootstrap css -->
		<link href="bootstrapCss/bootstrap.min.css" rel="stylesheet">

		<title></title>

	</head>
	<body>

		<div class="container">
			<div class="row">
				<div class="col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4"></div>
				<div class="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4">
					<form class="form-signin" mathod="POST" [: action :]>
						<h5 class="form-signin-heading">Log in</h5>
						<label for="inputEmail" class="sr-only">Email address</label>
						<input type="email" id="inputEmail" class="form-control" placeholder="e-mail" required autofocus>
						<label for="inputPassword" class="sr-only">Password</label>
						<input type="password" id="inputPassword" class="form-control" placeholder="password" required>
						<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					</form>
				</div>
			</div>
		</div>

		<!-- jQuery -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<!-- bootstrap -->
		<script src="bootstrapJs/bootstrap.min.js"></script>
	</body>
</html>