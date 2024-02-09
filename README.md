# CarCar

CarCar is an application that handles both the services and sales aspect of an automotive service and sales center. CarCar manages the aspects of Automobile Inventory (Including Make, Model, and VIN) as well as the Service Appointments, Technicians, Customers, Sales, Salespeople, and the Customers who purchased vehicles.

####Team:

* Gabe Wickert - Sales
* Yutong Ye - Service

###Project Set up 💻

1.Fork the repo at https://gitlab.com/GabrielWickert/project-beta

2.Clone your fork to your projects directory.

3.Change directory into the repository directory.

4.Run the follwing commands to set up docker envirnment 

```
docker volume create beta-data
docker compose build
docker compose up
```
 5.Enter "localhost:3000" in your web browser to see the front-end of the React app in action, showcasing its dynamic and interactive features.

### Project Diagram

![Car Car Diagram](ProjectBeta.png)

## Service microservice

The Service microservice features three main models: Technician, AutomobileVo, and Appointment. Although there is an AutomobileVO model that includes a "vin" field within my models file, this field isn't linked as a Foreign Key to the "vin" field in the Appointment model. Within the service directory, there's a subdirectory named "poll," which contains a file called 'poller.py.' This file contains the logic for fetching necessary data (vin and sold fields) from the inventory microservice.

The primary goal of the Service microservice is to keep track of technicians, oversee the status of service appointments, and manage a service history record, enabling searches for appointments using a vehicle's vin number. Furthermore, it enhances functionality by allowing the addition of new technicians and providing an appointment scheduling form to streamline the process of setting up new appointments.

###Service API Endpoints















## Sales microservice

The Sales microservice contains 4 Models;
AutomobileVO, which takes the vin and the sold property from the Inventory model "Automobile",
Customer, which is used to demonstate a potential customer for purchasing a vehicle,
Salesperson, which represents the staff that is making a sale on the vehicles on the lot,
Sale, which is used to keep track of sales that have occurred.

AutomobileVO is updated by the poller, which pulls the VIN and "Sold" factor from the Automobiles in inventory every 60 seconds.

If you are using Insomnia, here are all of the directly possible methods that can be used with the views inside of the Sales microservice (otherwise these are completed using the front-end interface):

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Customers | GET | http://localhost:8090/api/customers/
| Create a Customer | POST | http://localhost:8090/api/customers/
| Delete a Specific Customer | DELETE | http://localhost:8090/api/customers/<id>/
| List Salespeople | GET | http://localhost:8090/api/salespeople/
| Create a Salesperson | PUT | http://localhost:8090/api/salespeople/
| Delete a Specific Salesperson | DELETE | http://localhost:8100/api/salespeople/<id>/
| List Sales | GET | http://localhost:8090/api/sales/
| Create a Sale | POST | http://localhost:8090/api/sales/
| Delete a Specific Sale | DELETE | http://localhost:8090/api/sales/<id>/

Please be aware that the Delete functions have not yet been implemented into the code for the front-end.

In order to submit a Create, please follow the following guidelines (when using a JSON BODY):
Create Customer:
{
	"first_name": "Josh",
	"last_name": "Elder",
	"address": "69420 Capitol Hill, Seattle, WA 98102",
	"phone_number": "1231231234"
}
The return value will be the same as the input with the addition of an "id" property.

Create Salesperson:
{
	"first_name": "Jaik",
	"last_name": "Ascher",
	"employee_id": "jascher"
}
The employee_id consists of the first name inital, followed by the last name in lowercase. The return value will be the same as the input, with the addition of an "id" property.

Create a Sale:
{
	"price": 1000000,
	"automobile": "1D7HA18N33J33J665",
	"salesperson": "jascher",
	"customer": "Josh"
}
Please be aware, that these parameters are specifically the Automobile VIN (17 Characters), the Salesperson Employee ID, Price, and the Customer's First Name.

The resulting output:
{
	"id": 16,
	"price": 1000000,
	"automobile": {
		"id": 4,
		"vin": "1D7HA18N33J33J665",
		"sold": false
	},
	"salesperson": {
		"id": 5,
		"first_name": "Jaik",
		"last_name": "Ascher",
		"employee_id": "jascher"
	},
	"customer": {
		"id": 4,
		"first_name": "Josh",
		"last_name": "Elder",
		"address": "69420 Capitol Hill, Seattle, WA 98102",
		"phone_number": "1231231234"
	}
}

For deleting any of these, simply add the id of that particular sale, salesperson, or customer to the end of your url, and submit as a DELETE request.
