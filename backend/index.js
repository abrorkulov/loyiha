const http = require("http");
const os = require("os");
const EventEmitter = require("events");

const products = require("./products");



const emitter = new EventEmitter();

emitter.on("search", (text, count) => {
    console.log("Qidiruv: '" + text + "' -> " + count + " ta mahsulot topildi");
});

emitter.on("notfound", (path) => {
    console.log("Route topilmadi: " + path);
});



const server = http.createServer((req, res) => {

    const api = "http://localhost:4000";

    const newUrl = new URL(api + req.url);

    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        res.end();
        return;
    }



    if (newUrl.pathname === "/api/products") {

        const q = newUrl.searchParams.get("q");
        const category = newUrl.searchParams.get("category");
        const brand = newUrl.searchParams.get("brand");
        const minPrice = newUrl.searchParams.get("minPrice");
        const maxPrice = newUrl.searchParams.get("maxPrice");
        const minRating = newUrl.searchParams.get("minRating");
        const inStock = newUrl.searchParams.get("inStock");
        const sort = newUrl.searchParams.get("sort");

        let filtered = products.filter((product) => {

            if (q) {
                const text = (product.name + " " + product.brand + " " + product.description + " " + product.tags.join(" ")).toLowerCase();

                if (!text.includes(q.toLowerCase())) {
                    return false;
                }
            }

            if (category && product.category !== category) {
                return false;
            }

            if (brand && product.brand !== brand) {
                return false;
            }

            if (minPrice && product.price < Number(minPrice)) {
                return false;
            }

            if (maxPrice && product.price > Number(maxPrice)) {
                return false;
            }

            if (minRating && product.rating < Number(minRating)) {
                return false;
            }

            if (inStock === "true" && product.stock === 0) {
                return false;
            }

            return true;
        });



        if (sort === "price_asc") {
            filtered.sort((a, b) => a.price - b.price);
        }

        if (sort === "price_desc") {
            filtered.sort((a, b) => b.price - a.price);
        }

        if (sort === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        if (sort === "newest") {
            filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        }

        if (sort === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }



        const page = Number(newUrl.searchParams.get("page")) || 1;
        const limit = Number(newUrl.searchParams.get("limit")) || 12;

        const totalPages = Math.ceil(filtered.length / limit) || 1;
        const start = (page - 1) * limit;
        const items = filtered.slice(start, start + limit);

        emitter.emit("search", q || "", filtered.length);

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify({
            items: items,
            total: filtered.length,
            page: page,
            limit: limit,
            totalPages: totalPages
        }));

        return;
    }



    if (newUrl.pathname.startsWith("/api/products/")) {

        const id = Number(newUrl.pathname.split("/")[3]);

        const product = products.find((product) => {
            return product.id === id;
        });

        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });

            res.end(JSON.stringify({
                message: "Mahsulot topilmadi"
            }));

            return;
        }

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify(product));

        return;
    }



    if (newUrl.pathname === "/api/meta") {

        const categories = [];

        products.forEach((product) => {
            const found = categories.find((c) => c.name === product.category);

            if (found) {
                found.count = found.count + 1;
            } else {
                categories.push({ name: product.category, count: 1 });
            }
        });

        const brands = [];

        products.forEach((product) => {
            if (!brands.includes(product.brand)) {
                brands.push(product.brand);
            }
        });

        brands.sort();

        const prices = products.map((product) => product.price);

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify({
            categories: categories,
            brands: brands,
            priceRange: {
                min: Math.min(...prices),
                max: Math.max(...prices)
            }
        }));

        return;
    }



    if (newUrl.pathname === "/api/health") {

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify({
            ok: true,
            hostname: os.hostname(),
            platform: os.platform(),
            cpus: os.cpus().length,
            freeMemory: Math.round(os.freemem() / 1024 / 1024) + " MB"
        }));

        return;
    }



    emitter.emit("notfound", newUrl.pathname);

    res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify({
        message: "Route topilmadi"
    }));

});

server.listen(4000, () => {
    console.log("server started: http://localhost:4000");
});
