# Spiky Splendor - E-commerce

## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Technologies](#technologies)

## Introduction

Spiky splendor is an e-commerce shop that specializes in selling a wide variety of succulents. It allows to search products, manage orders, make returns and manage users accounts.

## Demo

> [!Important]
> If Storefront or Admin is not loading give it a 2 minutes as backend is deployed on render and needs around 2 minutes to start as it's spinning down on inactivity

- [Storefront](https://spiky-splendor-storefront.vercel.app/)
- [Admin](https://spiky-splendor-admin.vercel.app/)

##### Credentials:

Admin:

- email: test@example.com
- password: test

## Prerequisites

##### Environments:

- Docker
- Docker Compose
- Node.js version at least 20.0
- Yarn package manager

##### Setup:

Before installing the required dependencies for the environments, you also need to create and configure a Stripe account:

1. After creating the account, you need to set up a test environment, known as a sandbox.

2. Then, go to Settings → Business and set the country to Poland.

3. Finally, in Settings → Payments → Payment methods, select the payment methods to be used. The only requirement for the application is that they must be instant payment methods — preferably BLIK, PayPal, and Przelewy24. All other methods should be disabled.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/MilyB33/Spiky-splendor---e-commerce.git
```

2. Install packages for storefront

```bash
cd frontend
yarn install
```

3. Install packages for backend and admin

```bash
cd medusa-store
yarn install
```

4. Build Medusa (just in case to build loaders)

```bash
cd medusa-store
yarn build
```

5. Create a .env file and set the environment variables based on the provided .env.template file for both environments.

6. Build the app image

```bash
docker compose build
```

7. Run the app

```bash
docker compose up
```

##### Running app:

App should run by default on given urls:

- Storefront: http://localhost:3000/
- Admin panel: http://localhost:7001/
- Backend: http://localhost:9000/

##### Credentials:

Admin:

- email: test@example.com
- password: test

## Technologies

- Javascript
- Typescript
- Vue.js (storefront)
- Nuxt.js (storefront)
- Medusa.js (backend)
- Next.js (admin panel)
- Stripe (payments)
