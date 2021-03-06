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
					<center><h4 class="form-signin-heading">Register</h4></center>
					<!-- username -->
					<label for="username" class="sr-only">Username</label>
					<input type="text" id="username" name="username" class="form-control control-padding" placeholder="username" required autofocus>
					<!-- password -->
					<label for="password" class="sr-only">Password</label>
					<input type="password" id="password" name="password" class="form-control control-padding" placeholder="password" required>
					<!-- repeat password -->
					<label for="repassword" class="sr-only">Re-enter password</label>
					<input type="password" id="repassword" name="repassword" class="form-control control-padding" placeholder="re-enter password" required>
					<!-- birthday -->
					<label for="birthday" class="sr-only">Birthday</label>
					<input type="date" id="birthday" name="birthday" class="form-control control-padding" placeholder="dd/mm/yyyy" required>
					<!-- phone number -->
					<label for="phone" class="sr-only">Phone number</label>
					<input type="tel" id="phone" name="phone" class="form-control control-padding" placeholder="333 445566" required>
					
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="registerError">
						</div>
					</div>

					<button class="btn btn-lg btn-primary btn-block" type="button" onclick="register();">Register</button>
					
					<br/>
					<center>Sei già registrato? <a (: loginLink :) >Log in</a></center>
				</div>
			</div>
		</div>

		<script src="scripts/loginScript.js"></script>
		(: js :)
	</body>
</html>