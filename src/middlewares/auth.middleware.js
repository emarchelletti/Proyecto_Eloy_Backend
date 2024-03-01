export const isAdmin = (req, res, next) => {
  console.log(req.session);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};

export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};

export const isAdminOrPremium = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'premium') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};

export const isUserOrPremium = (req, res, next) => {
  if (req.user.role === 'user' || req.user.role === 'premium') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};
