## Duckling Shop API – NestJS

### Stack & Principles

- **NestJS** (Node.js framework)
- **MongoDB**
- **Design Patterns Used**:
  - Controller Pattern (REST)
  - DTO Pattern
  - Service Layer Pattern
  - Repository Pattern
  - Dependency Injection
  - Factory Method Pattern
  - Strategy Pattern
- **Validation Pipes** for data validation

### Modular Architecture

Each module contains its own domain logic:

- Controller
- Service
- Repository
- DTOs

### 🛠 Main Technologies

| Tool / Library    | Version | Description                                  |
| ----------------- | ------- | -------------------------------------------- |
| NestJS            | ^10.0.0 | Progressive Node.js framework                |
| Mongoose          | ^8.16.0 | ODM for MongoDB                              |
| @nestjs/mongoose  | ^11.0.3 | NestJS integration with Mongoose             |
| class-validator   | ^0.14.2 | Data validation for DTOs                     |
| class-transformer | ^0.5.1  | Object transformation for requests/responses |
| RxJS              | ^7.8.1  | Reactive programming library                 |
| Jest              | ^29.5.0 | Testing framework                            |
| Supertest         | ^7.0.0  | End-to-end HTTP testing                      |

### 🔍 Scripts

- `npm i -g @nestjs/cli` - Install nestjs
- `npm install` - Install dependencies
- `npm run start:dev` – Start development server with hot-reload.
- `npm run test` – Run unit tests.

### 📂 Database: MongoDB

This project uses **MongoDB** as its main database with **two collections**:

#### 🦆 `ducks` Collection

Stores duck entity data.

```json
{
  "_id": "ObjectId",
  "color": "black",
  "size": "Small",
  "quantity": 5,
  "price": 40,
  "erased": false
}

📦 orders Collection
Stores order data related to ducks.

{
  "size": "Small",
  "color": "red",
  "amountDucks": 2,
  "destinyCountry": "Bolivia",
  "shippingType": "land"
}
```

### 🦆 Ducks Endpoints

| Method  | Endpoint           | Description                               |
| ------- | ------------------ | ----------------------------------------- |
| `POST`  | `/ducks`           | Create a new duck                         |
| `GET`   | `/ducks`           | Get all ducks                             |
| `GET`   | `/ducks/:id`       | Get a single duck by ID                   |
| `PUT`   | `/ducks/:id`       | Update a duck by ID                       |
| `PATCH` | `/ducks/:id/erase` | Soft delete a duck (set `isErased: true`) |

## 📦 Orders Endpoints

All endpoints are prefixed with `/orders`.

---

### 📌 Create Order for a Duck

**POST** `/orders/ducks/:duckId`

Create a new order for a specific duck.

#### Path Parameters:

| Param    | Type   | Description        |
| -------- | ------ | ------------------ |
| `duckId` | string | The ID of the duck |

### Endpoint

**POST** `/orders/ducks/:duckId`

Creates an order for a specific duck using advanced business rules like dynamic pricing, filler selection, packaging type, and discounts/increments.

---

### 🧪 Example Request

**URL:**
http://localhost:3000/orders/ducks/685d4e4bd7ec88766ab22fd1

**Request Body:**

```json
{
  "color": "red",
  "size": "Small",
  "amountDucks": 120,
  "destinyCountry": "USA",
  "shippingType": "air"
}
```

**Response:**

```json
{
  "color": "red",
  "size": "Small",
  "amountDucks": 120,
  "destinyCountry": "USA",
  "shippingType": "air",
  "packageType": "plastic",
  "filler": "Bolsas con burbuja",
  "totalToPay": 7338.24,
  "discountsDetails": "720",
  "incrementsDetails": "4458.24"
}
```

### 🧪 More Example Request

```json
{
  "color": "green",
  "size": "Large",
  "amountDucks": 50,
  "destinyCountry": "India",
  "shippingType": "land"
}
```

```json
{
  "color": "yellow",
  "size": "XLarge",
  "amountDucks": 150,
  "destinyCountry": "Bolivia",
  "shippingType": "sea"
}
```

```json
{
  "color": "red",
  "size": "Medium",
  "amountDucks": 200,
  "destinyCountry": "Germany",
  "shippingType": "air"
}
```

```json
{
  "color": "black",
  "size": "Large",
  "amountDucks": 1200,
  "destinyCountry": "USA",
  "shippingType": "sea"
}
```

```json
{
  "color": "red",
  "size": "Small",
  "amountDucks": 1500,
  "destinyCountry": "India",
  "shippingType": "air"
}
```

```json
{
  "color": "green",
  "size": "XSmall",
  "amountDucks": 350,
  "destinyCountry": "Bolivia",
  "shippingType": "sea"
}
```

```json
{
  "color": "yellow",
  "size": "Large",
  "amountDucks": 250,
  "destinyCountry": "France",
  "shippingType": "air"
}
```
