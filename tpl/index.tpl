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
											<button class="btn btn-success pull-right" id="showHideNewOrderBtn" onclick="newOrderShowHide();">Nuovo ordine</a>
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
											
											<div class="row default-hide" id="dishesContainer">
											</div>

											<div class="row default-hide" id="confirmBtnContainer">
												<div class="col-xs-12 col-sm-12 col-md-6 col-lg-8" id="addOrderErrorContainer">
													
												</div>
												<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
													<button class="btn btn-success pull-right" onclick="confirmOrder()">Conferma</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="panel-body">
									<table class="table table-hover" id="ordersTable">
										<thead>
											<tr>
												<th>Data</th>
												<th>Primo</th>
												<th>Secondo</th>
												<th>Contorno</th>
												<th>Dessert</th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody id="ordersTableBody">
											(: orders :)
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>

		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">Modifica ordine</h4>
					</div>
					<div class="modal-body" id="editOrderModal">
						
					</div>
					<div class="modal-footer" id="editOrderModalFooter">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
						<button type="button" class="btn btn-success" id="confirmEditBtn">Conferma Modifica</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


		(: js :)
		<script src="scripts/indexScript.js"> </script>
	</body>
</html>