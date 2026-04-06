CREATE TYPE account_role AS ENUM ('DEALER', 'BUYER', 'ADMIN');
CREATE TYPE vehicle_status AS ENUM ('AVAILABLE', 'PENDING', 'SOLD');

CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role account_role DEFAULT 'DEALER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Dealer_Profiles (
    dealer_id UUID PRIMARY KEY REFERENCES Users(user_id) ON DELETE CASCADE,
    dealership_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20),
    gst_number VARCHAR(50) UNIQUE,
    rating NUMERIC(3, 2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5)
);

CREATE TABLE OEM_Specs (
    oem_id SERIAL PRIMARY KEY,
    manufacturer VARCHAR(50) NOT NULL, -- e.g., Honda, Hyundai
    model_name VARCHAR(100) NOT NULL,  -- e.g., City, Creta
    model_year INT NOT NULL CHECK (model_year >= 1990),
    list_price NUMERIC(12, 2) NOT NULL,
    base_mileage_kmpl NUMERIC(5, 2) NOT NULL,
    power_bhp INT NOT NULL,
    max_speed_kmph INT NOT NULL
);

CREATE TABLE Inventory_Listings (
    listing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID NOT NULL REFERENCES Dealer_Profiles(dealer_id) ON DELETE CASCADE,
    oem_id INT NOT NULL REFERENCES OEM_Specs(oem_id) ON DELETE RESTRICT,
    
    title VARCHAR(255) NOT NULL,
    status vehicle_status DEFAULT 'AVAILABLE',
    dealer_price NUMERIC(12, 2) NOT NULL CHECK (dealer_price > 0),
    kms_odometer INT NOT NULL CHECK (kms_odometer >= 0),
    
    -- Condition metrics
    major_scratches BOOLEAN DEFAULT FALSE,
    original_paint BOOLEAN DEFAULT TRUE,
    accidents_reported INT DEFAULT 0 CHECK (accidents_reported >= 0),
    previous_buyers INT DEFAULT 1 CHECK (previous_buyers >= 1),
    registration_place VARCHAR(100) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Listing_Highlights (
    highlight_id SERIAL PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES Inventory_Listings(listing_id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    display_order INT NOT NULL CHECK (display_order BETWEEN 1 AND 5)
);

CREATE TABLE Listing_Images (
    image_id SERIAL PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES Inventory_Listings(listing_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_oem_search ON OEM_Specs(manufacturer, model_name, model_year);
CREATE INDEX idx_inventory_price ON Inventory_Listings(dealer_price);
CREATE INDEX idx_inventory_dealer ON Inventory_Listings(dealer_id);