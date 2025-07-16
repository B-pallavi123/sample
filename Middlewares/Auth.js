//Dummy Middleware for Authentication


const adminAuth = (req, res, next) => {

    console.log("Admin Auth Middleware");
   
    const isAuthorized =token === "xyzabc"
    if ( isAuthorized) {
        next(); // Pass control to the next middleware or route handler
    } else {
        res.status(401).send("Unauthorized request. Admins only.");
    }
}

const userAuth = (req, res, next) => {

    console.log("User Auth Middleware");
    const token ="123";
    const isAuthorized =token === "123"
    if (isAuthorized) {
        next(); // Pass control to the next middleware or route handler
    } else {
        res.status(403).send("Access denied. Admins only.");
    }
}

module.exports = {adminAuth, userAuth};