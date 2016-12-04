<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
    	<!-- bootstrap css -->
		<link href="bootstrapCss/bootstrap.min.css" rel="stylesheet">
		<link href="style/style.css" rel="stylesheet">
		<title></title>

	</head>
	<body>

		<div class="container">
			<div class="row">
				<div class="col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4"></div>
				<div class="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4">
					<form class="form-signin" method="POST" (: action :)>
						<h4 class="form-signin-heading">Register</h4>
						<!-- username -->
						<label for="username" class="sr-only">Username</label>
						<input type="text" id="username" name="username" class="form-control control-padding" placeholder="username" required autofocus>
						<!-- password -->
						<label for="password" class="sr-only">Password</label>
						<input type="password" id="password" name="password" class="form-control control-padding" placeholder="password" required>
						<!-- repeat password -->
						<label for="re-password" class="sr-only">Password</label>
						<input type="password" id="re-password" name="re-password" class="form-control control-padding" placeholder="password" required>
						<!-- email -->
						<label for="email" class="sr-only">Email</label>
						<input type="email" id="email" name="email" class="form-control control-padding" placeholder="email" required>
						<!-- birthday -->
						<label for="birthday" class="sr-only">Password</label>
						<input type="date" id="date" name="date" class="form-control control-padding" placeholder="dd/mm/yyyy" required>
						<!-- phone number -->
						<label for="phone" class="sr-only">Password</label>
						<input type="tel" id="phone" name="phone" class="form-control control-padding" placeholder="333 445566" required>
						<button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
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