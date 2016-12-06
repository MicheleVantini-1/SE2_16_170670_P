<!DOCTYPE html>
<html lang="en">
	<head>
		(: header :)
	</head>
	<body>

		<div class="container">
			<div class="row">
				<div class="col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4"></div>
				<div class="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4">
					<form class="form-signin" method="POST" (: action :)>
						<h4 class="form-signin-heading">Log in</h4>
						<label for="username" class="sr-only">Username</label>
						<input type="text" id="username" name="username" class="form-control control-padding" placeholder="username" required autofocus>
						<label for="password" class="sr-only">Password</label>
						<input type="password" id="password" name="password" class="form-control control-padding" placeholder="password" required>
						<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					</form>
				</div>
			</div>
		</div>

		(: js :)
	</body>
</html>