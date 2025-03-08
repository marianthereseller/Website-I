const products = {
    "Procesory": [
        { name: "Greatest processor ever",
          description: "je to naozaj tak, nedoakzem opisat aky fantasticky je tento procesor odporučam kupit",
        price: "549",
         image: "https://interlink-static0.tsbohemia.cz/amd-ryzen-5-5600_ien404976.jpg",
         images: ["https://interlink-static0.tsbohemia.cz/amd-ryzen-5-5600_ien404976.jpg", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd3fa68hw0m2vcc.cloudfront.net%2F076%2F238203911.jpeg&f=1&nofb=1&ipt=9803021b546e8ec1b7594579471ca3209b60456d455f7f0652a99010bcd69c8a&ipo=images", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FA300a10107e3942e6a5791ad26827401a7%2FBrand-New-AMD-Ryzen-5-5600-CPU-Socket-AM4-OEM-CPU-ONLY-7NM-65W-6-Cores.jpg_Q90.jpg_.webp&f=1&nofb=1&ipt=c713ab8ea063c9d3aba611d836e684d3184dcdae08a4a7a71f040095d36952c7&ipo=images"] },
        { name: "AMD Ryzen 7 5800X", price: "299", image: "https://via.placeholder.com/100" },
        { name: "Intel Procesory12900K", price: "549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "299", image: "https://via.placeholder.com/100" },
        { name: "Intel Procesory12900K", price: "549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "299", image: "https://via.placeholder.com/100" },
        { name: "Intel Procesory12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }


    ],
    "Grafické_Karty": [
        { name: "Intel i9-Grafické_Karty", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "PC_Zdroje": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Počítačové_Skrine": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "RAMky": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Chladiče": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Úložiská": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Ventilátory": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Tlačiarne": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Monitory": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Reproduktory": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Počítačové_Myši": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Slúchadlá": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Klávesnice": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Mikrofóny": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Telefóny": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Tablety": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "PowerBanky": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Notebooky": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Routery": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Kamery": [
        
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Káble": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Počítačové_Príslušenstvo": [
        { name: "Intel i9-12900K", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "AMD Ryzen 7 5800X", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Notebookove_Príslušenstvo": [
        { name: " a", price: "$1", image: "https://via.placeholder.com/100" },
        { name: "b", price: "$299", image: "https://via.placeholder.com/100" },
        { name: "c", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "d", price: "$299", image: "https://via.placeholder.com/100" }
    ],
    "Default_Page": [
        { name: " a", price: "$549", image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Ftiny-flowers-png-download-596.png&f=1&nofb=1&ipt=bd6b804309034b30b1fbb4d3769039760bbf65ea5ec62bf96fe7b8ed57c81c93&ipo=images" },
        { name: "b", price: "$299", image: "https://via.placeholder.com/100" },
        { name: "c", price: "$549", image: "https://via.placeholder.com/100" },
        { name: "d", price: "$299", image: "https://via.placeholder.com/100" }
    ]

};
