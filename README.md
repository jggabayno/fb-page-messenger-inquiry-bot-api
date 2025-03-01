# Facebook page Messenger Inquiry Bot and CMS 

## Overview
A **Facebook Page Messenger Inquiry Bot & CMS** that enables businesses to automate and manage customer inquiries efficiently. Built following Clean Architecture with Dependency Inversion, ensuring maintainability and scalability.

## Features

- **🤖 Messenger Bot** – Automatically responds to user messages and inquiries.
- **📂 CMS Integration** – Stores, manages, and processes inquiry details.
- **💬 Live Chat** – Allows real-time interactions with customers.
- **🔄 Re-engagement** – Sends automated updates based on inquiry status.
- **📊 Dashboard & Authentication** – Secure access and inquiry management.
- **🔗 Facebook Graph API Webhook** – Handles Messenger events and interactions.

## Tech Stack

- **Architecture:** Clean Architecture, Dependency Inversion Principle
- **Backend:** Node.js, Express
- **API:** Facebook Graph API, Axios
- **Database:** MySQL
- **Authentication:** JWT (if applicable)

## Getting started

### Requirements

- Yarn or npm

### Setup

1. Clone the repository.
2. Install dependencies:

   ```sh
   yarn install
   ```

3. Use the `.env.example` file as a reference to create your own `.env` for environment setup.

## Running the Application

### Development Mode

To start the development server:

```sh
yarn devStart
```

After running, access the application at:

```sh
http://localhost:3000/
```

### Production Mode

To build and start the production server:

```sh
yarn build
yarn start
```

## Deployment


### Deployment Options
You can deploy the backend using AWS EC2 or **any other cloud service** of your choice.

### Deploy to Render (Manual)
Install Render CLI:

```
curl -fsSL https://github.com/render/render-cli/releases/latest/download/install.sh | sh
```

Login to Render:
```
render login --token YOUR_RENDER_API_KEY
```

Deploy the backend:

```
render deploy --service-id YOUR_RENDER_SERVICE_ID
```

### GitHub Actions (Automated Deployment)
1. Add RENDER_API_KEY and RENDER_SERVICE_ID to:

   **GitHub → Repo Settings → Secrets → Actions**

2. Push changes to staging or main, and GitHub Actions will handle deployment.

