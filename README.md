#  BUYC Corp - Dealership Marketplace Platform

A modern, full-stack web application designed for second-hand car dealerships to manage their inventory, reference official OEM specifications, and publish marketplace listings.

This repository demonstrates the complete software development lifecycle across three distinct phases: Frontend UI Design, Relational Database Architecture, and Backend API Integration.

---

##  Tech Stack & Architecture

* **Frontend:** React.js, Vite, Tailwind CSS, React Router DOM
* **Backend:** Node.js, Express.js, CORS
* **Database:** PostgreSQL (Hosted via Neon.tech), `pg` driver
* **Architecture:** RESTful API, Normalized Relational Database (3NF)

---

##  Project Progression & Milestones

### ✅ Phase I: Frontend User Interface (`/frontend`)
Developed a Single Page Application (SPA) focusing on SaaS design principles.
* **Dealer Dashboard:** Features a CSS-grid layout displaying current inventory, complete with dynamic filtering (Price, Color, Mileage) and bulk-deletion capabilities.
* **Listing Management:** Built a split-column form for dealers to input new vehicles, highlight specifications, and upload images.
* **UI/UX:** Implemented sticky navigation, elevated soft-shadow cards, and a unified branding theme using Tailwind CSS.
<img width="1409" height="888" alt="image" src="https://github.com/user-attachments/assets/fd6c9532-f236-40c0-b872-c4d7c0348bf0" />
<img width="774" height="532" alt="image" src="https://github.com/user-attachments/assets/d4cc87f9-7f45-43bb-a27a-bc5509f51be7" />

### ✅ Phase II: Enterprise Database Engineering (`/backend/db`)
Architected a highly normalized, production-ready PostgreSQL database to handle users, manufacturer data, and dealer inventory.
* **Data Normalization:** Extracted listing highlights and images into child tables (1-to-N relationships) to prevent array search bottlenecks.
* **Security & Integrity:** Replaced sequential IDs with UUIDs (`gen_random_uuid()`) to prevent enumeration attacks. Utilized ENUMs (`account_role`, `vehicle_status`) and strict `CHECK` constraints to ensure data validity at the database level.
* **Performance:** Implemented B-Tree indexing on highly queried columns (e.g., price, manufacturer).
<img width="774" height="591" alt="image" src="https://github.com/user-attachments/assets/c8625e6b-447f-4778-bfcd-03e2f9742b07" />


### ✅ Phase III: Backend REST APIs (`/backend`)
Built a robust Express.js server to bridge the React frontend with the PostgreSQL database.
* **Database Connection:** Integrated with a live Neon.tech serverless PostgreSQL database using connection pooling.
* **Endpoints Built:**
  * `GET /api/oem/count`: Calculates and returns the total number of official OEM models available in the system.
  * `GET /api/oem/search`: A dynamic search endpoint allowing query parameters (e.g., `?model_name=City&year=2015`) to filter the OEM catalog using parameterized SQL queries.
<img width="345" height="236" alt="Untitled" src="https://github.com/user-attachments/assets/9b350d65-a261-4dda-8507-4e8fba9d0b91" />


---

## 📁 Repository Structure

```text
buyccorp/
├── frontend/               # React SPA Application
│   ├── src/                # Components and Pages
│   ├── package.json        
│   └── README.md           # Frontend-specific documentation
├── backend/                # Node.js / Express Server
│   ├── db/                 
│   │   ├── schema.sql      # Database architecture
│   │   ├── seed.sql        # Dummy data generation
│   │   └── architecture.md # High-level database concepts and ERD
│   ├── server.js           # Express API endpoints
│   ├── .env.example        # Environment variables template
│   └── package.json        
└── README.md               # Root documentation

```

## 📁 Schema design
To visualize how the data flows and links together, here is the schema's relationship structure:

```mermaid
erDiagram
    Users ||--o| Dealer_Profiles : "1 to 0..1 (Subtype)"
    Dealer_Profiles ||--o{ Inventory_Listings : "posts (1 to Many)"
    OEM_Specs ||--o{ Inventory_Listings : "is base model for (1 to Many)"
    Inventory_Listings ||--o{ Listing_Highlights : "contains (1 to Many)"
    Inventory_Listings ||--o{ Listing_Images : "contains (1 to Many)"

    Users {
        uuid user_id PK
        varchar email
        account_role role
    }
    Dealer_Profiles {
        uuid dealer_id PK, FK
        varchar dealership_name
        numeric rating
    }
    OEM_Specs {
        int oem_id PK
        varchar manufacturer
        varchar model_name
        int model_year
    }
    Inventory_Listings {
        uuid listing_id PK
        uuid dealer_id FK
        int oem_id FK
        numeric dealer_price
        int kms_odometer
    }
    Listing_Highlights {
        int highlight_id PK
        uuid listing_id FK
        varchar description
    }
    Listing_Images {
        int image_id PK
        uuid listing_id FK
        text image_url
    }
```
