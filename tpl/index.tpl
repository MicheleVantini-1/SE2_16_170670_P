<!DOCTYPE html>
<html lang="en">
	<head>
		(: header :)
	</head>
	<body>		
		(: navbar :)
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
											<button class="btn btn-success pull-right " onclick="newOrderShowHide();">Nuovo ordine</a>
										</div>										
									</div>
									<div class="row default-hide" id="newOrderContainer">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel-title-margin">
											<div class="row">
												<div class="col-xs-7 col-sm-7 col-md-6 col-lg-4">
													<label for="date" class="sr-only">Date</label>
													<input type="date" id="date" name="date" class="form-control" placeholder="dd/mm/yyyy" required />
												</div>
												<div class="col-xs-5 col-sm-5 col-md-6 col-lg-8">
													<button class="btn btn-primary" type="button" onclick="selectDate();">Conferma</button>	
												</div>
											</div>
											
											<div class="row" id="dishesContainer">
											</div>
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
		<script src="scripts/indexScript.js"> </script>
	</body>
</html>