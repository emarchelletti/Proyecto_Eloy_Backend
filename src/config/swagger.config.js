export const info = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "API E-COMMERCE",
            version: "1.0.0",
            description: "API del proyecto de e-commerce CODERHOUSE"
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/docs/**/*.yaml"],
}