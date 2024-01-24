export const prueba = (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // Recuperar el mensaje flash y responder con un JSON
      const errorMessage = 'Error al registrar el usuario';
      return res.status(401).json({ message: errorMessage });
    }
    next();
  }