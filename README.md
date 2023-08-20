# Nutikas Frontend Repository

Welcome to the Nutikas frontend repository! 
This private repository is exclusively for developers working on the Nutikas application frontend. 
This README will provide you with essential information to navigate and contribute to the project effectively.

## Table of Contents

- [About Nutikas](#about-nutikas)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
- [Contributing](#contributing)
- [License](#license)

## About Nutikas

Nutikas is an educational platform aimed at enhancing interactive learning experiences for students. The frontend of Nutikas is built using React, providing a user-friendly interface for educators and students to engage with educational games and quizzes.

## Features

- Engaging educational games and quizzes to challenge and entertain students.
- Customizable game and quiz creation tools for educators to tailor content.
- Real-time updates and analytics for monitoring student progress and performance.
- Collaboration features for educators to share and explore educational content.

## Getting Started

### Prerequisites

- Node.js (recommended version: LTS)
- npm (included with Node.js)

### Installation

1. Clone the private repository:

   ```bash
   git clone https://github.com/your-username/nutikas-frontend.git
    ```
   
2. Navigate to the project directory:

    ```bash
    cd nutikas-frontend
    ```

3. Install the project dependencies

    ```bash
    npm install
    ```

### Running the Development Server
To run nutikas-frontend locally, you have two options:

1. Running with npm

    ```bash
    npm start
    ```

2. Running the Dockerfile

Inside the nutikas-frontend folder:
 
```bash
docker build -t nutikas-react .
```

... and then

```
docker run -dp 127.0.0.1:3000:3000 nutikas-react
```

After either step is done, The development server will start, 
and you can access the application by visiting http://localhost:3000 in your web browser.

### Contributing

This repository is solely for developers working on the Nutikas frontend.
If you're a collaborator, you can contribute as follows:

1. Create a new branch for your feature or bug fix:

```
git checkout -b feature/my-new-feature
```

2. Make your changes, commit them with a clear and concise message.
3. Push your changes to the repository

```
git push origin feature/my-new-feature
```

4. Create a pull request targeting the `master` branch

### Licence

This project is private and confidential, all rights are reserved.