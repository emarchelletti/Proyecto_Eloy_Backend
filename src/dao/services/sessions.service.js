export const destroySession = (req) => {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    });
  };