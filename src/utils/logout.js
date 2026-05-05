export const logout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("note");
    localStorage.removeItem("adminData");
    localStorage.removeItem("fullname")
    localStorage.removeItem("email")
    localStorage.removeItem("regDate")
    localStorage.removeItem("btcAd")
    localStorage.removeItem("ethAd")
    localStorage.removeItem("bnbSmartAd")
    localStorage.removeItem("bnbAd")
    localStorage.removeItem("usdtTrcAd")
    localStorage.removeItem("usdtErcAd")


    // Optional: Clear everything (uncomment if you want a full wipe)
    // localStorage.clear();

    // Redirect to login page
    window.location.href = "/login";
};