<!DOCTYPE html>
<html lang="en">
	<head>
		(: header :)
	</head>
	<body>		
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<h3 class="no-margin navbar-brand">MealsDelivery</h3>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active">
							<a href="/">Home</a>
						</li>
						<li>
							<a href="#">La mia dieta</a>
						</li>
					</ul>
					<div class ="nav navbar-nav navbar-right">
						<h4 class="text-muted">(: user :)&nbsp;&nbsp;&nbsp;&nbsp;<a href="/logout">logout</a></h4>
					</div>
				</div><!--/.nav-collapse -->
			</div>
		</nav>
    	<div class="container">
			<div class="row">
				
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="row">
						<div class="panel-padding-top col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div class="panel panel-default">
								<div class="panel-heading">
									<div class="row">
										<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 panel-title-margin">
											<h2 class="panel-title">Le mie ordinazioni</h2>
										</div>
										<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
											<a class="btn btn-success pull-right " href="/newOrder">Nuovo ordine</a>
										</div>										
									</div>
								</div>
								<div class="panel-body">
									Panel content
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>

		(: js :)
	</body>
</html>