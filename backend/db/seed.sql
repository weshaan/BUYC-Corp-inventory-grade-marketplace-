-- Insert Users
INSERT INTO Users (user_id, email, password_hash, role) VALUES 
('11111111-1111-1111-1111-111111111111', 'dealer1@buyccorp.com', 'hashed_pass_123', 'DEALER'),
('22222222-2222-2222-2222-222222222222', 'dealer2@buyccorp.com', 'hashed_pass_456', 'DEALER');

-- Insert Dealer Profiles (Linked to Users via UUID)
INSERT INTO Dealer_Profiles (dealer_id, dealership_name, contact_number, gst_number, rating) VALUES 
('11111111-1111-1111-1111-111111111111', 'Premium Motors Delhi', '9876543210', '07AAAAA0000A1Z5', 4.8),
('22222222-2222-2222-2222-222222222222', 'City Car Hub Bangalore', '9876543211', '29BBBBB0000B1Z6', 4.5);

-- We manually specify oem_id so we can reference it easily below
INSERT INTO OEM_Specs (oem_id, manufacturer, model_name, model_year, list_price, base_mileage_kmpl, power_bhp, max_speed_kmph) VALUES 
(1, 'Honda', 'City', 2015, 1050000.00, 17.8, 117, 180),
(2, 'Maruti Suzuki', 'Swift', 2018, 650000.00, 21.4, 82, 160),
(3, 'Hyundai', 'Creta', 2020, 1500000.00, 16.5, 138, 190);

-- We assign static UUIDs to listings so we can attach images and bullet points to them.
INSERT INTO Inventory_Listings (
    listing_id, dealer_id, oem_id, title, status, dealer_price, 
    kms_odometer, major_scratches, original_paint, accidents_reported, previous_buyers, registration_place
) VALUES 
(
    'aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 1, 
    '2015 Honda City VX - Excellent Condition', 'AVAILABLE', 550000.00, 
    45000, FALSE, TRUE, 0, 1, 'Delhi (DL)'
),
(
    'bbbb2222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 2, 
    '2018 Maruti Swift VXI - Great City Car', 'AVAILABLE', 450000.00, 
    62000, TRUE, FALSE, 1, 2, 'Mumbai (MH)'
),
(
    'cccc3333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 3, 
    '2020 Hyundai Creta SX - Fully Loaded', 'AVAILABLE', 1250000.00, 
    25000, FALSE, TRUE, 0, 1, 'Bangalore (KA)'
);

-- Honda City Points
INSERT INTO Listing_Highlights (listing_id, description, display_order) VALUES 
('aaaa1111-1111-1111-1111-111111111111', 'First Owner Vehicle', 1),
('aaaa1111-1111-1111-1111-111111111111', 'No Major Scratches', 2),
('aaaa1111-1111-1111-1111-111111111111', '100% Original Paint', 3),
('aaaa1111-1111-1111-1111-111111111111', 'Dealer Warranty Included', 4),
('aaaa1111-1111-1111-1111-111111111111', 'Recently Serviced at Honda', 5);

-- Maruti Swift Points
INSERT INTO Listing_Highlights (listing_id, description, display_order) VALUES 
('bbbb2222-2222-2222-2222-222222222222', 'Great City Car', 1),
('bbbb2222-2222-2222-2222-222222222222', 'High Mileage Verified', 2),
('bbbb2222-2222-2222-2222-222222222222', 'Bluetooth Audio System', 3),
('bbbb2222-2222-2222-2222-222222222222', 'Power Windows', 4),
('bbbb2222-2222-2222-2222-222222222222', 'Spare Tire Included', 5);

-- Hyundai Creta Points
INSERT INTO Listing_Highlights (listing_id, description, display_order) VALUES 
('cccc3333-3333-3333-3333-333333333333', 'Panoramic Sunroof', 1),
('cccc3333-3333-3333-3333-333333333333', 'Touchscreen Infotainment', 2),
('cccc3333-3333-3333-3333-333333333333', 'Zero Dep Insurance Valid', 3),
('cccc3333-3333-3333-3333-333333333333', 'Premium Alloy Wheels', 4),
('cccc3333-3333-3333-3333-333333333333', 'Ventilated Leather Seats', 5);

INSERT INTO Listing_Images (listing_id, image_url, is_primary) VALUES 
('aaaa1111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80', TRUE),
('bbbb2222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80', TRUE),
('cccc3333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=500&q=80', TRUE);