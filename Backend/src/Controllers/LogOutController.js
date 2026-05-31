const LogOutController = {}

LogOutController.LogOut = (req, res) => {
    try {
        res.clearCookie("AuthCookie");

        return res.status(200).json({ message: 'Sesion Cerrada' });
    } catch (error) {}
}

export default LogOutController;