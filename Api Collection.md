# Project: sample-work

## End-point: Login API
### Method: POST
>```
>http://localhost:4000/login
>```
### Body (**raw**)

```json
{
    "username": "Test1",
    "password": "test123"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: LoggedIn API
### Method: GET
>```
>http://localhost:4000/loggedIn
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzIyNDg0ODE1LCJleHAiOjE3MjMwODk2MTV9.8EYyTkExmL2QE0nr1gq1tb_6-rGpckLE8x1gOCzJkjQ|


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Tasks API 
### Method: POST
>```
>http://localhost:4000/tasks
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzIyNDg0ODE1LCJleHAiOjE3MjMwODk2MTV9.8EYyTkExmL2QE0nr1gq1tb_6-rGpckLE8x1gOCzJkjQ|


### Body (**raw**)

```json
{
    "title": "Test ",
    "descriptions": "Test tt",
    "priority": "HIGH"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Tasks API 
### Method: PUT
>```
>http://localhost:4000/tasks/adb51f50-2f6b-44a7-b7fb-75bf1aaa1af1
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzIyNDg0ODE1LCJleHAiOjE3MjMwODk2MTV9.8EYyTkExmL2QE0nr1gq1tb_6-rGpckLE8x1gOCzJkjQ|


### Body (**raw**)

```json
{
    "title": "Test Update",
    "descriptions": "Test tt",
    "priority": "HIGH"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Tasks Status API 
### Method: PUT
>```
>http://localhost:4000/tasks/adb51f50-2f6b-44a7-b7fb-75bf1aaa1af1/status
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzIyNDg0ODE1LCJleHAiOjE3MjMwODk2MTV9.8EYyTkExmL2QE0nr1gq1tb_6-rGpckLE8x1gOCzJkjQ|


### Body (**raw**)

```json
{
   "status": "DONE"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get ALL Tasks API 
### Method: GET
>```
>http://localhost:4000/tasks?limit=30&offset=0
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzIyNDg0ODE1LCJleHAiOjE3MjMwODk2MTV9.8EYyTkExmL2QE0nr1gq1tb_6-rGpckLE8x1gOCzJkjQ|


### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|limit|30|
|offset|0|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Tasks API 
### Method: DELETE
>```
>http://localhost:4000/tasks/adb51f50-2f6b-44a7-b7fb-75bf1aaa1af1
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzIyNDg0ODE1LCJleHAiOjE3MjMwODk2MTV9.8EYyTkExmL2QE0nr1gq1tb_6-rGpckLE8x1gOCzJkjQ|


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
