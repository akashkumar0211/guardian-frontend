# Guardian ASPM Tool Frontend

This repository contains the frontend code for the Application Security Posture Management (ASPM) tool. The ASPM tool is designed to provide a comprehensive view of vulnerabilities found in applications, including those detected by:

- **SAST (Static Application Security Testing)**
- **DAST (Dynamic Application Security Testing)**
- **IaC (Infrastructure as Code) scanning**
- **Container security analysis**
- **SCA (Software Composition Analysis)**

## Features

- **Dashboard**: Visualize and track vulnerabilities across different scanning types.
- **Filters and Search**: Easily find specific vulnerabilities or focus on particular areas of interest.
- **Detailed Reporting**: View detailed reports for individual scans and vulnerabilities.

---

## Setup

### Clone the Repository
To get started, clone this repository to your local machine using Git:

```bash
git clone https://github.com/bootlabs-solutions/Guardian_Frontend.git
```

### Install Dependencies
Navigate to the project directory and install the necessary dependencies:

```bash
cd Guardian_Frontend
npm install
```

### Environment Configuration
Export the following environment variable to connect the frontend to the backend service:

```bash
export NEXT_PUBLIC_BACKEND_DOMAIN=http://localhost:8087
```

### Start the Development Server
Run the application locally using:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Contribution
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure that your code follows the project's coding standards.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contact
For questions or support, please reach out to the Guardian Frontend team at [support@bootlabs.com](mailto:support@bootlabs.com).

