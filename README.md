> [!WARNING]  
> Work in progress

# Spiky Splendor - E-commerce

## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies](#technologies)

## Introduction

Spiky splendor is an e-commerce shop that specializes in selling a wide variety of succulents. It allows to search products, manage orders, make returns and manage users accounts.

## Demo

> [!Important]
> If Storefront or Admin is not loading give it a 2 minutes as backend is deployed on render and needs around 2 minutes to start as it's spinning down on inactivity

- [Storefront](https://spiky-splendor-storefront.vercel.app/)
- [Admin](https://spiky-splendor-admin.vercel.app/)

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

4. Build the app image

```bash
docker compose build
```

5. Run the app

```bash
docker compose up
```

## Technologies

- Vue (storefront)
- Nuxt (storefront)
- MedusaJs (backend)
- NextJs (admin panel)
- Stripe (payments)
