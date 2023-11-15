sap.ui.define(['sap/ui/core/mvc/Controller', 'jquery.sap.global', 'sap/m/MessageToast', 'sap/ui/model/odata/ODataModel', 'sap/m/MessageBox'],
	function (Controller, jQuery, MessageToast, ODataModel, MessageBox) {
		"use strict";
		var oEntryUpload = [];
		var oEntryHeader = [];
		var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
		var ControllerController = Controller.extend("ZHTS.ZHTS.controller.Upload", {
			handleUploadComplete: function (oEvent) {
				var sResponse = oEvent.getParameter("response");
				if (sResponse) {
					sResponse = sResponse.split(">")[1];
					sResponse = sResponse.substring(0, sResponse.length - 5);
					MessageToast.show(sResponse);
					console.log(sResponse);
				}
			},
			handleUploadExcel: function (oEvent) {
				var oTable = this.byId("itemsTable2");
				var oFileUploader = this.getView().byId("fileUploader2");
				var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
				var reader = new FileReader();
				reader.readAsBinaryString(file);
				reader.onload = function (e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, { type: 'binary' });
					var result = {}; var header = {}; var sheetNameArr = []
					workbook.SheetNames.forEach(function (sheetName) {
						sheetNameArr.push(sheetName)
						var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]); if (roa.length > 0) { result[sheetName] = roa; header[sheetName] = Object.keys(roa[0]) }
						if (roa.length > 0) {
							result = roa;
							header = Object.keys(roa[0])
						}
					});
					//this._excelToTreeTable(header[sheetNameArr[0]], result[sheetNameArr[0]])
					//this._excelToFlatTable(header[sheetNameArr[0]], result[sheetNameArr[0]])
					// Bind the data to the Table
					var oModel = new sap.ui.model.json.JSONModel()
					// open loop for each row and append cell
					oModel.setData(result)
					oTable.setModel(oModel)
					console.log(result)
					return result
				}.bind(this)

			},
			handleUploadPress: function (oEvent) {
				var oTable = this.byId("itemsTable");
				var oTable2 = this.byId("itemsTable2");
				var oFileUploader = this.getView().byId("fileUploader");
				const that = this;

				//Check file existing
				if (!oFileUploader.getValue()) {
					MessageToast.show("Choose a file first");
					return;
				} else {
					function csvToArray(str, delimiter = ",") {
						// slice from start of text to the first \n index
						// use split to create an array from string by delimiter
						const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

						// slice from \n index + 1 to the end of the text
						// use split to create an array of each csv value row
						const rows = str.slice(str.indexOf("\n") + 1).split("\n");

						// Map the rows
						// split values from each row into an array
						// use headers.reduce to create an object
						// object properties derived from headers:values
						// the object passed as an element of the array
						const arr = rows.map(function (row) {
							const values = row.split(delimiter);
							const el = headers.reduce(function (object, header, index) {
								object[header] = values[index];
								return object;
							}, {});
							console.log(el)
							return el;

						});

						// return the array
						return arr;
					};
					function analyze_data(array){
						const general_object = new Object();
						const meansure_master = [];
						const manual_trans = []
						const data1 = [];
						const prop = Object.keys(array[0]); //get properties of element in array
						console.log(prop)
						for (let i = 0; i < array.length; i++) {
							const object_meansure = new Object()
							for (let j = 0; j < prop.length; j++) {
								const object_trans = new Object()
								switch(prop[j]){

									case "Variable" :
										object_meansure.VAR = array[i][prop[j]];
										break;
									case "Names of variable" :							
										object_meansure.VAR_NAME = array[i][prop[j]];
										break;

									case "Variable number" :
										// var Var= array[i].Variable										
										object_meansure.VAR_NO = array[i][prop[j]];
										break;	
									case "Major Classification" :
										// var Var= array[i].Variable										
										object_meansure.MAJ_CLASS = array[i][prop[j]];
										break;

									case "Minor classification" :
										// var Var= array[i].Variable										
										object_meansure.MIN_CLASS = array[i][prop[j]];
										break;
									case "Data Source Flag: SCT" :
										// var Var= array[i].Variable										
										object_meansure.DS_SCT = array[i][prop[j]];
										break;
									case "Data Source Flag: Manual" :
										// var Var= array[i].Variable										
										object_meansure.DS_MANUAL = array[i][prop[j]];
										break;
									case "Direction to aim for" :
										// var Var= array[i].Variable										
										object_meansure.DIRECTION = array[i][prop[j]];
										break;
									case "Staggered years (Overview)" :
										// var Var= array[i].Variable										
										object_meansure.STAGG_YEAR_MATRIX = array[i][prop[j]];
										break;
									case "Staggered years (VRC)" :
										// var Var= array[i].Variable										
										object_meansure.STAGG_YEAR_VRC = array[i][prop[j]];
										break;
									case "Staggered year exclusion flag" :
										// var Var= array[i].Variable										
										object_meansure.EXCL_FLAG = array[i][prop[j]];
										break;
									case "Relevant Flag for Overview Analysis" :
										// var Var= array[i].Variable										
										object_meansure.FLAG_MATRIX = array[i][prop[j]];
										break;
									case "Relevant Flag for VRC" :
										// var Var= array[i].Variable										
										object_meansure.FLAG_VRC = array[i][prop[j]];
										break;
									case "Start period (Year)" :
										// var Var= array[i].Variable										
										object_meansure.PERIOD_START = array[i][prop[j]];
										break;
									case "End period (Year)" :
										// var Var= array[i].Variable										
										object_meansure.PERIOD_END = array[i][prop[j]];
										break;
									case "Item No." :
										// var Var= array[i].Variable										
										object_meansure.VAR_ITM_NO = array[i][prop[j]];
										break;
									case "Item" :
										// var Var= array[i].Variable										
										object_meansure.VAR_ITM_NAME = array[i][prop[j]];
										break;
									case "SCT API - Entity name" :
										// var Var= array[i].Variable										
										object_meansure.SCT_ENTITY = array[i][prop[j]];
										break;
									case "SCT API - Measure field name" :
										// var Var= array[i].Variable										
										object_meansure.MEASURE_ID = array[i][prop[j]];
										break;
									case "SCT API - Filter dimension ID" :
										// var Var= array[i].Variable										
										object_meansure.DIM_ID = array[i][prop[j]];
										break;	
									case "SCT API - Filter value" :
										// var Var= array[i].Variable										
										object_meansure.DIM_VAL = array[i][prop[j]];
										break;	
									default:
										if(array[i]['Variable'] != undefined && array[i]['Variable'] != null){
											object_trans.VAR = array[i]['Variable'].replace('\r',"");
										}

										if(prop[j] != undefined && prop[j] != null){
											object_trans.YEAR = prop[j].replace('\r',"");
										}
										
										if(array[i][prop[j]] != undefined && array[i][prop[j]] != null){
											object_trans.VALUE = array[i][prop[j]].replace('\r',"");
										}

										object_trans.STATUS = "sap-icon://status-critical"
										if(object_trans.VALUE != "") {
											manual_trans.push(object_trans);
										}
										
									
								}
								
								
							}
							object_meansure.STATUS = "sap-icon://status-critical";
							meansure_master.push(object_meansure);
							
						}
						// console.log(meansure_master)
						// console.log(manual_trans)
						// const a =  JSON.stringify(meansure_master) + JSON.stringify(manual_trans)
						return [meansure_master,manual_trans];

					}

					//oFileUploader.upload();
					var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
					var reader = new FileReader();
					var jsonObj = "jsonObject=";
					reader.onload = function (oEvent) {
						var strCSV = oEvent.target.result.replace("ï»¿","");
						console.log(strCSV)
						var data1 = csvToArray(strCSV);
						//document.write(JSON.stringify(data1));

						var arrCSV = strCSV.match(/[\w \: \( \) \- .]+(?=,?)/g);
						var noOfCols = 33; // adjust number of columns depending upon the expected csv
						console.log(arrCSV)
						var headerRow = arrCSV.splice(0, noOfCols);
						var data = [];
						while (arrCSV.length > 0) {
							var obj = {};
							//obj[j].STATUS = 'Waiting for uploading';
							var row = arrCSV.splice(0, noOfCols);
							for (var i = 0; i < row.length; i++) {
								obj[headerRow[i]] = row[i].trim();
							}
							obj.STATUS = "sap-icon://status-critical";
							console.log(obj)
							data.push(obj);
						}

						// Bind the data to the Table
						var oModel = new sap.ui.model.json.JSONModel();
						var oModel_Item = new sap.ui.model.json.JSONModel();
						// open loop for each row and append cell
						// array.forEach(element => {
							
						// });
						data1.forEach( (element,index,array) =>{ 
							if(element.Variable == undefined || !element.Variable || element.Variable == "")
							{
								data1.splice(index, 1);
							}
						});

						// console.log(Object.keys(data1[0]))

						
						const [meansure_master,manual_trans] = analyze_data(data1);
						// console.log(meansure_master);
						// console.log();
						// var twoPlacedFloat = parseFloat(manual_trans[0].VALUE).toFixed(2)

						//Set Data for table Header
						oModel.setData(meansure_master);
						oTable.setModel(oModel);
						let a = that.getView().getModel().getData();
						
						//Set Data for table Item
						oModel_Item.setData(manual_trans)
						oTable2.setModel(oModel_Item)

						//Check value in transaction data, if not number - border red input field and popup message
						let oModelSCT = new sap.ui.model.json.JSONModel({
							error: false
						});
						that.getView().setModel(oModelSCT, "oModelSCT");
						let aDataTable = oTable2.mAggregations.items;
						aDataTable.map((item) => {
							let id = item.mAggregations.cells[3].getId();
							let value = parseFloat(item.mAggregations.cells[3].mProperties.value);
							if (isNaN(value)) {
								that.getView().byId(id).addStyleClass('error');
								that.getView().getModel("oModelSCT").setProperty("/error", true);
								MessageToast.show("Invalid Transaction Data!");
							}else{
								that.getView().byId(id).removeStyleClass('error');
							}
						})



						//var oCol = new sap.m.Column({
						//	label: customer_Ext[i].fieldlabel,
						//	template: "EXT_FLDS/PRINTING_NUM/fieldvalue", //Updated PATH,  Update your binding property from customerJSONData model
						// });
						// oTable.addColumn(oCol);

					};
					reader.readAsText(file);
				}

			},
			handleUploadPress2: function (oEvent) {
				var oTable = this.byId("itemsTable2");
				var oFileUploader = this.getView().byId("fileUploader2");
				//Check file existing
				if (!oFileUploader.getValue()) {
					MessageToast.show("Choose a file first");
					return;
				} else {
					function csvToArray(str, delimiter = ",") {
						// slice from start of text to the first \n index
						// use split to create an array from string by delimiter
						const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

						// slice from \n index + 1 to the end of the text
						// use split to create an array of each csv value row
						const rows = str.slice(str.indexOf("\n") + 1).split("\n");

						// Map the rows
						// split values from each row into an array
						// use headers.reduce to create an object
						// object properties derived from headers:values
						// the object passed as an element of the array
						const arr = rows.map(function (row) {
							const values = row.split(delimiter);
							const el = headers.reduce(function (object, header, index) {
								object[header] = values[index];
								return object;
							}, {});
							return el;
						});

						// return the array
						return arr;
					}

					//oFileUploader.upload();
					var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
					var reader = new FileReader();
					var jsonObj = "jsonObject=";
					reader.onload = function (oEvent) {
						var strCSV = oEvent.target.result;
						var data1 = csvToArray(strCSV);
						//document.write(JSON.stringify(data1));

						var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
						var noOfCols = 3; // adjust number of columns depending upon the expected csv
						var headerRow = arrCSV.splice(0, noOfCols);
						var data = [];
						while (arrCSV.length > 0) {
							var obj = {};
							//obj[j].STATUS = 'Waiting for uploading';
							var row = arrCSV.splice(0, noOfCols);
							for (var i = 0; i < row.length; i++) {
								obj[headerRow[i]] = row[i].trim();
							}
							obj.STATUS = "sap-icon://status-critical";
							data.push(obj);
						}

						// Bind the data to the Table
						var oModel = new sap.ui.model.json.JSONModel();

						// open loop for each row and append cell


						oModel.setData(data);
						oTable.setModel(oModel);
						console.log(data1);


						//var oCol = new sap.m.Column({
						//	label: customer_Ext[i].fieldlabel,
						//	template: "EXT_FLDS/PRINTING_NUM/fieldvalue", //Updated PATH,  Update your binding property from customerJSONData model
						// });
						// oTable.addColumn(oCol);

					};
					reader.readAsBinaryString(file);
				}

			},
			handleSubmit: function(oEvent){
				var that = this;

				/* ASK IF USER WANT TO DELETE CURRENT CLIENT AND ITS DATA */
				MessageBox.warning(
					"Current data will be deleted and upload new. Proceed to upload? ",
					{
						icon: MessageBox.Icon.WARNING,
						title: "Warning",
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						onClose: function (oAction) {

							if(oAction == "OK"){
								that.handleSubmitPress();
							}
							// that.delClientData(oAction);

							// //Duyen - Refresh the page after delete OK
							// if (oAction == "OK") {
							// 	oModel.oData.input = [];
							// 	//oModel.oData.client = [];
							// 	oModel.oData.nodes = [];
							// 	oModel.oData.lines = [];
							// 	oModel.oData.groups = [];
							// 	oCInput = [];

							// 	for (var i = 0; i < oCInput.length; i++) {
							// 		if (oCInput[i].CLIENTKEY == clientData) {
							// 			oCInput.splice(i, 1);
							// 		}
							// 	}

							// 	for (var i = 0; i < oModel.oData.client.length; i++) {
							// 		if (oModel.oData.client[i].CLIENTKEY == clientData) {
							// 			oModel.oData.client.splice(i, 1);
							// 		}
							// 	}
							// 	oModel.refresh();

							// 	that.fetchClients();

							// 	isAnalysed = false
							// 	that._drawGraph(oModel.oData.input);

							// 	MessageBox.show('Success', { title: 'Delete Completed' })
							// 	that.getView().setBusy(false);
							// 	oModel.refresh();

							// }
						},
						emphasizedAction: MessageBox.Action.OK,
						initialFocus: MessageBox.Action.CANCEL,
						styleClass: sResponsivePaddingClasses
					}
				)
			},
			handleSubmitPress: function (oEvent) {
				let checkValueData = this.getView().getModel("oModelSCT").getProperty("/error");
				if (checkValueData == true) {
					MessageToast.show("Please set up your data correctly before submit!")
				}else{
					var oTable = this.byId("itemsTable");

					var oModel1 = oTable.getModel();
					var data = oModel1.getData();
					var newdata = [];

					var Len = data.length;
					let view = this.getView();
					view.setBusy(true);
					oEntryHeader = [];

					//*****TAY CODE*****//
					// for (var j = 0; j < Len; j++) {
					// 	var oEntry = {};
					// 	oEntry.VAR = data[j].VAR;
					// 	oEntry.VAR_NAME = data[j].VAR_NAME;
					// 	oEntry.VAR_NO = parseInt(data[j].VAR_NO);
					// 	oEntry.VAR_ITM_NO = parseInt(data[j].VAR_ITM_NO);
					// 	oEntry.VAR_ITM_NAME = data[j].VAR_ITM_NAME;
					// 	oEntry.DIRECTION = data[j].DIRECTION;
					// 	oEntry.EXCL_FLAG = data[j].EXCL_FLAG;
					// 	oEntry.MAJ_CLASS = data[j].MAJ_CLASS;
					// 	oEntry.MIN_CLASS = data[j].MIN_CLASS;
					// 	oEntry.SCT_ENTITY = data[j].SCT_ENTITY;
					// 	oEntry.MEASURE_ID = data[j].MEASURE_ID;
					// 	oEntry.DIM_ID = data[j].DIM_ID;
					// 	oEntry.DIM_VAL = data[j].DIM_VAL;
					// 	oEntry.DS_SCT = data[j].DS_SCT;
					// 	oEntry.DS_MANUAL = data[j].DS_MANUAL;
					// 	if(data[j].STAGG_YEAR_MATRIX == '')
					// 	{
					// 		oEntry.STAGG_YEAR_MATRIX = 0;
					// 	}else{
					// 		oEntry.STAGG_YEAR_MATRIX = parseInt(data[j].STAGG_YEAR_MATRIX);
					// 	}
					// 	if(data[j].STAGG_YEAR_VRC == ''){
					// 		oEntry.STAGG_YEAR_VRC = 0
					// 	}else{
					// 		oEntry.STAGG_YEAR_VRC = parseInt(data[j].STAGG_YEAR_VRC);
					// 	}
						
					// 	oEntry.FLAG_MATRIX = data[j].FLAG_MATRIX;
					// 	oEntry.FLAG_VRC = data[j].FLAG_VRC;
					// 	oEntry.PERIOD_START = data[j].PERIOD_START;
					// 	oEntry.PERIOD_END = data[j].PERIOD_END;

					// 	// var sURL = `/catalog/Header`;
					// 	var sURL = `/catalog/ESG_MEASURE_MASTER`;

					// 	$.ajax({
					// 		url: sURL,
					// 		data: JSON.stringify(oEntry), //user input file
					// 		headers: {
					// 			"Content-Type": 'application/json' // File type
					// 		},
					// 		type: "POST",
					// 		method: "POST",
					// 		success: function (oData, oStatus, oResponse) {
					// 			console.log(oData)
					// 			console.log('success')
					// 		}.bind(this),
					// 		error: function (oError) {
					// 			console.log(oError.responseJSON.error.message)
					// 		}.bind(this),
					// 	});
					// 	oEntry.STATUS = "sap-icon://status-positive";
					// 	newdata.push(oEntry);
					// };
					//*****TAY CODE*****//

					//*****THAI CODE*****//
					for (var j = 0; j < Len; j++) {
						var oEntry = {};
						oEntry.VAR = data[j].VAR;
						oEntry.VAR_NAME = data[j].VAR_NAME;
						oEntry.VAR_NO = parseInt(data[j].VAR_NO);
						oEntry.VAR_ITM_NO = parseInt(data[j].VAR_ITM_NO);
						oEntry.VAR_ITM_NAME = data[j].VAR_ITM_NAME;
						oEntry.DIRECTION = data[j].DIRECTION;
						oEntry.EXCL_FLAG = data[j].EXCL_FLAG;
						oEntry.MAJ_CLASS = data[j].MAJ_CLASS;
						oEntry.MIN_CLASS = data[j].MIN_CLASS;
						oEntry.SCT_ENTITY = data[j].SCT_ENTITY;
						oEntry.MEASURE_ID = data[j].MEASURE_ID;
						oEntry.DIM_ID = data[j].DIM_ID;
						oEntry.DIM_VAL = data[j].DIM_VAL;
						oEntry.DS_SCT = data[j].DS_SCT;
						oEntry.DS_MANUAL = data[j].DS_MANUAL;
						if(data[j].STAGG_YEAR_MATRIX == '')
						{
							oEntry.STAGG_YEAR_MATRIX = 0;
						}else{
							oEntry.STAGG_YEAR_MATRIX = parseInt(data[j].STAGG_YEAR_MATRIX);
						}
						if(data[j].STAGG_YEAR_VRC == ''){
							oEntry.STAGG_YEAR_VRC = 0
						}else{
							oEntry.STAGG_YEAR_VRC = parseInt(data[j].STAGG_YEAR_VRC);
						}
						
						oEntry.FLAG_MATRIX = data[j].FLAG_MATRIX;
						oEntry.FLAG_VRC = data[j].FLAG_VRC;
						oEntry.PERIOD_START = data[j].PERIOD_START;
						oEntry.PERIOD_END = data[j].PERIOD_END;

						oEntryHeader.push(oEntry);
					}
					
					/*DELETE HEADER DATA TABLE*/
					$.ajax({
						url: '/catalog/delete_header()',
						type: "GET",
						method : "GET",
						success: function (oData, oStatus, oResponse) {
							console.log('success delete header')
							// console.log(oData)

						}.bind(this),

						error: function (oError) {

							console.log(oError)

							// console.log(JSON.stringify(oEntry))

							// errMes = 1

						}.bind(this),
					})

					/*UPLOAD DATA HEADER TABLE */
					$.ajax({
						url: '/catalog/ESG_MEASURE_MASTER',
						type: "GET",
						beforeSend: function (xhr) {
							xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
							xhr.setRequestHeader("Content-Type", "application/atom+xml");
							xhr.setRequestHeader("DataServiceVersion", "2.0");
							xhr.setRequestHeader("X-CSRF-Token", "Fetch");
						},
						
						success: function (oData, oStatus, XMLHttpRequest) {
							var header_token = XMLHttpRequest.getResponseHeader('X-CSRF-Token');
							let headers
							if (header_token != null || header_token != undefined) {
								headers = {
									"X-CSRF-Token": header_token,
									"Content-Type": 'application/json'// File type
								}
							} else {
								headers = {
									"Content-Type": 'application/json'// File type}
								}
							}
							let uploadHeader = Object.assign([], oEntryHeader) // copy data of input into variable
							$.ajax({
								type: "POST",
								url: '/catalog/upload_header',
								data: JSON.stringify({uploadHeader : uploadHeader}), //user input file
								headers: headers,
								cache: false,
								// method: "POST",
								success: function (oData, oStatus, oResponse) {
									// console.log(oData)
									console.log('success header')
									// view.setBusy(false)
									// MessageBox.show('Success', { title: 'Upload Completed' })
									for(var i = 0; i < oEntryHeader.length; i++){
										oEntryHeader[i].STATUS = "sap-icon://status-positive";
										newdata.push(oEntryHeader[i]);
									}
									var oModel2 = new sap.ui.model.json.JSONModel();
									oModel2.setData(newdata);
									oTable.setModel(oModel2);
									// newdata.push(oEntryHeader);
								}.bind(this),
								error: function (oError) {
									console.log(oError)
									// oEntry.STATUS = "sap-icon://status-positive"
								}.bind(this),
							});
						}
					})
					//*****THAI CODE*****//
					

					// open loop for each row and append cell
				
					// newdata.push(oEntry);

					// Check data for SCT
					let aSctData = [];
					oEntryHeader.map((item) => {
						if (item.DS_SCT == "X") {
							aSctData.push(item.VAR);
						}
					});

					this.handleSubmitPress2(view, aSctData);
				}
			},
			handleSubmitPress2: function (view, sctData) {
				var oTable = this.byId("itemsTable2");

				var oModel1 = oTable.getModel();
				var data = oModel1.getData();
				var newdata = [];
				var Len = data.length;
				oEntryUpload = [];

				//******TAY CODE******//
				// for (var j = 0; j < Len; j++) {
				// 	var oEntry = {};
				// 	oEntry.VAR = data[j].VAR;
				// 	oEntry.YEAR = data[j].YEAR;
				// 	if(data[j].VALUE == ""){
				// 		oEntry.VALUE = parseFloat('0').toFixed(14);
				// 	}else{
				// 		oEntry.VALUE = parseFloat(data[j].VALUE).toFixed(14);
				// 	}
					
				// 	// var sURL = `/catalog/Items`;
				// 	var sURL = `/catalog/DB_ESG_MANUAL_TRANS`;
				// 	// console.log(oEntry)

				// 	$.ajax({
				// 		url: sURL,
				// 		data: JSON.stringify(oEntry), //user input file
				// 		headers: {
				// 			"Content-Type": 'application/json' // File type
				// 		},
				// 		type: "POST",
				// 		method: "POST",
				// 		success: function (oData, oStatus, oResponse) {
				// 			// console.log(oData)
				// 			// console.log('success')
				// 		}.bind(this),
				// 		error: function (oError) {
				// 			console.log(oError)
				// 			// oEntry.STATUS = "sap-icon://status-positive"
				// 		}.bind(this),
				// 	});
				// 	oEntry.STATUS = "sap-icon://status-positive";
				// 	newdata.push(oEntry);
				// };
				//******TAY CODE******//

				//*****THAI CODE******//
				for(var j = 0 ; j < data.length ; j++){
					if(data[j].VALUE == ""){
						var oValue = parseFloat('0').toFixed(14);	
					} else {
						var oValue = parseFloat(data[j].VALUE).toFixed(14);
					}
					oEntryUpload.push({VAR : data[j].VAR , YEAR : data[j].YEAR , VALUE : oValue});
				}
				
				//Check if SCT = X, remove value in array data
				let oUploadData = oEntryUpload;
				for (let index = 0; index < sctData.length; index++) {
					oUploadData = oUploadData.filter((item) => {
						return item.VAR != sctData[index];
					}) 		
				}

				/*DELETE HEADER DATA TABLE*/
				$.ajax({
					url: '/catalog/delete_item()',
					type: "GET",
					method : "GET",
					success: function (oData, oStatus, oResponse) {
						console.log('success item header')
						// console.log(oData)

					}.bind(this),

					error: function (oError) {

						console.log(oError)

						// console.log(JSON.stringify(oEntry))

						// errMes = 1

					}.bind(this),
				})

				$.ajax({
					url: '/catalog/DB_ESG_MANUAL_TRANS',
					type: "GET",
					beforeSend: function (xhr) {
						xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						xhr.setRequestHeader("Content-Type", "application/atom+xml");
						xhr.setRequestHeader("DataServiceVersion", "2.0");
						xhr.setRequestHeader("X-CSRF-Token", "Fetch");
					},
					
					success: function (oData, oStatus, XMLHttpRequest) {
						var header_token = XMLHttpRequest.getResponseHeader('X-CSRF-Token');
						let headers
						if (header_token != null || header_token != undefined) {
							headers = {
								"X-CSRF-Token": header_token,
								"Content-Type": 'application/json'// File type
							}
						} else {
							headers = {
								"Content-Type": 'application/json'// File type}
							}
						}
						let uploadItem = Object.assign([], oUploadData) // copy data of input into variable
						$.ajax({
							type: "POST",
							url: '/catalog/upload_item',
							data: JSON.stringify({uploadItem : uploadItem}), //user input file
							headers: headers,
							cache: false,
							// method: "POST",
							success: function (oData, oStatus, oResponse) {
								// console.log(oData)
								console.log('success item')
								// view.setBusy(false)
								// MessageBox.show('Success', { title: 'Upload Completed' })
								for(var i = 0; i < oEntryUpload.length; i++){
									oUploadData.map((item) => {
										if (item.VAR == oEntryUpload[i].VAR) {
										oEntryUpload[i].STATUS = "sap-icon://status-positive";
										}
									})
								}

								// Set icon status alert with sct = x
								oEntryUpload.map((item)=>{
									if (item.STATUS == undefined) {
										item.STATUS = "sap-icon://alert"
									}
								})
								newdata = oEntryUpload
								var oModel2 = new sap.ui.model.json.JSONModel();
								oModel2.setData(newdata);
								oTable.setModel(oModel2);
								view.setBusy(false)
								MessageBox.show('Success', { title: 'Upload Completed' })
								// newdata.push(oEntryUpload);
							}.bind(this),
							error: function (oError) {
								console.log(oError)
								// oEntry.STATUS = "sap-icon://status-positive"
							}.bind(this),
						});
					}
				})
				//*****THAI CODE******//

				// var oModel2 = new sap.ui.model.json.JSONModel();

				// // open loop for each row and append cell
				// // oEntry = '';
				// // newdata.push(oEntry);
				// oModel2.setData(newdata);
				// oTable.setModel(oModel2);


			},
			handleSavePress: function (oEvent) {
				var oSelectedTab = this.getView().byId("bar11");
				var oKey = oSelectedTab.getSelectedKey();
				// Case Selected Tab
				if (oKey.match("filter0")) {
					var oTable = this.byId("itemsTable");
					var itemIndex = oTable.getSelectedItem();
					var oIndex = oTable.indexOfItem(itemIndex);

					var oModel = oTable.getModel();
					var data = oModel.getData();
					var newdata = [];
					var j = oIndex;
					var oEntry = {};
					oEntry.VAR = data[j].VAR;
					oEntry.YEARS = parseInt(data[j].YEARS);
					oEntry.NAME = data[j].NAME;
					oEntry.EXP_VAR = parseInt(data[j].EXP_VAR);
					oEntry.ITEM = parseInt(data[j].ITEM);
					oEntry.ITEM_DES = data[j].ITEM_DES;
					oEntry.DIREC = data[j].DIREC;
					oEntry.EXCLU = data[j].EXCLU;
					var sURL = `/catalog/Header`;
					var sURLd = "/catalog/Header(VAR='" + oEntry.VAR + "')";

					console.log('abc')
					$.ajax({
						url: sURLd,
						//data: {VAR:oEntry.VAR}, //user input file
						headers: {
							"Content-Type": 'application/json' // File type
						},
						type: "DELETE",
						method: "DELETE",
						success: function (oData, oStatus, oResponse) {
							console.log(oData)
							console.log('success')
							data.splice(oIndex, 1)
							oModel.setData(data)
							oTable.setModel(oModel)
							oModel.refresh()
						}.bind(this),
						error: function (oError) {
							console.log(oError)
							console.log(JSON.stringify(oEntry))
							oEntry.STATUS = "sap-icon://status-positive"
						}.bind(this),
					});
					console.log('abc')
					$.ajax({
						url: sURL,
						data: JSON.stringify(oEntry), //user input file
						headers: {
							"Content-Type": 'application/json' // File type
						},
						type: "POST",
						method: "POST",
						success: function (oData, oStatus, oResponse) {
							console.log(oData)
							console.log('success')
						}.bind(this),
						error: function (oError) {
							console.log(oError)
							console.log(JSON.stringify(oEntry))
							oEntry.STATUS = "sap-icon://status-negative"
						}.bind(this),
					});
					data[j].STATUS = "sap-icon://status-positive";
					//newdata.push(oEntry);

					//var oModel2 = new sap.ui.model.json.JSONModel();

					// open loop for each row and append cell
					//oEntry = '';
					//newdata.push(oEntry);
					oModel.setData(data);
					var oItem = oTable.getSelectedItem();
					var oEditableCells = oItem.getCells();
					$(oEditableCells).each(function (i) {
						var oEditableCell = oEditableCells[i];
						var oMetaData = oEditableCell.getMetadata();
						var oElement = oMetaData.getElementName();
						if (oElement == "sap.m.Input") {
							oEditableCell.setEditable(false);
						}
					});
					oModel.refresh();
				} else {
					var oTable = this.byId("itemsTable2");
					var itemIndex = oTable.getSelectedItem();
					var oIndex = oTable.indexOfItem(itemIndex);

					var oModel = oTable.getModel();
					var data = oModel.getData();
					var newdata = [];
					var j = oIndex;
					var oEntry = {};
					oEntry.VAR = data[j].VAR;
					oEntry.YEARS = parseInt(data[j].YEARS);
					oEntry.VALUE = data[j].VALUE;
					var sURL = `/catalog/Items`;
					var sURLd = "/catalog/Items(VAR='" + oEntry.VAR + "',YEARS=" + oEntry.YEARS + ")";
					//var sURL = "/catalog/Header(VAR='" + oEntry.VAR + "')";

					console.log('abc')
					$.ajax({
						url: sURLd,
						//data: {VAR:oEntry.VAR}, //user input file
						headers: {
							"Content-Type": 'application/json' // File type
						},
						type: "DELETE",
						method: "DELETE",
						success: function (oData, oStatus, oResponse) {
							console.log(oData)
							console.log('success')
						}.bind(this),
						error: function (oError) {
							console.log(oError)
							console.log(JSON.stringify(oEntry))
							oEntry.STATUS = "sap-icon://status-positive"
						}.bind(this),
					});
					console.log('abc')
					$.ajax({
						url: sURL,
						data: JSON.stringify(oEntry), //user input file
						headers: {
							"Content-Type": 'application/json' // File type
						},
						type: "POST",
						method: "POST",
						success: function (oData, oStatus, oResponse) {
							console.log(oData)
							console.log('success')
						}.bind(this),
						error: function (oError) {
							console.log(oError)
							console.log(JSON.stringify(oEntry))
							oEntry.STATUS = "sap-icon://status-negative"
						}.bind(this),
					});
					console.log('abc')

					data[j].STATUS = "sap-icon://status-positive";
					//newdata.push(oEntry);

					//var oModel2 = new sap.ui.model.json.JSONModel();

					// open loop for each row and append cell
					//oEntry = '';
					//newdata.push(oEntry);
					oModel.setData(data);
					var oItem = oTable.getSelectedItem();
					var oEditableCells = oItem.getCells();
					$(oEditableCells).each(function (i) {
						var oEditableCell = oEditableCells[i];
						var oMetaData = oEditableCell.getMetadata();
						var oElement = oMetaData.getElementName();
						if (oElement == "sap.m.Input") {
							oEditableCell.setEditable(false);
						}
					});
					oModel.refresh();
				}

			},
			handleRetrievePress: function (oEvent) {
				var oSelectedTab = this.getView().byId("bar11");
				var oKey = oSelectedTab.getSelectedKey();
				if (oKey.match("filter0")) {//tab Master Data
					var oTable = this.byId("itemsTable");
					var sURL = `/catalog/Header`;//Interactions_Header		
					var data = [];
					$.ajax({
						type: 'GET',
						method: "GET",
						url: sURL,
						success: function (oData, oStatus, oResponse) {

							console.log(oData)
							var myvalue = oData.value
							var oModel = new sap.ui.model.json.JSONModel()
							oModel.setData(myvalue)
							oTable.setModel(oModel)
							oModel.refresh()
							this.getView().byId("filter0").setCount(myvalue.length);
						}.bind(this),
						error: function (oError) {
							console.log(oError)
							console.log(JSON.stringify(oEntry))
						}.bind(this),
					});
				} else {//tab Transaction Data
					var oTable = this.byId("itemsTable2");
					var sURL = `/catalog/Items`;//Interactions_Items	
					var data = [];
					$.ajax({
						type: 'GET',
						method: "GET",
						url: sURL,
						success: function (oData, oStatus, oResponse) {

							console.log(oData)
							var myvalue = oData.value
							var oModel = new sap.ui.model.json.JSONModel()
							oModel.setData(myvalue)
							oTable.setModel(oModel)
							oModel.refresh()
							this.getView().byId("filter1").setCount(myvalue.length);
						}.bind(this),
						error: function (oError) {
							console.log(oError)
							console.log(JSON.stringify(oEntry))
						}.bind(this),
					});
				}


				MessageToast.show("Data was retrieved");

			},

			handleAddPress: function (oEvent) {
				var oSelectedTab = this.getView().byId("bar11");
				var oKey = oSelectedTab.getSelectedKey();
				if (oKey.match("filter0")) {//tab Master Data
					var oTable = this.byId("itemsTable");
				} else {//tab Transaction Data
					var oTable = this.byId("itemsTable2");
				}
				//var oTable = this.getView().byId("itemsTable");
				var oItem = oTable.getItems()[0];
				var oEditableCells = oItem.getCells();
				var oModel = oTable.getModel();
				var data = oModel.getData();
				var new_row = {};
				new_row.STATUS = 'sap-icon://user-edit';
				data.unshift(new_row);
				oModel.setData(data);
				oTable.setModel(oModel);
				$(oEditableCells).each(function (i) {
					var oEditableCell = oEditableCells[i];
					var oMetaData = oEditableCell.getMetadata();
					var oElement = oMetaData.getElementName();
					if (oElement == "sap.m.Input") {
						oEditableCell.setEditable(true);
					}
				});
				oModel.refresh();
				MessageToast.show("Data was added");
			},
			handleEditPress: function (oEvent) {
				var oSelectedTab = this.getView().byId("bar11");
				var oKey = oSelectedTab.getSelectedKey();
				if (oKey.match("filter0")) {//tab Master Data
					var oTable = this.byId("itemsTable");
				} else {//tab Transaction Data
					var oTable = this.byId("itemsTable2");
				}
				//var oTable = this.getView().byId("itemsTable");
				var oItem = oTable.getSelectedItem();
				var oEditableCells = oItem.getCells();
				var oModel = oTable.getModel();
				var data = oModel.getData();
				//var new_row = {};
				//data.unshift(new_row);
				oModel.setData(data);
				oTable.setModel(oModel);
				$(oEditableCells).each(function (i) {
					var oEditableCell = oEditableCells[i];
					var oMetaData = oEditableCell.getMetadata();
					var oElement = oMetaData.getElementName();
					if (oElement == "sap.m.Input") {
						oEditableCell.setEditable(true);
					}
				});
				oModel.refresh();

				MessageToast.show("Data can be edited now");
			},
			handleDeletePress: function (oEvent) {
				var oSelectedTab = this.getView().byId("bar11");
				var oKey = oSelectedTab.getSelectedKey();
				if (oKey.match("filter0")) {//tab Master Data
					var oTable = this.byId("itemsTable");
					var oModel = oTable.getModel();
					var data = oModel.getData();
					var oTable = this.getView().byId("itemsTable");

					var itemIndex = oTable.getSelectedItem();
					var oIndex = oTable.indexOfItem(itemIndex);
					if (oIndex !== -1) {
						//data.splice(oIndex, 1);
						oModel.setData(data);
						oTable.setModel(oModel);
						//Delete Item from Database table	
						var oEntry = {};
						oEntry.VAR = data[oIndex].VAR;
						oEntry.YEARS = parseInt(data[oIndex].YEARS);
						oEntry.NAME = data[oIndex].NAME;
						oEntry.EXP_VAR = parseInt(data[oIndex].EXP_VAR);
						oEntry.ITEM = parseInt(data[oIndex].ITEM);
						oEntry.ITEM_DES = data[oIndex].ITEM_DES;
						oEntry.DIREC = data[oIndex].DIREC;
						oEntry.EXCLU = data[oIndex].EXCLU;
						//					var sURL = "/catalog/Interactions_Header(VAR='" + oEntry.VAR + "',YEARS='" + oEntry.YEARS + "')";
						var sURL = "/catalog/Header(VAR='" + oEntry.VAR + "')";

						console.log('abc')
						$.ajax({
							url: sURL,
							//data: {VAR:oEntry.VAR}, //user input file
							headers: {
								"Content-Type": 'application/json' // File type
							},
							type: "DELETE",
							method: "DELETE",
							success: function (oData, oStatus, oResponse) {
								console.log(oData)
								console.log('success')
								data.splice(oIndex, 1)
								oModel.setData(data)
								oTable.setModel(oModel)
								oModel.refresh()
								this.getView().byId("filter0").setCount(data.length);
							}.bind(this),
							error: function (oError) {
								console.log(oError)
								console.log(JSON.stringify(oEntry))
								oEntry.STATUS = "sap-icon://status-positive"
							}.bind(this),
						});
						MessageToast.show("Item was deleted");
					} else {

						MessageToast.show("No Items Selected. Please Select an Item");



					}
				} else {//tab Transaction Data
					var oTable = this.byId("itemsTable2");
					var oModel = oTable.getModel();
					var data = oModel.getData();
					var oTable = this.getView().byId("itemsTable2");

					var itemIndex = oTable.getSelectedItem();
					var oIndex = oTable.indexOfItem(itemIndex);
					if (oIndex !== -1) {
						//data.splice(oIndex, 1);
						oModel.setData(data);
						oTable.setModel(oModel);
						//Delete Item from Database table	
						var oEntry = {};
						oEntry.VAR = data[oIndex].VAR;
						oEntry.YEARS = parseInt(data[oIndex].YEARS);
						var sURL = "/catalog/Items(VAR='" + oEntry.VAR + "',YEARS=" + oEntry.YEARS + ")";
						//var sURL = "/catalog/Header(VAR='" + oEntry.VAR + "')";

						console.log('abc')
						$.ajax({
							url: sURL,
							//data: {VAR:oEntry.VAR}, //user input file
							headers: {
								"Content-Type": 'application/json' // File type
							},
							type: "DELETE",
							method: "DELETE",
							success: function (oData, oStatus, oResponse) {
								console.log(oData)
								console.log('success')
								data.splice(oIndex, 1)
								oModel.setData(data)
								oTable.setModel(oModel)
								oModel.refresh()
								this.getView().byId("filter1").setCount(data.length);
							}.bind(this),
							error: function (oError) {
								console.log(oError)
								console.log(JSON.stringify(oEntry))
								oEntry.STATUS = "sap-icon://status-positive"
							}.bind(this),
						});
						MessageToast.show("Item was deleted");
					} else {

						MessageToast.show("No Items Selected. Please Select an Item");

					}
				}

			},
			handleTypeMissmatch: function (oEvent) {
				var aFileTypes = oEvent.getSource().getFileType();
				jQuery.each(aFileTypes, function (key, value) { aFileTypes[key] = "*." + value; });
				var sSupportedFileTypes = aFileTypes.join(", ");
				MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
					" is not supported. Choose one of the following types: " +
					sSupportedFileTypes);
			},

			handleValueChange: function (oEvent) {
				// MessageToast.show("Press 'Upload File' to upload file '" +
				// 	oEvent.getParameter("newValue") + "'");
				this.handleUploadPress();
			},

			doNavBack: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", true);
			},
			onSelectTab: function (oEvent) {
				var skey = oEvent.mParameters.key;

				var src = oEvent.getSource();
				var self = this;

				console.log(skey);
			}
		});

		return ControllerController;

	});
