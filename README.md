# CloudVault AI

**Cloud-Based Secure Document Storage and Management Platform**

CloudVault AI is a full-stack web application for securely storing and
managing user documents using Amazon S3. It provides user registration
and login, document uploads, downloads, deletion, document search and
filtering, and storage analytics.

The application separates document metadata from file storage:
PostgreSQL stores user and document records, while Amazon S3 stores the
actual file objects. The backend generates temporary S3 presigned URLs
so the browser can transfer files directly to S3 without exposing AWS
credentials.

> **Current AI status:** Despite the project name, AI-powered document
> summarization or document analysis has not yet been implemented. AI
> functionality is a possible future enhancement and should not be
> presented as an existing feature.

------------------------------------------------------------------------

## 1. Project links

-   **GitHub repository:** https://github.com/Vishal-san69/CloudVault
-   **Related successor project:**
    [EvidenceVault](https://github.com/Vishal-san69/EvidenceVault)

CloudVault is maintained as its own project and repository.
EvidenceVault is developed separately using the CloudVault codebase as
its starting foundation.

## 2. Key features

### Authentication and account management

-   User registration and login.
-   Password hashing on the backend.
-   JWT-based authentication.
-   Protected API routes.
-   Authenticated user information retrieval.

### Document management

-   Upload supported documents to Amazon S3.
-   List documents belonging to the authenticated user.
-   Download documents through temporary presigned URLs.
-   Delete documents from S3 and mark their database records as deleted.
-   Confirm uploaded objects before activating their document records.
-   Display document information such as filename, type, size and upload
    date.

### Search, filtering and sorting

The frontend includes document search and filtering controls,
including: - Search by document name. - Filter by supported file
categories such as PDF, images, documents and spreadsheets. - Sort by
newest, oldest, filename and file size.

### Dashboard and storage analytics

-   Dashboard summary of the user's documents.
-   Storage usage based on document metadata returned by the backend.
-   File-type distribution visualization.
-   Document counts and percentages by file category.
-   Largest files list.
-   Recent uploads list.

**Analytics limitation:** These figures are calculated from the
application's active document records. They are not AWS billing metrics,
an S3 bucket-wide inventory, or an independently measured storage quota.

### Security foundations

-   JWT authentication for protected API operations.
-   Backend-side document ownership checks.
-   Helmet security headers.
-   CORS restricted to the configured frontend origin.
-   Global API rate limiting.
-   Private S3 bucket access using backend-generated presigned URLs.
-   S3 server-side encryption using AES-256 for the configured upload
    flow.

**Security Activity limitation:** The current Security Activity screen
is a UI summary and is not yet connected to a complete, verified
audit-event history. Backend audit logging is a planned improvement.

------------------------------------------------------------------------

## 3. Technology stack

  -----------------------------------------------------------------------
  Layer                   Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Frontend                React 19                User interface

  Language                TypeScript              Frontend type safety

  Build tool              Vite                    Frontend development
                                                  server and build

  Styling                 Tailwind CSS 4 and CSS  Responsive styling and
                                                  dark neumorphic design

  Icons                   lucide-react            Interface icons

  HTTP client             Axios                   API communication

  Backend runtime         Node.js                 Runs the server-side
                                                  JavaScript

  Backend framework       Express 5               REST API routes and
                                                  middleware

  Database                PostgreSQL              Users and document
                                                  metadata

  Database driver         `pg`                    PostgreSQL connection
                                                  pooling

  Authentication          JWT                     Authenticated API
                                                  access

  Security middleware     Helmet, CORS,           HTTP headers,
                          express-rate-limit      cross-origin policy and
                                                  rate limiting

  Cloud storage           Amazon S3               Stores actual document
                                                  files

  AWS integration         AWS SDK for JavaScript  S3 operations and
                                                  presigned URLs

  Configuration           dotenv                  Loads backend
                                                  environment variables
  -----------------------------------------------------------------------

Exact dependency versions are recorded in the backend and frontend
lockfiles. Use `npm ci` for reproducible installation.

------------------------------------------------------------------------

## 4. Architecture

``` text
                 USER'S BROWSER
                       |
                       v
            React + TypeScript Frontend
             Axios / JWT bearer token
                       |
                 HTTP / JSON
                       |
                       v
              Node.js + Express API
                /             \
               /               \
       SQL via pg             AWS SDK
             /                   \
            v                     v
       PostgreSQL              Amazon S3
       - Users                 - Actual files
       - Document metadata     - S3 objects
       - Document status       - Encrypted storage
```

### Component responsibilities

**React frontend** - Renders the dashboard and document-management
interface. - Collects login and registration details. - Sends API
requests through Axios. - Stores the JWT in browser local storage under
`cloudvault_token`. - Requests presigned URLs and uses them for direct
S3 file transfers.

**Node.js and Express backend** - Exposes REST API endpoints. - Verifies
JWTs on protected routes. - Applies request validation and business
rules. - Checks document ownership. - Reads and updates PostgreSQL
records. - Generates presigned S3 URLs and performs S3 operations.

**PostgreSQL** - Stores user records. - Stores document metadata,
ownership, S3 object keys, content types, file sizes and document
statuses. - Does not store the actual PDF or image bytes in the normal
document-storage flow.

**Amazon S3** - Stores the actual uploaded file objects. - Receives
browser uploads through presigned PUT URLs. - Serves downloads through
presigned GET URLs. - Uses the configured server-side encryption
settings.

------------------------------------------------------------------------

## 5. Project structure

``` text
CloudVault/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── document.config.js
│   │   │   └── s3.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── document.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── document.routes.js
│   │   ├── services/
│   │   │   └── s3.service.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## 6. Prerequisites

Install the following:

1.  Git.
2.  Node.js and npm (use a currently supported Node.js LTS release).
3.  PostgreSQL.
4.  An AWS account with an S3 bucket.
5.  AWS credentials configured for the backend using a supported AWS
    credential provider, such as an AWS CLI profile.
6.  VS Code or another code editor (optional).

Check the installations:

``` powershell
node --version
npm --version
git --version
psql --version
```

## 7. Clone the repository

``` powershell
cd C:\Users\<YOUR_WINDOWS_USER>\Desktop

git clone https://github.com/Vishal-san69/CloudVault.git

cd CloudVault
```

If you already have the repository locally, enter the existing project
folder instead of cloning it again.

------------------------------------------------------------------------

## 8. Install dependencies

The project has separate backend and frontend Node.js packages.

### Backend

``` powershell
cd backend
npm ci
```

### Frontend

Open another terminal or return to the project root:

``` powershell
cd frontend
npm ci
```

`npm ci` installs the exact dependency versions recorded in the
corresponding lockfile.

------------------------------------------------------------------------

## 9. Environment configuration

The backend loads environment variables from `backend/.env`. This file
is intentionally excluded from Git.

Create `backend/.env` locally:

``` dotenv
PORT=5000
CLIENT_URL=http://localhost:5173

PGHOST=localhost
PGPORT=5432
PGDATABASE=cloud_vault_db
PGUSER=your_postgres_username
PGPASSWORD=your_postgres_password

JWT_SECRET=replace_with_a_long_random_secret

AWS_REGION=ap-south-1
AWS_S3_BUCKET=your_s3_bucket_name
```

Replace all placeholders with your own values. Confirm the database name
and variable names against your local backend configuration before
starting the server.

### Environment variable reference

  Variable          Purpose
  ----------------- -------------------------------------------------------
  `PORT`            Backend listening port; defaults to `5000` if omitted
  `CLIENT_URL`      Allowed frontend origin for CORS
  `PGHOST`          PostgreSQL host
  `PGPORT`          PostgreSQL port
  `PGDATABASE`      PostgreSQL database name
  `PGUSER`          PostgreSQL username
  `PGPASSWORD`      PostgreSQL password
  `JWT_SECRET`      Secret used to sign and verify JWTs
  `AWS_REGION`      AWS region containing the S3 bucket
  `AWS_S3_BUCKET`   S3 bucket name

**Secret handling rules** - Never commit `.env` files. - Never put AWS
access keys or secret keys in frontend code. - Do not share database
passwords or JWT secrets in screenshots, issues or chat messages. - Use
a strong, unique JWT secret. - Configure AWS credentials through the AWS
SDK credential provider chain or an appropriate local AWS CLI profile. -
Give the backend AWS identity only the permissions it requires.

------------------------------------------------------------------------

## 10. PostgreSQL setup

Create the database configured in `PGDATABASE` if it does not already
exist.

Example:

``` sql
CREATE DATABASE cloud_vault_db;
```

The backend expects the PostgreSQL schema used by the application.
Inspect the database setup and schema creation instructions in the
current source before running the application against a fresh database.

The application uses user and document records. The document metadata
includes information such as: - Document ID. - User ID / owner. -
Original filename. - S3 object key. - Content type. - File size. -
Document status. - Created and updated timestamps.

The document lifecycle uses statuses such as `pending`, `active`, and
`deleted`.

Do not run destructive database commands against a database containing
data you need to preserve.

------------------------------------------------------------------------

## 11. AWS S3 setup

CloudVault uses Amazon S3 to store the actual documents.

### Required configuration

1.  Create or select the S3 bucket.
2.  Keep S3 Block Public Access enabled.
3.  Keep the bucket private.
4.  Configure AWS credentials for the backend.
5.  Grant the backend IAM identity the minimum S3 permissions required
    by the application.
6.  Set `AWS_REGION` and `AWS_S3_BUCKET` in `backend/.env`.
7.  Configure bucket CORS for the frontend origin.

### Development CORS example

The current local frontend origin is `http://localhost:5173`. A
development CORS configuration used by this project is:

``` json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET", "HEAD"],
    "AllowedOrigins": ["http://localhost:5173"],
    "ExposeHeaders": ["ETag", "x-amz-server-side-encryption"],
    "MaxAgeSeconds": 3000
  }
]
```

If the frontend origin changes, update the allowed origin to the exact
required origin.

**CORS is not access control.** It does not make a private bucket public
and does not replace IAM permissions. Never solve an S3 access problem
by making the bucket public.

The upload flow uses the `x-amz-server-side-encryption: AES256` request
header. The backend verifies the S3 object properties during upload
confirmation.

------------------------------------------------------------------------

## 12. Run CloudVault locally

Run the backend and frontend in separate terminals.

### Terminal 1 -- Backend

``` powershell
cd C:\Users\<YOUR_WINDOWS_USER>\Desktop\CloudVault\backend

npm run dev
```

The backend uses port `5000` by default.

The startup process logs the API status and checks the S3 connection.

If `npm run dev` is unavailable, inspect `backend/package.json` and use
one of its defined scripts, such as `npm start` if provided.

### Terminal 2 -- Frontend

``` powershell
cd C:\Users\<YOUR_WINDOWS_USER>\Desktop\CloudVault\frontend

npm run dev
```

Vite normally serves the frontend at:

-   Frontend: http://localhost:5173
-   Backend: http://localhost:5000
-   Health check: http://localhost:5000/api/health

The health-check endpoint runs a lightweight PostgreSQL query. It
reports database connectivity; S3 connectivity is checked separately
during backend startup.

### Build the frontend

``` powershell
cd frontend
npm run build
```

------------------------------------------------------------------------

## 13. API reference

The following routes are present in the current backend baseline.
Confirm the route files if the API is changed in later commits.

  -----------------------------------------------------------------------------------
  Method                  Endpoint                            Purpose
  ----------------------- ----------------------------------- -----------------------
  POST                    `/api/auth/register`                Register a user

  POST                    `/api/auth/login`                   Authenticate a user

  GET                     `/api/auth/me`                      Get the authenticated
                                                              user's information

  POST                    `/api/documents/upload-url`         Request an S3 presigned
                                                              upload URL

  POST                    `/api/documents/:id/confirm`        Confirm an uploaded S3
                                                              object

  GET                     `/api/documents/my-documents`       List the authenticated
                                                              user's active documents

  GET                     `/api/documents/:id/download-url`   Request a presigned
                                                              download URL

  DELETE                  `/api/documents/:id`                Delete a document
  -----------------------------------------------------------------------------------

Protected endpoints require a valid JWT bearer token:

``` http
Authorization: Bearer <JWT>
```

### Health check

``` http
GET /api/health
```

A successful response indicates that the API is running and PostgreSQL
responded to the health-check query.

------------------------------------------------------------------------

## 14. How document upload works

CloudVault uses a direct-to-S3 upload flow with a backend-generated
presigned PUT URL.

1.  The user signs in and receives a JWT.
2.  The user selects a document in the React interface.
3.  The frontend sends document metadata to
    `POST /api/documents/upload-url`, including the JWT.
4.  Express authenticates the user and validates the request.
5.  The backend creates a pending document record and generates a
    temporary S3 presigned PUT URL.
6.  React uploads the file bytes directly to S3 using the presigned URL
    and required headers.
7.  After the upload succeeds, React calls
    `POST /api/documents/:id/confirm`.
8.  The backend checks the S3 object and its properties.
9.  The document record is updated to `active`.
10. The frontend refreshes the document list.

The file bytes do not pass through the Express server in this presigned
upload flow.

## 15. How document download works

1.  The user clicks Download for a document.
2.  React requests `GET /api/documents/:id/download-url`.
3.  The backend verifies the JWT and checks document ownership.
4.  The backend generates a temporary S3 presigned GET URL.
5.  React uses the URL to retrieve the document directly from S3.
6.  The browser downloads the file.

Presigned URLs provide temporary access to a specific operation. Treat
them as sensitive links and do not publish them.

## 16. How document deletion works

1.  React sends `DELETE /api/documents/:id`.
2.  The backend authenticates the user and checks document ownership.
3.  The backend deletes the corresponding S3 object.
4.  The database record is marked with status `deleted`.
5.  The active document list no longer includes that record.

The current implementation uses a deleted status in the database rather
than treating deletion as a permanent removal of every metadata record.

------------------------------------------------------------------------

## 17. Frontend functionality

The current frontend includes:

-   Dark Neumorphism visual design.
-   Registration and login screens.
-   Authenticated dashboard.
-   Document listing and management.
-   Drag-and-drop document upload.
-   Direct S3 uploads using presigned URLs.
-   Document download and deletion.
-   Search and file-type filtering.
-   Sorting by date, name and size.
-   Storage Analytics page.
-   Storage usage and file-type distribution visualizations.
-   Largest files and recent uploads sections.

### Storage Analytics limitations

Analytics are derived from the active document records returned by the
application's API. They do not represent AWS billing, total bucket
inventory, or a formally enforced storage quota.

### Security Activity limitations

The current Security Activity screen contains UI-level security/account
information. A complete backend audit-event pipeline and real activity
history remain future work.

------------------------------------------------------------------------

## 18. Security controls and limitations

### Implemented in the current baseline

-   JWT-based authentication.
-   Password hashing in the authentication flow.
-   Protected API routes.
-   Backend document ownership checks.
-   Helmet security headers.
-   CORS restricted to `CLIENT_URL`.
-   Global rate limiting.
-   Private S3 access through presigned URLs.
-   Configured AES-256 server-side encryption for the upload flow.

### Improvements still required

-   Validate actual file contents, not only client-declared file
    extensions and MIME types.
-   Improve failed-upload and pending-record cleanup.
-   Implement complete backend audit logging.
-   Review and strengthen authentication-specific rate limits.
-   Review token storage and session security for production.
-   Add robust error handling and operational monitoring.
-   Configure HTTPS and production CORS.
-   Test access-control boundaries and failure scenarios.
-   Implement reliable backup and recovery procedures.

Do not describe the application as production-certified or claim
security controls that have not been implemented and tested.

------------------------------------------------------------------------

## 19. Useful development commands

``` powershell
# Backend dependencies
cd backend
npm ci

# Backend development server
npm run dev

# Frontend dependencies
cd ..\frontend
npm ci

# Frontend development server
npm run dev

# Frontend production build
npm run build

# Git status from repository root
cd ..
git status

# Recent commits
git log --oneline -5
```

Use `npm run` inside the backend or frontend directory to list the
scripts actually defined in that package.

------------------------------------------------------------------------

## 20. GitHub workflow

CloudVault has its own GitHub repository:

https://github.com/Vishal-san69/CloudVault

Run Git commands from the CloudVault project directory:

``` powershell
git status
git add .
git status
git commit -m "Describe the change"
git push
```

Before committing, inspect staged files. Confirm that `.env`,
`node_modules`, build output, credentials, and temporary test files are
excluded.

The separate EvidenceVault repository is:

https://github.com/Vishal-san69/EvidenceVault

Changes to EvidenceVault should be made and pushed from its own local
directory.

------------------------------------------------------------------------

## 21. Troubleshooting

### Backend cannot connect to PostgreSQL

-   Confirm PostgreSQL is running.
-   Check `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, and `PGPASSWORD`.
-   Confirm the database exists and the user has access.
-   Inspect backend logs for the actual database error.

### AWS S3 access denied

-   Verify the AWS identity used by the backend.
-   Check bucket name and region.
-   Review IAM permissions and bucket policy.
-   Keep the bucket private; do not make it public to bypass permission
    errors.

### Browser upload fails with CORS

-   Confirm the S3 CORS allowed origin exactly matches the frontend
    origin.
-   Confirm required request headers are allowed.
-   Confirm the presigned URL and upload headers match.
-   Remember that CORS does not grant S3 permissions.

### Frontend cannot reach the backend

-   Confirm the backend is running on port 5000.
-   Confirm the Axios API base URL is `http://localhost:5000/api`.
-   Confirm `CLIENT_URL` matches the frontend origin.

### Missing npm script

-   Run `npm run` in the relevant package directory.
-   Use a script that is actually listed in that package's
    `package.json`.

------------------------------------------------------------------------

## 22. Future enhancements

Possible future improvements include:

1.  AI-powered PDF summarization and key-point extraction.
2.  Real security activity logging and audit history.
3.  Stronger file-content validation.
4.  Improved upload failure recovery and cleanup.
5.  Production deployment and monitoring.
6.  More advanced document organization and access controls.

These are future enhancements, not current implemented functionality.

------------------------------------------------------------------------

## 23. Maintainer

**Developer:** Vishal Baviskar\
**GitHub:** https://github.com/Vishal-san69

------------------------------------------------------------------------

*Update this README whenever dependencies, setup commands, environment
variables, API endpoints, database schema, AWS configuration, security
controls, or implemented functionality changes.*
