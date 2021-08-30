const config = {
    dbxAccessToken: process.env.REACT_APP_DBX_ACCESS_TOKEN,
    clientId:process.env.REACT_APP_APP_KEY,
    clientSecret:process.env.REACT_APP_CLIENT_SECRET,
    jwtSecret:process.env.REACT_APP_JWT_SECRET,
    server:`http:${process.REACT_APP_SERVER_URL}:4001`
}

export default config