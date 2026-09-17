const products = [

    { id: 1, name: "iPhone 15 Pro", description: "6.1 OLED, A17 Pro chip, 128GB", category: "electronics", brand: "Apple", price: 999, rating: 4.8, stock: 25, tags: ["smartphone", "ios", "5g"], createdAt: "2025-09-20" },
    { id: 2, name: "Samsung Galaxy S24", description: "6.2 AMOLED, Snapdragon 8 Gen 3, 256GB", category: "electronics", brand: "Samsung", price: 799, rating: 4.6, stock: 40, tags: ["smartphone", "android", "5g"], createdAt: "2025-08-14" },
    { id: 3, name: "MacBook Air M3", description: "13 laptop, 8GB RAM, 256GB SSD", category: "electronics", brand: "Apple", price: 1099, rating: 4.9, stock: 12, tags: ["laptop", "macos"], createdAt: "2025-07-02" },
    { id: 4, name: "Dell XPS 15", description: "15.6 4K laptop, i7, 16GB RAM, 512GB SSD", category: "electronics", brand: "Dell", price: 1499, rating: 4.5, stock: 8, tags: ["laptop", "windows"], createdAt: "2025-06-18" },
    { id: 5, name: "Sony WH-1000XM5", description: "Wireless noise-cancelling headphones", category: "electronics", brand: "Sony", price: 349, rating: 4.7, stock: 60, tags: ["headphones", "wireless", "anc"], createdAt: "2025-05-30" },
    { id: 6, name: "AirPods Pro 2", description: "Wireless earbuds with active noise cancellation", category: "electronics", brand: "Apple", price: 249, rating: 4.7, stock: 100, tags: ["earbuds", "wireless", "anc"], createdAt: "2025-10-01" },
    { id: 7, name: "iPad Air", description: "10.9 tablet, M2 chip, 64GB", category: "electronics", brand: "Apple", price: 599, rating: 4.6, stock: 30, tags: ["tablet", "ios"], createdAt: "2025-04-11" },
    { id: 8, name: "Kindle Paperwhite", description: "6.8 e-reader, waterproof, 16GB", category: "electronics", brand: "Amazon", price: 139, rating: 4.5, stock: 75, tags: ["e-reader", "reading"], createdAt: "2025-03-22" },
    { id: 9, name: "Logitech MX Master 3S", description: "Ergonomic wireless mouse, 8K DPI", category: "electronics", brand: "Logitech", price: 99, rating: 4.8, stock: 120, tags: ["mouse", "wireless", "office"], createdAt: "2025-02-05" },
    { id: 10, name: "LG UltraGear 27 144Hz", description: "QHD gaming monitor, 1ms, IPS", category: "electronics", brand: "LG", price: 329, rating: 4.4, stock: 0, tags: ["monitor", "gaming"], createdAt: "2025-01-19" },
    { id: 11, name: "Nintendo Switch OLED", description: "Handheld gaming console, 7 OLED", category: "electronics", brand: "Nintendo", price: 349, rating: 4.7, stock: 18, tags: ["console", "gaming"], createdAt: "2025-08-29" },
    { id: 12, name: "GoPro HERO12", description: "5.3K action camera, waterproof", category: "electronics", brand: "GoPro", price: 399, rating: 4.3, stock: 22, tags: ["camera", "action", "video"], createdAt: "2025-06-03" },

    { id: 13, name: "Nike Air Force 1", description: "Classic white leather sneakers", category: "clothing", brand: "Nike", price: 110, rating: 4.7, stock: 80, tags: ["sneakers", "shoes", "unisex"], createdAt: "2025-07-15" },
    { id: 14, name: "Adidas Ultraboost 23", description: "Running shoes with Boost cushioning", category: "clothing", brand: "Adidas", price: 190, rating: 4.6, stock: 45, tags: ["sneakers", "running", "shoes"], createdAt: "2025-05-08" },
    { id: 15, name: "Levis 501 Original Jeans", description: "Straight fit, 100% cotton denim", category: "clothing", brand: "Levis", price: 69, rating: 4.5, stock: 150, tags: ["jeans", "denim", "men"], createdAt: "2025-03-01" },
    { id: 16, name: "Uniqlo Heattech Crew Neck", description: "Thermal long sleeve base layer", category: "clothing", brand: "Uniqlo", price: 19, rating: 4.4, stock: 300, tags: ["thermal", "winter", "basic"], createdAt: "2025-10-10" },
    { id: 17, name: "The North Face Nuptse Jacket", description: "700-fill down puffer jacket", category: "clothing", brand: "The North Face", price: 320, rating: 4.8, stock: 20, tags: ["jacket", "winter", "down"], createdAt: "2025-09-05" },
    { id: 18, name: "Zara Oversized Blazer", description: "Relaxed-fit wool blend blazer for women", category: "clothing", brand: "Zara", price: 89, rating: 4.2, stock: 35, tags: ["blazer", "women", "office"], createdAt: "2025-08-21" },
    { id: 19, name: "H&M Cotton T-Shirt 3-Pack", description: "Regular fit crew neck tees", category: "clothing", brand: "H&M", price: 25, rating: 4.1, stock: 500, tags: ["t-shirt", "basic", "unisex"], createdAt: "2025-02-14" },
    { id: 20, name: "Ray-Ban Wayfarer", description: "Classic acetate sunglasses, UV400", category: "clothing", brand: "Ray-Ban", price: 160, rating: 4.6, stock: 55, tags: ["sunglasses", "accessories"], createdAt: "2025-06-25" },

    { id: 21, name: "Clean Code", description: "Robert C. Martin - a handbook of agile software craftsmanship", category: "books", brand: "Pearson", price: 38, rating: 4.7, stock: 90, tags: ["programming", "software"], createdAt: "2025-01-10" },
    { id: 22, name: "Atomic Habits", description: "James Clear - tiny changes, remarkable results", category: "books", brand: "Penguin", price: 18, rating: 4.8, stock: 200, tags: ["self-help", "productivity"], createdAt: "2025-04-04" },
    { id: 23, name: "The Pragmatic Programmer", description: "Hunt & Thomas - 20th anniversary edition", category: "books", brand: "Addison-Wesley", price: 42, rating: 4.8, stock: 60, tags: ["programming", "software"], createdAt: "2025-02-28" },
    { id: 24, name: "Dune", description: "Frank Herbert - the sci-fi classic", category: "books", brand: "Ace", price: 12, rating: 4.6, stock: 140, tags: ["sci-fi", "fiction", "novel"], createdAt: "2025-07-07" },
    { id: 25, name: "Sapiens", description: "Yuval Noah Harari - a brief history of humankind", category: "books", brand: "Harper", price: 22, rating: 4.6, stock: 110, tags: ["history", "non-fiction"], createdAt: "2025-05-19" },
    { id: 26, name: "The Hobbit", description: "J.R.R. Tolkien - illustrated edition", category: "books", brand: "HarperCollins", price: 15, rating: 4.9, stock: 170, tags: ["fantasy", "fiction", "novel"], createdAt: "2025-03-15" },
    { id: 27, name: "Designing Data-Intensive Applications", description: "Martin Kleppmann - the big ideas behind reliable systems", category: "books", brand: "OReilly", price: 55, rating: 4.9, stock: 0, tags: ["programming", "databases", "architecture"], createdAt: "2025-08-01" },

    { id: 28, name: "Dyson V15 Detect", description: "Cordless vacuum with laser dust detection", category: "home", brand: "Dyson", price: 749, rating: 4.7, stock: 15, tags: ["vacuum", "cleaning", "cordless"], createdAt: "2025-06-12" },
    { id: 29, name: "Instant Pot Duo 7-in-1", description: "6-quart electric pressure cooker", category: "home", brand: "Instant Pot", price: 99, rating: 4.7, stock: 70, tags: ["kitchen", "cooking", "appliance"], createdAt: "2025-02-20" },
    { id: 30, name: "Nespresso Vertuo Next", description: "Capsule coffee machine with milk frother", category: "home", brand: "Nespresso", price: 179, rating: 4.4, stock: 40, tags: ["coffee", "kitchen", "appliance"], createdAt: "2025-09-12" },
    { id: 31, name: "IKEA MALM Bed Frame", description: "Queen size, white, with 4 storage boxes", category: "home", brand: "IKEA", price: 349, rating: 4.3, stock: 10, tags: ["furniture", "bedroom"], createdAt: "2025-01-25" },
    { id: 32, name: "Philips Hue Starter Kit", description: "3 smart color bulbs + bridge", category: "home", brand: "Philips", price: 199, rating: 4.6, stock: 50, tags: ["smart-home", "lighting"], createdAt: "2025-07-30" },
    { id: 33, name: "Le Creuset Dutch Oven 5.5qt", description: "Enameled cast iron, cherry red", category: "home", brand: "Le Creuset", price: 420, rating: 4.9, stock: 12, tags: ["kitchen", "cookware"], createdAt: "2025-04-18" },
    { id: 34, name: "Xiaomi Robot Vacuum S10", description: "Robot vacuum & mop with LiDAR navigation", category: "home", brand: "Xiaomi", price: 299, rating: 4.4, stock: 28, tags: ["vacuum", "robot", "smart-home"], createdAt: "2025-08-08" },
    { id: 35, name: "Casper Original Mattress", description: "Queen, medium-firm foam mattress", category: "home", brand: "Casper", price: 1095, rating: 4.5, stock: 6, tags: ["bedroom", "mattress"], createdAt: "2025-03-09" },

    { id: 36, name: "Wilson Evolution Basketball", description: "Official size 7 indoor game ball", category: "sports", brand: "Wilson", price: 70, rating: 4.8, stock: 65, tags: ["basketball", "ball"], createdAt: "2025-05-05" },
    { id: 37, name: "Manduka PRO Yoga Mat", description: "6mm high-density mat, lifetime guarantee", category: "sports", brand: "Manduka", price: 129, rating: 4.7, stock: 48, tags: ["yoga", "fitness", "mat"], createdAt: "2025-06-29" },
    { id: 38, name: "Bowflex SelectTech 552", description: "Adjustable dumbbells 5-52.5 lbs, pair", category: "sports", brand: "Bowflex", price: 429, rating: 4.8, stock: 14, tags: ["fitness", "dumbbells", "strength"], createdAt: "2025-02-11" },
    { id: 39, name: "Garmin Forerunner 265", description: "GPS running smartwatch with AMOLED", category: "sports", brand: "Garmin", price: 449, rating: 4.6, stock: 22, tags: ["smartwatch", "running", "gps"], createdAt: "2025-09-25" },
    { id: 40, name: "Trek Marlin 7 Mountain Bike", description: "29 hardtail, 1x10 drivetrain", category: "sports", brand: "Trek", price: 1099, rating: 4.5, stock: 5, tags: ["bike", "cycling", "mtb"], createdAt: "2025-04-27" },
    { id: 41, name: "Speedo Vanquisher 2.0 Goggles", description: "Anti-fog swim goggles, mirrored", category: "sports", brand: "Speedo", price: 22, rating: 4.4, stock: 130, tags: ["swimming", "goggles"], createdAt: "2025-07-19" },
    { id: 42, name: "Adidas Tiro 23 Soccer Ball", description: "Training ball, size 5", category: "sports", brand: "Adidas", price: 25, rating: 4.3, stock: 0, tags: ["soccer", "football", "ball"], createdAt: "2025-03-28" },

    { id: 43, name: "CeraVe Moisturizing Cream", description: "19 oz, hyaluronic acid + ceramides", category: "beauty", brand: "CeraVe", price: 19, rating: 4.7, stock: 220, tags: ["skincare", "moisturizer"], createdAt: "2025-01-30" },
    { id: 44, name: "Dyson Airwrap", description: "Multi-styler hair dryer & curler", category: "beauty", brand: "Dyson", price: 599, rating: 4.5, stock: 9, tags: ["hair", "styler", "dryer"], createdAt: "2025-08-16" },
    { id: 45, name: "The Ordinary Niacinamide 10%", description: "Serum for blemishes and oil control, 30ml", category: "beauty", brand: "The Ordinary", price: 7, rating: 4.4, stock: 400, tags: ["skincare", "serum"], createdAt: "2025-05-23" },
    { id: 46, name: "Chanel No. 5 Eau de Parfum", description: "50ml classic floral fragrance", category: "beauty", brand: "Chanel", price: 145, rating: 4.8, stock: 30, tags: ["perfume", "fragrance", "women"], createdAt: "2025-06-08" },
    { id: 47, name: "Oral-B iO Series 9", description: "Smart electric toothbrush with AI tracking", category: "beauty", brand: "Oral-B", price: 249, rating: 4.6, stock: 26, tags: ["toothbrush", "oral-care", "electric"], createdAt: "2025-09-02" },

    { id: 48, name: "LEGO Millennium Falcon 75375", description: "921-piece Star Wars building set", category: "toys", brand: "LEGO", price: 85, rating: 4.9, stock: 33, tags: ["lego", "star-wars", "building"], createdAt: "2025-07-11" },
    { id: 49, name: "Hot Wheels 20-Car Pack", description: "Assorted 1:64 die-cast cars", category: "toys", brand: "Hot Wheels", price: 22, rating: 4.6, stock: 95, tags: ["cars", "die-cast", "kids"], createdAt: "2025-04-01" },
    { id: 50, name: "Rubiks Cube 3x3", description: "Original speed cube with smooth turning", category: "toys", brand: "Rubiks", price: 12, rating: 4.5, stock: 180, tags: ["puzzle", "classic"], createdAt: "2025-02-22" }

];

module.exports = products;
