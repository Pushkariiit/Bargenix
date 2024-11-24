Directory Structure:
![image](https://github.com/user-attachments/assets/2fe27f1e-fdd8-458e-adc3-e024be018f27)

How to setup this in local computer : 

Step 1 -> Clone the repository : ``` git clone https://github.com/Pushkariiit/Bargenix.git ``` <br/>
Step 2 -> cd Bargenix <br/>
Step 3 -> ``` npm install ``` <br/>
Step 4 -> ``` npm start ``` <br/>

Api Endpoints:

![image](https://github.com/user-attachments/assets/3ac93d63-fce5-4fcc-b3dd-775fba9b4405)

Generate Coupons Endpoint : http://localhost:3000/api/coupons/generate

in the header section add content-type : Application/JSON

![image](https://github.com/user-attachments/assets/d9d49195-bc3d-400d-adb2-bf5013e995ed)

Validate Coupon Endpoint : http://localhost:3000/api/coupons/validate

in the header section add content-type : Application/JSON

![image](https://github.com/user-attachments/assets/e3ffef3b-5a21-4785-afe8-635cbb68ad18)

Validation fails if token or product-id is differernt than token recieved during generating coupon or product-id used during generating coupon.

Validation failure due to wrong product id : 

![image](https://github.com/user-attachments/assets/34e3cc73-f6e8-4de2-91bb-651c171199d7)


