# High-Level Database Architecture (BUYC Corp)

## 1. UUIDs vs Sequential IDs
For primary transactional tables (`Users`, `Inventory_Listings`), we migrated from standard auto-incrementing integers to **UUIDs (Universally Unique Identifiers)**. This prevents enumeration attacks (where competitors guess our inventory size by looking at URL IDs) and ensures safety in distributed, scalable environments.

## 2. 1-to-1 Normalization (Subtyping)
Instead of putting `dealership_name` inside the generic `Users` table, we created a `Dealer_Profiles` table that shares a `UUID` with `Users`. This is a strict 1-to-1 relationship that ensures the `Users` table stays lightweight for authentication, while profile metadata is stored separately.

## 3. Data Integrity & Constraints
We rely on the database layer to catch bad data before it hits the application:
* **Enums**: `account_role` and `vehicle_status` restrict data to specific values.
* **Check Constraints**: `CHECK (dealer_price > 0)` and `CHECK (rating >= 0 AND rating <= 5)` ensure business logic rules are enforced at the very core of the database.

## 4. 1-to-N Normalization (First Normal Form)
Instead of using Postgres Arrays for listing highlights (the 5 bullet points) and images, we normalized these out into `Listing_Highlights` and `Listing_Images`. 
* *Why?* This makes it vastly easier to update a single bullet point, change the primary image, or query global analytics (e.g., "how many cars have 'Sunroof' in their highlights?").

## 5. B-Tree Indexing for Search Optimization
To support the Phase III requirement of fast searching (e.g., "Honda City 2015" and Price Filters), we implemented composite and single-column B-Tree indexes:
* `CREATE INDEX idx_oem_search` optimizes backend string matching.
* `CREATE INDEX idx_inventory_price` optimizes the frontend price slider filter.

## 6. Entity-Relationship Diagram (ERD)
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
