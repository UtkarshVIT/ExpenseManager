function createDOM(){
			var numberOfPeople = document.getElementById("numOfPeople").value;
			numberOfPeople = Number(numberOfPeople);
			var table = document.getElementById("inputTable"); 
			for(i=0;i<numberOfPeople;i++)
			{
				var x = document.createElement("input"); //for getting name of the person
				var y = document.createElement("input"); //for getting the cost paid by the person
				var x1 = document.createElement("td");
				var y1 = document.createElement("td");
				var row = document.createElement("tr");
				x.setAttribute("type","text");
				x.setAttribute("size","24");
				x.setAttribute("name","nameOfPerson");
				y.setAttribute("size","10");
				y.setAttribute("type","text");
				y.setAttribute("name","moneyPaid");
				row.setAttribute("background","red");
				x1.appendChild(x);
				y1.appendChild(y);
				row.appendChild(x1);
				row.appendChild(y1);
				row.setAttribute('style', 'background-color:#' + (Math.floor(Math.random() * 1000000)) + ';');//courtsey Pranav Bolar. to generate random background color
				table.appendChild(row);
			}

			var btn = document.createElement("button");
			btn.innerHTML="Compute";
			btn.setAttribute('style', 'margin-top:10px;');
			btn.setAttribute('onclick', 'calculateResult()');
			inputBox.appendChild(btn);
		}

		function calculateResult(){
			var inputTable = document.getElementById("inputTable");
			var names=[];var cost = [];
			for(i=0;i<inputTable.rows.length-1;i++)
			{	
				var x = document.getElementsByName("nameOfPerson")[i].value;
				var y = document.getElementsByName("moneyPaid")[i].value;
				names.push(x); // to insert the name of the person
				cost.push(Number(y)); // to insert the money paid by the person
			}

			var nameValuePair=[];var transxn = [];
			for (i=0;i<cost.length;i++){
				nameValuePair.push({name:names[i],costPaid:cost[i]});// creating a dictionary (NameOfPerson: MoeyPaidByPerson) key-value pair
			}

			//sorting function begins
			for(i=0;i<nameValuePair.length;i++){  
				for(j=i+1;j<nameValuePair.length;j++){
					if(nameValuePair[i].costPaid>nameValuePair[j].costPaid){
						var temp = nameValuePair[i];
						nameValuePair[i] = nameValuePair[j];
						nameValuePair[j] = temp;
					}
				}
			}
			//sorting function ends

			var resultTable = document.getElementById("result");

			while(resultTable.hasChildNodes())//clearing previously generated results
			{
				resultTable.removeChild(resultTable.firstChild);
			}

			//Inserting values into Result Table by DOM manipulation...
			//insertion of first title row begins...
			var row = document.createElement("tr");
			var nameTag = document.createElement("td");
			nameTag.innerHTML = "Pay To >";
			row.appendChild(nameTag);
			for(i=0;i<names.length;i++){
				var nameTitle = document.createElement("td");
				nameTitle.innerHTML = nameValuePair[i].name;//structur of nameValuePair = {name:costPaid}
				row.appendChild(nameTitle);
			}
			row.setAttribute('style', 'background-color: #001F4C;font-weight: bold;color: white;');
			result.appendChild(row);
			//insertion of first title row ends...

			var sum = 0;
			for(i = 0;i<cost.length;i++){
				sum+=nameValuePair[i].costPaid;
			}
			var perPersonCost= sum/nameValuePair.length;
			var balanceCost = []// for storing the amount to be paid or recieved in total 

			for(i=0;i<cost.length;i++){
				balanceCost.push(nameValuePair[i].costPaid-perPersonCost);
			}
			console.log(balanceCost);

			var transxn = [];//for storing the corresponding amounts to be paid ONLY FOR THE PEOPLE WHO OWE MONEY IN TOTAL, -ve:OWES, +ve:GETS
			for(i=0;i<balanceCost.length && balanceCost[i]<0;i++){
				var temp = [];
				for(j=cost.length-1;j>=0;j--){  
					if(balanceCost[j]<=0){//to avoid paying money to people who already owe
						temp.push(0);
						continue;
					}
					if(balanceCost[j]+balanceCost[i]>=0){ //if MoneyToBePaid <= MoneyToBeRecieved
						temp.push(Math.abs(balanceCost[i]));
						balanceCost[j] = balanceCost[j]+balanceCost[i];
						balanceCost[i] = 0;
					}
					else{
						temp.push(Math.abs(balanceCost[j])); //if MoneyToBePaid > MoneyToBeRecieved
						balanceCost[i] = balanceCost[j]+balanceCost[i];
						balanceCost[j] = 0;
						
					}
				}
				transxn.push(temp.reverse()); // inserting the money payment transaction 
				//console.log(String(nameValuePair[i].name)+"->"+temp);

				//appending the corresponding transaction in the result table
				var row = document.createElement("tr");
				var nameTag = document.createElement("td");
				nameTag.innerHTML = nameValuePair[i].name;
				nameTag.setAttribute('style', 'color: #00ff00; font-weight: bold;');
				row.appendChild(nameTag);
				for(k=0;k<temp.length;k++){
					var costToPay = document.createElement("td");
					if(temp[k]==0){
						costToPay.innerHTML = "N/A";
					}
					else{
						costToPay.innerHTML = String(temp[k].toFixed(2));
						costToPay.setAttribute('style', 'color:#00ff00 ; font-weight:bold;');
					}
					row.appendChild(costToPay);
				}
				row.setAttribute('style', 'background-color:#99' + (Math.floor(Math.random() * 10000)) + ';');
				result.appendChild(row);
				}
			}