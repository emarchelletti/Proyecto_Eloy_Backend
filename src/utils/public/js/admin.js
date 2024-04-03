document.addEventListener("DOMContentLoaded", () => {

  const deleteUserForms = document.querySelectorAll(".delete-user-form");
  const updateUserForms = document.querySelectorAll(".update-user-form");

  updateUserForms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const confirmation = confirm(
        "¿Estás seguro de actualizar el rol del usuario?"
      );

      if (confirmation) {
        const userId = form.getAttribute("action").split("/").pop(); // Obtener el ID del usuario
        const role = form.querySelector("#role").value; // Obtener el nuevo rol seleccionado

        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }), // Convertir el nuevo rol a formato JSON y enviar en el cuerpo de la solicitud
        };

        try {
          const response = await fetch(`/api/users/${userId}`, requestOptions);
          if (!response.ok) {
            throw new Error("Error al actualizar el rol del usuario");
          }
          alert("Rol actualizado correctamente");
          location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
          console.error("Error:", error);
          alert("Hubo un problema al actualizar el rol del usuario");
        }
      }
    });
  });
  deleteUserForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevenir el envío del formulario por defecto

      const confirmation = confirm(
        "¿Estás seguro de que deseas eliminar este usuario?"
      );

      if (confirmation) {
        const userId = form.getAttribute("action").split("/").pop(); // Obtener el ID del usuario
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await fetch(`/api/users/${userId}`, requestOptions);
          if (response.ok) {
            // El usuario fue eliminado exitosamente
            alert("El usuario fue eliminado exitosamente.");
            location.reload(); // Recargar la página para reflejar los cambios
          } else {
            // Error al eliminar el usuario
            const data = await response.json();
            throw new Error(data.error || "Error al eliminar el usuario.");
          }
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          alert("Error al eliminar el usuario. Por favor, inténtalo de nuevo.");
        }
      }
    });
  });

});
