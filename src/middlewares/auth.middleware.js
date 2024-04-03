export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
};

export const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
};

export const isAdminOrPremium = (req, res, next) => {
  // Verificar si hay un usuario logueado y guardar su rol
  const validRole = req.user ? req.user.role : null;

  // Si no hay un usuario logueado, notificar y detener el middleware
  if (!validRole) {
    return res.status(403).json({ error: "No hay un usuario logueado" });
  }

  // Verificar si el rol es "admin" o "premium"
  if (validRole === "admin" || validRole === "premium") {
    next(); // Continuar con la siguiente función middleware
  } else {
    // Si el rol no es "admin" o "premium", notificar pero no cumplir con el middleware
    return res.status(403).json({ error: "Acceso no autorizado" });
  }
};

export const isUserOrPremium = (req, res, next) => {
  if (req.user.role === "user" || req.user.role === "premium") {
    next();
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
};
