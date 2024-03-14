## API testing cURL calls
Test commands for api testing (not actual representations of data structures)

Temp User Token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwicGFzc3dvcmQiOiJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1ODM3NjE3NTIsImV4cCI6MTU4Mzc5Nzc1Mn0.jsrRBvc1WqFVeCpaCHg8EwH8mKzLikOC6DUMKvJ9rnQ
```

Temp Company Token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJCQyIsInBhc3N3b3JkIjoiNjZiMjc0MTdkMzdlMDI0YzQ2NTI2YzJmNmQzNThhNzU0ZmM1NTJmMyIsInR5cGUiOiJjb21wYW55IiwiaWF0IjoxNTgzNzU2OTgzLCJleHAiOjE1ODM3OTI5ODN9.EKSzvTJMNzRaE8_hybCbInBOqwdyoywoDlfiw9Btnfg
```

---
POST - `\login`
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"hello","password":"abc", "type":"user"}' \
  http://35.193.103.180:3000/login
```
---
POST - `\login`
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"TD Bank","password":"xyz", "type":"company"}' \
  http://35.193.103.180:3000/login
```
---
GET - `\login`
```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwicGFzc3dvcmQiOiJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1ODM3NjE3NTIsImV4cCI6MTU4Mzc5Nzc1Mn0.jsrRBvc1WqFVeCpaCHg8EwH8mKzLikOC6DUMKvJ9rnQ" http://localhost:3000/login
```
---
POST - `\user`
```
curl --request POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwicGFzc3dvcmQiOiJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1ODM3NjE3NTIsImV4cCI6MTU4Mzc5Nzc1Mn0.jsrRBvc1WqFVeCpaCHg8EwH8mKzLikOC6DUMKvJ9rnQ" --data '{"firstname":"zy","lastname":"xyz", "dob":"1240987"}' http://35.193.103.180:3000/user
```
---
GET - `\user`
```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwicGFzc3dvcmQiOiJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1ODM3NjE3NTIsImV4cCI6MTU4Mzc5Nzc1Mn0.jsrRBvc1WqFVeCpaCHg8EwH8mKzLikOC6DUMKvJ9rnQ" http://35.193.103.180:3000/user
```
---
GET - `\approve`
```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwicGFzc3dvcmQiOiJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1ODM3NjE3NTIsImV4cCI6MTU4Mzc5Nzc1Mn0.jsrRBvc1WqFVeCpaCHg8EwH8mKzLikOC6DUMKvJ9rnQ" http://35.193.103.180:3000/approve
```
POST - `\approve`
```
curl --header "Content-Type: application/json" --request POST -H "Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwicGFzc3dvcmQiOiJhOTk5M2UzNjQ3MDY4MTZhYmEzZTI1NzE3ODUwYzI2YzljZDBkODlkIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1ODM3NjE3NTIsImV4cCI6MTU4Mzc5Nzc1Mn0.jsrRBvc1WqFVeCpaCHg8EwH8mKzLikOC6DUMKvJ9rnQ" --data '{"companyId":"4e8f5ac2870a991274c0f5826b417fe3d64da426e3b501e2ddb0468fe1048118075124d154424014272aadc374bab47183e31f7ca923780cfd52fdfd78d874d44004bfe376c0ded8256b65d4b348b2c354312b1a951d4e8cd4d35b77ccf8ba90"}' http://35.193.103.180:3000/approve
```
GET - `\corporate`
```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJCQyIsInBhc3N3b3JkIjoiNjZiMjc0MTdkMzdlMDI0YzQ2NTI2YzJmNmQzNThhNzU0ZmM1NTJmMyIsInR5cGUiOiJjb21wYW55IiwiaWF0IjoxNTgzNzU2OTgzLCJleHAiOjE1ODM3OTI5ODN9.EKSzvTJMNzRaE8_hybCbInBOqwdyoywoDlfiw9Btnfg" http://35.193.103.180:3000/corporate
```
