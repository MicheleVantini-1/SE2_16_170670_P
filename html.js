header = '<meta charset="utf-8"> \
		  <meta http-equiv="X-UA-Compatible" content="IE=edge"> \
		  <meta name="viewport" content="width=device-width, initial-scale=1.0"> \
		  <base (: base :) target="_blank"> \
		  <!-- bootstrap css --> \
		  <link href="bootstrapCss/bootstrap.min.css" rel="stylesheet"> \
		  <link href="style/style.css" rel="stylesheet"><title></title>';

js = '<!-- jQuery --> \
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"> \
	  </script> \
	  <!-- bootstrap --><script src="bootstrapJs/bootstrap.min.js"></script>';

navbar = '<nav class="navbar navbar-inverse navbar-fixed-top"> \
			<div class="container"> \
				<div class="navbar-header"> \
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> \
						<span class="sr-only">Toggle navigation</span> \
						<span class="icon-bar"></span> \
						<span class="icon-bar"></span> \
						<span class="icon-bar"></span> \
					</button> \
					<h3 class="no-margin navbar-brand">MealsDelivery</h3> \
				</div> \
				<div id="navbar" class="navbar-collapse collapse"> \
					<ul class="nav navbar-nav"> \
						<li class="active"> \
							<a href="/">Home</a> \
						</li> \
						<li> \
							<a href="#">La mia dieta</a> \
						</li> \
					</ul> \
					<div class ="nav navbar-nav navbar-right"> \
						<h4 class="text-muted">(: user :)&nbsp;&nbsp;&nbsp;&nbsp;<a href="/logout" target="_self">logout</a></h4> \
					</div> \
				</div><!--/.nav-collapse --> \
			</div> \
		</nav>';
		

// EXPORTS
exports.header = header;
exports.js = js;
exports.navbar = navbar;